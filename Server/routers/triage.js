import express from "express";
import { model } from "../config/geminiClient.js";
import { buildTriagePrompt } from "../prompts/triagePrompt.js";
import { userAuth }  from "../middlewares/userAuth.js"
import  { ChatMessage }  from "../model/chatMessage.models.js"


const triageRouter = express.Router();

triageRouter.post("/triage/chat", userAuth, async(req, res)=>{
  try{
    const {message, sessionId} = req.body;

    if(!message || !sessionId){
      return res.status(404).json({
        success: false,
        error: "message and sessionId required"
      })
    }

    const result = await model.generateContent(
      buildTriagePrompt(message)
    );
    
    const rawText = result.response.text();
    const parsed = JSON.parse(rawText);

    await ChatMessage.create({
      content: message,
      senderId: req.user._id,
      senderType: "user",
      channel: "triage",
      triageSessionId: sessionId,
      aiAnalysis: {
        sentiment: parsed.sentiment,
        riskLevel: parsed.riskAssessment,
        requiresEscalation: parsed.riskAssessment.level === "high"
      }
    });

    await ChatMessage.create({
      content: parsed.message,
      senderId: req.user._id,
      senderType: "ai_assistant",
      channel: "triage",
      triageSessionId: sessionId
    });


    let suggestedNextStep = null;

    if (parsed.riskAssessment.level === "medium") {
      suggestedNextStep = {
        type: "booking",
        specialty: "depression",
        urgency: "within_7_days"
      };
    }

    if (parsed.riskAssessment.level === "high") {
      suggestedNextStep = {
        type: "crisis",
        urgency: "immediate"
      };
    }

    res.json({
      success: true,
      message: parsed.message,
      riskAssessment: parsed.riskAssessment,
      sentiment: parsed.sentiment,
      chatHistory,
      suggestedNextStep
    });

  }catch(err){
    console.error(err);
    res.status(500).json({
      success: false,
      error: "AI processing failed"
    });
  }
})

triageRouter.get("/triage/chat-history", userAuth, async(req, res)=>{
  try{
    const { limit } = req.query
    const history = await ChatMessage.find({senderId : req.user._id})
    if(!history){
      return res.status(404).send("No history found!")
    }
    const limit2 = parseInt(req.query.limit, 10) || allPosts.length; 
    const n = Math.max(0, limit2); 
    const limitedResults = allPosts.slice(0, n);

    res.send(limitedResults)

  }catch(err){
    console.log(err)
    res.status(400).send(err)
  }
})

triageRouter.get("/triage/risk-level", userAuth, async (req, res) => {
  try {
    const userId = req.user._id;

    const latest = await ChatMessage.findOne({
      senderId: userId,
      senderType: "user",
      channel: "triage",
      "aiAnalysis.riskLevel": { $exists: true }
    }).sort({ createdAt: -1 });

    if (!latest) {
      return res.json({
        success: true,
        currentRiskLevel: null,
        riskTrend: null,
        recommendations: [],
        crisisIndicators: false
      });
    }

    const avgScore = async (fromDate) => {
      const msgs = await ChatMessage.find({
        senderId: userId,
        senderType: "user",
        channel: "triage",
        createdAt: { $gte: fromDate }
      });

      if (!msgs.length) return null;

      const scores = msgs
        .map(m => m.aiAnalysis?.riskLevel?.score)
        .filter(Boolean);

      if (!scores.length) return null;

      return scores.reduce((a, b) => a + b, 0) / scores.length;
    };

    const now = new Date();

    const pastHourAvg = await avgScore(new Date(now - 60 * 60 * 1000));
    const pastDayAvg = await avgScore(new Date(now - 24 * 60 * 60 * 1000));
    const pastWeekAvg = await avgScore(new Date(now - 7 * 24 * 60 * 60 * 1000));

    const trend = (current, previous) => {
      if (current == null || previous == null) return "stable";
      if (current > previous) return "increasing";
      if (current < previous) return "decreasing";
      return "stable";
    };

    const currentScore = latest.aiAnalysis.riskLevel.score;

    const currentRiskLevel = {
      level: latest.aiAnalysis.riskLevel.level,
      score: currentScore,
      confidence: latest.aiAnalysis.riskLevel.confidence,
      timestamp: latest.createdAt,
      lastAssessmentAt: latest.createdAt,
      trend: trend(currentScore, pastDayAvg)
    };

    const riskTrend = {
      pastHour: trend(currentScore, pastHourAvg),
      pastDay: trend(currentScore, pastDayAvg),
      pastWeek: trend(currentScore, pastWeekAvg)
    };

    const recommendations = [];

    if (currentScore >= 3 && currentScore < 7) {
      recommendations.push({
        type: "booking",
        specialty: "anxiety_disorders",
        urgency: "within_3_days"
      });
    }

    if (currentScore < 5) {
      recommendations.push({
        type: "relaxation",
        activity: "guided_breathing"
      });
    }

    const crisisIndicators = currentScore >= 7;

    res.json({
      success: true,
      currentRiskLevel,
      riskTrend,
      recommendations,
      crisisIndicators
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      error: "Failed to fetch risk level"
    });
  }
});





export default triageRouter;
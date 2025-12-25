import express from "express";
import { model } from "../geminiClient.js";
import { buildTriagePrompt } from "../prompts/triagePrompt.js";
const userAuth = require("../middlewares/userAuth");
const chatHistory = require("../model/chat_messages")

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

    await chatHistory.create({
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

    await chatHistory.create({
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
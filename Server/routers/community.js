import { userAuth } from "../middlewares/userAuth.js";
import express from "express";
import {CommunityPost} from "../model/communityPost.models.js"
import {PostComment} from "../model/postComment.models.js"
const communityRouter = express.Router();

communityRouter.get("/community/posts", userAuth, async(req, res)=> {
  try{
    const userId = req.user._id;
    const posts = await CommunityPost.find({})
    if(!posts){
      return res.status(404).send("No posts found!!");
    }
    res.send(posts)

  }catch(err){
    res.status(400).send(err)
  }
})

communityRouter.get("/community/myposts", userAuth, async(req, res)=> {
  try{
    const userId = req.user._id;
    const posts = await CommunityPost.find({
      authorId : userId
    })
    if(!posts){
      return res.status(404).send("No posts found!!");
    }
    res.json({
      "status": "success",
      "posts" : posts
    })

  }catch(err){
    res.status(400).send(err)
  }
})

communityRouter.post("/community/posts", userAuth, async(req, res)=> {
  try{
    const userId = req.user._id;
    const { content, category, tags, isAnonymous, image } = req.body
    const posts = new CommunityPost({
      authorId : userId,
      content, 
      category, 
      tags, 
      isAnonymous, 
      image
    })
    if(!posts){
      return res.status(404).send("No posts found!!");
    }
    await posts.save()
    res.json({
      "status": "success",
      "post" : posts
    })

  }catch(err){
    res.status(400).send(err)
  }
})

communityRouter.post("/community/posts/:postId/comments", userAuth, async(req, res)=> {
  try{
    const userId = req.user._id;
    const { postId } = req.params
    const { content, isAnonymous } = req.body
    const post = await CommunityPost.findById(postId)
    if(!post){
      return res.status(404).send("Post Not found!")
    }
    const comment = new PostComment({
        postId: postId,
        authorId: post.authorId,
        authorName: post.authorName,
        content: content,
    })
    await comment.save()

    await CommunityPost.findByIdAndUpdate(
        postId,
        { $inc: { "stats.comments": 1 } },
        { new: true }
      );


    res.json({
      "status": "success",
      comment
    })

  }catch(err){
    res.status(400).send(err)
  }
})

communityRouter.delete("/community/posts/:postId", userAuth, async(req, res)=> {
  try{
    const userId = req.user._id;
    const { postId } = req.params
    const post = await CommunityPost.findOneAndDelete({
      _id: postId,
      authorId: userId
    });

if (!post) {
  return res.status(404).json({
    success: false,
    message: "Post not found or unauthorized"
  });
}
    res.json({
      "status": "success",
      "posts" : posts
    })

  }catch(err){
    res.status(400).send(err)
  }
})

export default communityRouter;
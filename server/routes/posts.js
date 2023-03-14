import express from "express";
import { getFeedPosts, getUserPosts, likePost } from "../controllers/posts.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

/* getting posts*/
router.get("/", verifyToken, getFeedPosts); //shows all theposts of every user
router.get("/:userId/posts", verifyToken, getUserPosts); //shows the posts of that particular user only, profile

/* updating the feed */
router.patch("/:id/like", verifyToken, likePost); //like and unlike a post

export default router;
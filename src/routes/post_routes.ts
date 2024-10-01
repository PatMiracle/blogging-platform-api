import express from "express";
import {
  createPost,
  deletePost,
  getAllPosts,
  getSinglePost,
  updatePost,
  validateBlogPost,
} from "../controllers/posts";

const router = express.Router();

router.post("/", validateBlogPost, createPost);

router.put("/:id", validateBlogPost, updatePost);

router.delete("/:id", deletePost);

router.get("/:id", getSinglePost);

router.get("/", getAllPosts);

export default router;

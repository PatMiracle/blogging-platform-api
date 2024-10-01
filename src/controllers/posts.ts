import { NextFunction, Request, Response } from "express";
import asyncHandler from "express-async-handler";
import Post, { IPost } from "../models/Post";
import { body, validationResult } from "express-validator";
import createHttpError from "http-errors";

export const validateBlogPost = [
  body("title")
    .trim()
    .notEmpty()
    .withMessage("Title is required.")
    .isLength({ max: 60 })
    .withMessage("Title must not exceed 60 characters."),

  body("content")
    .trim()
    .notEmpty()
    .withMessage("Content is required.")
    .isLength({ min: 100 })
    .withMessage("Content must be at least 100 characters."),

  body("category")
    .trim()
    .notEmpty()
    .withMessage("Category is required.")
    .isIn(["technology", "health", "lifestyle", "education", "food"])
    .withMessage(
      "Category must be one of the predefined options - technology, health, lifestyle, education or food."
    ),

  body("tags")
    .isArray()
    .withMessage("Tags must be an array.")
    .custom((tag) => {
      if (tag.length === 0) {
        throw new Error("Tags cannot be empty.");
      }
      return true;
    }),

  body("tags.*")
    .isString()
    .withMessage("Each tags must be a string.")
    .isLength({ max: 15 })
    .withMessage("Each tag must not exceed 15 characters"),
];

export const createPost = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const result = validationResult(req);

    if (result.isEmpty()) {
      const { title, content, category, tags } = req.body;

      const newPost: IPost = new Post({ title, content, category, tags });
      const savedPost = await newPost.save();

      res.status(201).json(savedPost);
    } else {
      next(createHttpError(400, { message: result.array() }));
    }
  }
);

export const updatePost = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const result = validationResult(req);

    if (result.isEmpty()) {
      const { title, content, category, tags } = req.body;
      const { id } = req.params;

      const updatedPost = await Post.findByIdAndUpdate(
        id,
        {
          title,
          content,
          category,
          tags,
        },
        { new: true }
      );

      if (!updatedPost) {
        res.status(404).json({ message: "Post not found" });
      } else res.status(200).json(updatedPost);
    } else {
      next(createHttpError(400, { message: result.array() }));
    }
  }
);

export const deletePost = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;

  const post = await Post.findByIdAndDelete(id);

  if (post) {
    res.status(204).send();
  } else res.status(404).json({ message: "Post not found" });
});

export const getSinglePost = asyncHandler(
  async (req: Request, res: Response) => {
    const { id } = req.params;

    const post = await Post.findById(id);

    if (post) {
      res.status(200).json(post);
    } else res.status(404).json({ message: "Post not found" });
  }
);

export const getAllPosts = asyncHandler(async (req: Request, res: Response) => {
  const { term } = req.query;

  const posts = await Post.find(
    term
      ? {
          $or: [
            { title: { $regex: term, $options: "i" } },
            { content: { $regex: term, $options: "i" } },
            { category: { $regex: term, $options: "i" } },
          ],
        }
      : {}
  );

  if (posts) {
    res.status(200).json(posts);
  } else res.status(500).json({ message: "Error fetching posts" });
});

import express from "express";
import User from "../models/User.js";
import Post from "../models/Post.js";
import bcrypt from "bcrypt";
const router = express.Router();

//createPosts
router.post("/", async (req, res) => {
  const newPosts = new Post(req.body);
  try {
    const posts = await newPosts.save();
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json(error);
  }
});

//Update user
router.put("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post.username === req.body.username) {
      try {
        const updatePost = await Post.findByIdAndUpdate(
          req.params.id,
          {
            $set: req.body,
          },
          { new: true }
        );
        res.status(200).json(updatePost);
      } catch (error) {
        res.status(500).json(error);
      }
    } else {
      res.status(500).json("You can only update your posts!");
    }
  } catch (error) {
    res.status(500).json(error);
  }
});
//Delete user
router.delete("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post.username === req.body.username) {
      try {
        await post.delete();
        res.status(200).json("Post has been delete successfully!");
      } catch (error) {
        res.status(500).json(error);
      }
    } else {
      res.status(500).json("You can only update your posts!");
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

//Get posts
router.get("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    res.status(200).json(post);
  } catch (error) {
    res.status(500).json(error);
  }
});
//Get all posts
router.get("/", async (req, res) => {
  const username = req.query.user;
  const catName = req.query.cat;
  try {
    let posts;
    if (username) {
      posts = await Post.find({ username });
    } else if (catName) {
      posts = await Post.find({
        categories: {
          $in: [catName],
        },
      });
    } else {
      posts = await Post.find();
    }
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json(error);
  }
});

const postRoutes = router;

export default postRoutes;

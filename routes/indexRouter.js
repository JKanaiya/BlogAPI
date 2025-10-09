import express from "express";
import {
  createComment,
  createPost,
  deleteComment,
  deletePost,
  updateComment,
  updatePost,
  getPosts,
} from "../controllers/indexController.js";

import { logIn, signUp, logOut } from "../controllers/auths.js";

const indexRouter = express.Router();

indexRouter.get("/posts", getPosts);
indexRouter.get("/log-out", logOut);
// TODO: Add Auth middleware to:
// Post Comment
indexRouter.post("/log-in", logIn);
indexRouter.post("/sign-up", signUp);
// by returning true on successful comment add, grant react the ability to add the comment to the post?
indexRouter.post("/comment", createComment);
indexRouter.post("/post", createPost);
indexRouter.patch("/comment", updateComment);
indexRouter.patch("/post", updatePost);
indexRouter.delete("/comment", deleteComment);
indexRouter.delete("/post", deletePost);

export default indexRouter;

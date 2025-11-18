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
indexRouter.post("/log-in", logIn);
indexRouter.post("/sign-up", signUp);
indexRouter.post("/comment", createComment);
indexRouter.post("/delete-comment", deleteComment);
indexRouter.post("/update-post", updatePost);
indexRouter.post("/post", createPost);
indexRouter.patch("/comment", updateComment);
indexRouter.delete("/post", deletePost);

export default indexRouter;

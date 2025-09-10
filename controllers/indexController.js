import passport from "passport";
import prisma from "./prismaController.js";

const getPosts = async (req, res) => {
  const posts = await prisma.post.findMany();
  res.json(posts);
};

const createComment = async (req, res) => {
  const commentCreated = await prisma.comment.create({
    data: {
      text: req.body.text,
      userId: res.locals.userId,
      postId: req.body.postId,
    },
  });
  res.json(commentCreated);
};

const confirmCommentAuthor = async (req, res, next) => {
  const comment = await prisma.comment.findFirst({
    where: {
      commentId: req.commentId,
    },
  });

  if (comment.userId === res.locals.user.id) {
    return next();
  } else {
    res.status(400).json("Comment author does not match the user");
  }
};

const updateComment = [
  passport.authenticate("jwt", { session: false }),
  confirmCommentAuthor,
  async (req, res) => {
    const commentUpdated = await prisma.comment.update({
      where: {
        id: req.body.commentId,
      },
      data: {
        text: req.body.text,
      },
    });
    res.json(commentUpdated);
  },
];

const deleteComment = [
  passport.authenticate("jwt", { session: false }),
  confirmCommentAuthor,
  async (req, res) => {
    const postComment = await prisma.comment.delete({
      where: {
        id: req.body.commentId,
      },
    });
    res.json(postComment);
  },
];

const createPost = [
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const now = new Date();
    const postCreated = await prisma.post.create({
      data: {
        text: req.body.text,
        published: req.body.published,
        created: now.toISOString(),
        userId: req.body.userId,
        title: req.body.title,
        writer: res.locals.user,
      },
    });
    res.json(postCreated);
  },
];

const updatePost = [
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const now = new Date();
    const postUpdated = await prisma.post.update({
      where: {
        id: req.body.postId,
      },
      data: {
        text: req.body.text,
        published: req.body.published,
        edited: now.toISOString(),
      },
    });
    res.json(postUpdated);
  },
];

const deletePost = [
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const postDeleted = await prisma.post.delete({
      where: {
        id: req.body.postId,
      },
    });
    res.json(postDeleted);
  },
];

export {
  deleteComment,
  deletePost,
  getPosts,
  updatePost,
  updateComment,
  createPost,
  createComment,
};

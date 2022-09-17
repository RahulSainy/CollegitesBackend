const express = require("express");

const NotesM = require("../models/notes");

const router = express.Router();

router.post("", (req, res, next) => {
//   const url = req.protocol + "://" + req.get("host");
  const post = new Post({
    title: req.body.title,
    content: req.body.content,
    // imagePath: url + "/images/" + req.file.filename,
    creator: req.userData.userId,
  });
  post.save().then((createdPost) => {
    res.status(201).json({
      message: "Post added successfully",
      post: {
        ...createdPost,
        id: createdPost._id,
      },
    });
  });
});

router.put("/:id", (req, res, next) => {
  const post = new Post({
    _id: req.body.id,
    title: req.body.title,
    content: req.body.content,
    creator: req.userData.userId,
  });
  NotesM.updateOne(
    { _id: req.params.id, creator: req.userData.userId },
    post
  ).then((result) => {
    if (result.nModified > 0) {
      res.status(200).json({ message: "Update successful!" });
    } else {
      res.status(401).json({ message: "Not authorized!" });
    }
  });
});

router.get("", (req, res, next) => {
  // const pageSize = +req.query.pagesize;
  // const currentPage = +req.query.page;
  const postQuery = Post.find();
  let fetchedPosts;
  //   if (pageSize && currentPage) {
  //     postQuery.skip(pageSize * (currentPage - 1)).limit(pageSize);
  //   }
  postQuery
    .then((documents) => {
      fetchedPosts = documents;
      //   return Post.count();
    })
    .then((count) => {
      res.status(200).json({
        message: "Posts fetched successfully!",
        posts: fetchedPosts,
        // maxPosts: count,
      });
    });
});
router.get("/:id", (req, res, next) => {
  Post.findById(req.params.id).then((post) => {
    if (post) {
      res.status(200).json(post);
    } else {
      res.status(404).json({ message: "Post not found!" });
    }
  });
});

router.delete("/:id", (req, res, next) => {
    Post.deleteOne({ _id: req.params.id, creator: req.userData.userId }).then(
      result => {
        console.log(result);
        if (result.n > 0) {
          res.status(200).json({ message: "Deletion successful!" });
        } else {
          res.status(401).json({ message: "Not authorized!" });
        }
      }
    );
  });
  
  module.exports = router;

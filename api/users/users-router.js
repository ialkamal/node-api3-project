const express = require("express");
const usersDB = require("../users/users-model");
const postsDB = require("../posts/posts-model");
const {
  validatePost,
  validateUserId,
  validateUser,
} = require("../middleware/middleware");

const router = express.Router();

router.post("/", validateUser, (req, res) => {
  // do your magic!
  // this needs a middleware to check that the request body is valid
  const user = req.body;
  usersDB
    .insert(user)
    .then((newUser) => res.status(201).send(newUser))
    .catch((err) => res.status(500).send("server failed.", err));
});

router.get("/", (req, res) => {
  // do your magic!
  usersDB
    .get()
    .then((users) => res.status(200).send(users))
    .catch((err) => res.status(500).send("server failed.", err));
});

router.get("/:id", validateUserId, (req, res) => {
  // do your magic!
  // this needs a middleware to verify user id
  usersDB
    .getById(req.params.id)
    .then((user) => res.status(200).send(user))
    .catch((err) => res.status(500).send("server failed.", err));
});

router.delete("/:id", validateUserId, (req, res) => {
  // do your magic!
  // this needs a middleware to verify user id
  usersDB
    .remove(req.params.id)
    .then((checkFlag) => {
      if (checkFlag === 1) res.status(204);
    })
    .catch((err) =>
      res.status(500).json({ message: "server failed.", error: err })
    );
});

router.put("/:id", validateUserId, validateUser, (req, res) => {
  // do your magic!
  // this needs a middleware to verify user id
  // and another middleware to check that the request body is valid
  const { id } = req.params;
  const user = req.body;

  usersDB
    .update(id, user)
    .then((checkFlag) => {
      if (checkFlag === 1) res.status(200).send({ id: Number(id), ...user });
    })
    .catch((err) =>
      res.status(500).send({ message: "server failed.", error: err })
    );
});

router.post("/:id/posts", validateUserId, validatePost, (req, res) => {
  // do your magic!
  // this needs a middleware to verify user id
  // and another middleware to check that the request body is valid
  const user_id = req.params.id;
  const post = req.body;

  postsDB
    .insert({ ...post, user_id })
    .then((newPost) => {
      res.status(201).send(newPost);
    })
    .catch((err) =>
      res.status(500).json({ message: "server failed.", error: err })
    );
});

router.get("/:id/posts", validateUserId, (req, res) => {
  // do your magic!
  // this needs a middleware to verify user id
  usersDB
    .getUserPosts(req.params.id)
    .then((posts) => res.status(200).send(posts))
    .catch((err) =>
      res.status(500).json({ message: "server failed.", error: err })
    );
});

// do not forget to export the router
module.exports = router;

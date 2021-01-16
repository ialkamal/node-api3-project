const express = require("express");
const postsDB = require("../posts/posts-model");
const {
  validatePost,
  validatePostId,
  validateUserId,
} = require("../middleware/middleware");

const router = express.Router();

router.get("/", (req, res) => {
  // do your magic!
  postsDB
    .get()
    .then((posts) => res.status(200).send(posts))
    .catch((err) => res.status(500).send("Can't get posts from server."));
});

router.get("/:id", validatePostId, (req, res) => {
  // do your magic!
  // this needs a middleware to verify post id
  const post = req.post;
  if (!post) res.status(500).send("Can't get post from server.");
  else res.status(200).send(post);
});

router.delete("/:id", validatePostId, async (req, res) => {
  // do your magic!
  // this needs a middleware to verify post id
  const { id } = req.params;
  try {
    const count = await postsDB.remove(id);
    if (count === 1) res.sendStatus(204);
  } catch (err) {
    res.status(500).send("Can't delete post from server.");
  }
});

router.put("/:id", async (req, validatePostId, res) => {
  // do your magic!
  // this needs a middleware to verify post id
  const { id } = req.params;
  const changes = req.body;
  console.log(id, changes);

  try {
    const updatedPost = await postsDB.update(id, changes);
    console.log(updatedPost);
    res.status(200).send(updatedPost);
    //if (count === 1) res.sendStatus(204);
  } catch (err) {
    res.status(500).send("Can't delete post from server.");
  }
});

// do not forget to export the router
module.exports = router;

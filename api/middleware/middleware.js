const postsDB = require("../posts/posts-model");
const usersDB = require("../users/users-model");

function logger(req, res, next) {
  // do your magic!
  console.log(
    `[Request Method: ${req.method}, Request URL: ${
      req.url
    }, Timestamp: ${new Date().toISOString()}]`
  );
  next();
}

async function validateUserId(req, res, next) {
  // do your magic!
  const { id } = req.params;
  try {
    const user = await usersDB.getById(id);
    if (!user) res.status(404).send({ message: "user not found" });
    else {
      req.user = { ...user };
      next();
    }
  } catch (err) {
    next(err);
  }
}

function validateUser(req, res, next) {
  // do your magic!
  const user = req.body;
  if (!user) res.status(400).send({ message: "missing user data" });
  else {
    if (!user.name)
      res.status(400).send({ message: "missing required name field" });
    next();
  }
}

async function validatePostId(req, res, next) {
  // do your magic!
  const { id } = req.params;
  try {
    const post = await postsDB.getById(id);
    if (!post) res.status(404).send({ message: "post not found" });
    else {
      req.post = { ...post };
      next();
    }
  } catch (err) {
    next(err);
  }
}

async function validatePost(req, res, next) {
  // do your magic!
  const post = req.body;
  if (!post) res.status(400).send({ message: "missing post data" });
  else {
    if (!post.text)
      res.status(400).send({ message: "missing required text field" });
    if (!post.user_id) {
      res.status(400).send({ message: "missing required user id field" });
    } else {
      try {
        const user = await usersDB.getById(post.user_id);
        if (!user) res.status(404).json({ message: "user not found" });
        else next();
      } catch (err) {
        next(err);
      }
    }
  }
}

// do not forget to expose these functions to other modules
module.exports = {
  logger,
  validateUserId,
  validateUser,
  validatePostId,
  validatePost,
};

require("dotenv").config();
const express = require("express");
const postsRouter = require("./posts/posts-router");
const usersRouter = require("./users/users-router");
const { logger } = require("./middleware/middleware");

const server = express();

// remember express by default cannot parse JSON in request bodies
server.use(express.json());

// global middlewares and routes need to be connected here
server.use(logger);

server.use("/api/posts", postsRouter);
server.use("/api/users", usersRouter);

server.use((err, req, res, next) => {
  console.error(err);

  res.status(500).json({
    message: "There was an error performing the required operation",
    error: err,
  });
});

server.get("/", (req, res) => {
  res.send(`<h2>${process.env.MESSAGE}</h2>`);
});

server.use((error, req, res, next) => {
  res.status(400).json({ message: "The request failed", error });
});

module.exports = server;

const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const authRouter = require("./routes/auth.route");
const feedRouter = require("./routes/feed.route");
const postRouter = require("./routes/post.route");

const app = express();

app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.use("/auth", authRouter);
app.use("/feed", feedRouter);
app.use("/posts", postRouter);

module.exports = app;
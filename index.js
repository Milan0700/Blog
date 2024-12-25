const path = require("path");
const express = require("express");
const app = express();
const PORT = 8000;
const cookieParser = require("cookie-parser");
const userRoute = require("./routes/user");
const blogRouter = require("./routes/blog");
const { connectMongo } = require("./connection");
const { checkForAuthentication } = require("./middleware/authentication");
const url = "mongodb://127.0.0.1:27017/Blogify";
const Blog = require("./models/blog");

connectMongo(url);
app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(checkForAuthentication("token"));
app.use(express.static(path.resolve("./public")));

app.use("/user", userRoute);
app.use("/blog", blogRouter);
app.get("/", async (req, res) => {
  const allBlogs = await Blog.find({});
  return res.render("homepage", {
    user: req.user,
    blogs: allBlogs,
  });
});

app.listen(PORT, () => console.log(`Server is running on PORT:${PORT}`));

const express = require("express");
require("dotenv").config();
const path = require("path");
const app = express();
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const Blog = require("./models/blog");

const PORT = process.env.PORT|| 8000;

mongoose
  .connect(process.env.MONGO_URL)//mongodb://127.0.0.1:27017/blogify
  .then((e) => console.log("MongoDB Connected"));

//routes
const userRoute = require("./routes/user");
const blogRoute = require("./routes/blog");

//custom middleware
const { checkForAuthenticationCookie } = require("./middleware/authentication");

//built in middlewares
app.use(express.urlencoded({ extended: false })); //to handle form data
app.use(cookieParser());
app.use(checkForAuthenticationCookie("token"));
app.use(express.static(path.resolve("./public"))); //content in public serve statically

//server side rendering using ejs
app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.get("/", async (req, res) => {
  const allBlogs = await Blog.find({});
  res.render("home", {
    user: req.user,
    blogs: allBlogs,
  });
});

app.use("/user", userRoute);
app.use("/blog", blogRoute);

app.listen(PORT, () => console.log(`server running on ${PORT}`));

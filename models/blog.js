const { Schema, model } = require("mongoose");

const blogSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    body: {
      type: String,
      required: true,
    },
    coverImageURl: {
      type: String,
      required: false,
    },
    createdBy: {
      type: Schema.Types.ObjectId, //pointed to the user
      ref: "user",
    },
  },
  { timestamps: true }
);

const Blog = model("blog", blogSchema);
module.exports = Blog;

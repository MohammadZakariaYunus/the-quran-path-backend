import { StatusCodes } from "http-status-codes";
import type { IBlog } from "./blog.interface.js";
import { Blog } from "./blog.model.js";
import AppError from "../../errorHelpers/AppError.js";

const createBlog = async (payload: IBlog) => {
  const slug = payload.title.toLowerCase().split(" ").join("-");

  const isBlogExist = await Blog.findOne({ slug });
  if (isBlogExist) {
    throw new AppError(
      StatusCodes.BAD_REQUEST,
      "A blog with this title already exists!",
    );
  }
  const wordCount = payload.content.split(/\s+/).length;
  payload.readingTime = Math.ceil(wordCount / 200);
  payload.slug = slug;
  const result = await Blog.create(payload);
  return result;
};

const getAllBlogs = async () => {
  const totalBlogs = await Blog.countDocuments({ status: "published" });
  const blogs = await Blog.find({ status: "published" })
    .populate("author")
    .sort("-createdAt");
  return {
    data: blogs,
    meta: {
      total: totalBlogs,
    },
  };
};

const getSingleBlog = async (slug: string) => {
  const result = await Blog.findOneAndUpdate(
    { slug, status: "published" },
    { $inc: { views: 1 } },
    { after: true },
  ).populate("author");

  if (!result) {
    throw new AppError(StatusCodes.NOT_FOUND, "Blog not found!");
  }
  return result;
};

const updateBlog = async (id: string, payload: Partial<IBlog>) => {
  const existingBlog = await Blog.findById(id);
  if (!existingBlog) {
    throw new AppError(StatusCodes.NOT_FOUND, "Blog not found");
  }

  if (payload.title) {
    const isDuplicate = await Blog.findOne({
      title: payload.title,
      _id: { $ne: id },
    });

    if (isDuplicate) {
      throw new AppError(
        StatusCodes.BAD_REQUEST,
        "A Blog with this title already exists.",
      );
    }

    payload.slug = payload.title.toLowerCase().split(" ").join("-");
  }

  if (payload.content) {
    const wordCount = payload.content.trim().split(/\s+/).length;
    payload.readingTime = Math.ceil(wordCount / 200);
  }

  const result = await Blog.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });

  return result;
};

const deleteBlog = async (id: string) => {
  const result = await Blog.findByIdAndUpdate(
    id,
    { status: "archived" },
    { after: true },
  );
  return result;
};

export const BlogServices = {
  createBlog,
  getAllBlogs,
  getSingleBlog,
  updateBlog,
  deleteBlog,
};

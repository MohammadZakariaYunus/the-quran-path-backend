import { model, Schema } from "mongoose";
import type { IBlog } from "./blog.interface.js";

const blogSchema = new Schema(
  {
    title: { type: String, required: true, unique: true },
    slug: { type: String, required: true, lowercase: true },
    content: { type: String, required: true },
    author: { type: Schema.Types.ObjectId, ref: "User", required: true },
    bannerImage: { type: String },
    category: { type: String, required: true },
    views: { type: Number, default: 0 },
    status: {
      type: String,
      enum: ["draft", "published", "archived"],
      default: "published",
    },
  },
  { timestamps: true },
);

export const Blog = model<IBlog>("Blog", blogSchema);

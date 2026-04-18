import { z } from "zod";
const BlogStatus = ["draft", "published", "archived"] as const;
export const createBlogValidationSchema = z.object({
  body: z.object({
    title: z
      .string("Title is required")
      .min(10, "Title must be at least 10 characters long")
      .max(150),
    content: z
      .string("Content is required")
      .min(50, "Content is too short, must be at least 50 characters"),
    author: z.string("Author ID is required"),
    bannerImage: z.url({ message: "Invalid banner URL" }).optional(),
    category: z.string("Category is required"),
    metaDescription: z
      .string()
      .max(160, "Meta description should be under 160 characters")
      .optional(),
    readingTime: z.number().min(0).default(0),
    views: z.number().min(0).default(0),
    status: z
      .enum(BlogStatus, {
        message: "Status must be draft, published, or archived",
      })
      .default("draft"),
    isFeatured: z.boolean().default(false),
    commentsCount: z.number().min(0).default(0),
  }),
});

export const updateBlogValidationSchema = z.object({
  body: z.object({
    title: z.string().min(10).max(150).optional(),
    content: z.string().min(50).optional(),
    author: z.string().optional(),
    bannerImage: z.url({ message: "Invalid banner URL" }).optional(),
    category: z.string().optional(),
    metaDescription: z.string().max(160).optional(),
    readingTime: z.number().min(0).optional(),
    views: z.number().min(0).optional(),
    status: z
      .enum(BlogStatus, {
        message: "Status must be draft, published, or archived",
      })
      .optional(),
    isFeatured: z.boolean().optional(),
    commentsCount: z.number().min(0).optional(),
  }),
});

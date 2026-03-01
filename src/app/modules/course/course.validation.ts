import { z } from "zod";

const lessonValidationSchema = z.object({
  title: z.string("Lesson title is required"),
  description: z.string().optional(),
  type: z.enum(["video", "live"]),
  videoUrl: z.url().optional(),
  zoomLink: z.url().optional(),
  liveTime: z.string().optional(), // ISO date string format
  duration: z.string("Duration is required"),
});

const moduleValidationSchema = z.object({
  moduleName: z.string("Module name is required"),
  lessons: z.array(lessonValidationSchema),
});

export const createCourseValidationSchema = z.object({
  body: z.object({
    title: z.string("Course title is required"),
    description: z.string("Description is required"),
    thumbnail: z.string("Thumbnail URL is required"),
    price: z.number("Price is required"),
    discountPrice: z.number().optional(),
    category: z.string("Category is required"),
    instructor: z.string("Instructor ID is required"),
    status: z.enum(["upcoming", "ongoing", "completed"]).optional(),
    modules: z.array(moduleValidationSchema),
    durationInWeeks: z.number().optional(),
    tags: z.array(z.string()).optional(),
  }),
});

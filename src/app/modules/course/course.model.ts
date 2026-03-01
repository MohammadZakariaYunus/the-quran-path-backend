import { Schema, model } from "mongoose";
import type { ICourse, ICourseModule, ILesson } from "./course.interface.js";

const lessonSchema = new Schema<ILesson>({
  title: { type: String, required: true },
  description: { type: String },
  type: { type: String, enum: ["video", "live"], required: true },
  videoUrl: { type: String },
  zoomLink: { type: String },
  liveTime: { type: Date },
  duration: { type: String, required: true },
});

const moduleSchema = new Schema<ICourseModule>({
  moduleName: { type: String, required: true },
  lessons: [lessonSchema],
});

const courseSchema = new Schema<ICourse>(
  {
    title: { type: String, required: true, unique: true },
    slug: { type: String, required: true, unique: true, lowercase: true },
    description: { type: String, required: true },
    thumbnail: { type: String, required: true },
    price: { type: Number, required: true },
    discountPrice: { type: Number },
    category: { type: String, required: true },
    instructor: { type: Schema.Types.ObjectId, ref: "User", required: true },
    status: {
      type: String,
      enum: ["upcoming", "ongoing", "completed"],
      default: "upcoming",
    },
    modules: [moduleSchema],
    totalLectures: { type: Number, default: 0 },
    durationInWeeks: { type: Number, default: 0 },
    totalEnrolled: { type: Number, default: 0 },
    tags: [{ type: String }],
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true },
);

export const Course = model<ICourse>("Course", courseSchema);

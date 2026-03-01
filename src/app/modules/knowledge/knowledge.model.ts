import { Schema, model } from "mongoose";
import type {
  IInstructionPoint,
  IKnowledge,
  IRelatedResource,
} from "./knowledge.interface.js";

// Instruction Point Schema (Sub-schema for Steps)
const instructionPointSchema = new Schema<IInstructionPoint>({
  title: { type: String, required: true },
  description: { type: String, required: true },
});

// Related Resource Schema (Sub-schema)
const relatedResourceSchema = new Schema<IRelatedResource>({
  label: { type: String, required: true },
  url: { type: String, required: true },
});

const knowledgeSchema = new Schema<IKnowledge>(
  {
    topic: {
      type: String,
      required: [true, "Topic is required"],
      unique: true,
      trim: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    category: {
      type: String,
      required: [true, "Category is required"],
      index: true, // দ্রুত সার্চ করার জন্য ইনডেক্স করা হলো
    },
    // প্যারাগ্রাফের জন্য
    description: {
      type: String,
    },
    // পয়েন্ট ভিত্তিক মাসয়ালার জন্য
    steps: {
      type: [instructionPointSchema],
      default: undefined, // যদি ডাটা না থাকে তবে যেন খালি অ্যারে না দেখায় (ঐচ্ছিক)
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    attachments: {
      type: [String],
      default: [],
    },
    relatedResources: {
      type: [relatedResourceSchema],
      default: [],
    },
    helpfulCount: {
      type: Number,
      default: 0,
    },
    unhelpfulCount: {
      type: Number,
      default: 0,
    },
    tags: {
      type: [String],
      default: [],
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

export const Knowledge = model<IKnowledge>("Knowledge", knowledgeSchema);

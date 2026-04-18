import { Schema, model } from "mongoose";
import type {
  ICharter,
  IInstructionPoint,
  IGuidance,
} from "./guidance.interface.js";

// Instruction Point Schema (Sub-schema for Steps)
const instructionPointSchema = new Schema<IInstructionPoint>({
  title: { type: String, required: true },
  description: { type: String, required: true },
});

// Related Resource Schema (Sub-schema)
const charterSchema = new Schema<ICharter>({
  label: { type: String, required: true },
  url: { type: String, required: true },
});

const guidanceSchema = new Schema<IGuidance>(
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
      index: true,
    },
    description: {
      type: String,
    },
    steps: {
      type: [instructionPointSchema],
      default: undefined,
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
    charter: {
      type: [charterSchema],
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

export const Guidance = model<IGuidance>("Guidance", guidanceSchema);

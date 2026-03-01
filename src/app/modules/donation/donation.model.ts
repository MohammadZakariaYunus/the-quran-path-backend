import { Schema, model } from "mongoose";
import type { IDonation } from "./donation.interface.js";

const donationSchema = new Schema<IDonation>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User identity is required"],
    },
    amount: {
      type: Number,
      required: [true, "Donation amount is required"],
      min: [1, "Amount must be at least 1"],
    },
    currency: {
      type: String,
      default: "BDT",
    },
    paymentStatus: {
      type: String,
      enum: ["pending", "paid", "failed", "cancelled"],
      default: "pending",
    },
    transactionId: {
      type: String,
      required: true,
      unique: true, // ডুপ্লিকেট পেমেন্ট রোধ করতে
    },
    message: {
      type: String,
      trim: true,
    },
    category: {
      type: String,
      enum: ["course", "general", "project"],
      required: true,
    },
    referrenceId: {
      type: Schema.Types.ObjectId,
      refPath: "category", // ক্যাটাগরি অনুযায়ী ডাইনামিক রেফারেন্স (Optional)
    },
  },
  {
    timestamps: true,
  },
);

export const Donation = model<IDonation>("Donation", donationSchema);

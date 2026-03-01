import { Types } from "mongoose";

export type TPaymentStatus = "pending" | "paid" | "failed" | "cancelled";

export interface IDonation {
  user: Types.ObjectId; // কে ডোনেশন দিচ্ছে (User Ref)
  amount: number; // ডোনেশনের পরিমাণ
  currency: string; // BDT, USD ইত্যাদি
  paymentStatus: TPaymentStatus; // পেমেন্টের বর্তমান অবস্থা
  transactionId: string; // পেমেন্ট গেটওয়ে থেকে আসা আইডি
  message?: string; // ডোনারের কোনো বিশেষ বার্তা
  category: "course" | "general" | "project"; // ডোনেশনটি কিসের জন্য
  referrenceId?: Types.ObjectId; // যদি নির্দিষ্ট কোনো কোর্সের জন্য হয়
}

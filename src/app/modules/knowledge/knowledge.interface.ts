import { Schema, model, Types } from "mongoose";

export interface IInstructionPoint {
  title: string;
  description: string;
}

export interface IRelatedResource {
  label: string;
  url: string;
}

export interface IKnowledge {
  topic: string;
  slug: string;
  category: string; // যেমন: 'Taharat', 'Salah', 'Sawm'

  description?: string; // প্যারাগ্রাফ মাসয়ালার জন্য
  steps?: IInstructionPoint[]; // পয়েন্ট ভিত্তিক মাসয়ালার জন্য (গোসলের ফরজ ইত্যাদি)

  author: Types.ObjectId;
  attachments?: string[];
  relatedResources?: IRelatedResource[];

  helpfulCount: number;
  unhelpfulCount: number;

  tags: string[];
  isActive: boolean;
}

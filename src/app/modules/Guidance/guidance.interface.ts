import { Types } from "mongoose";

export interface IInstructionPoint {
  title: string;
  description: string;
}

export interface ICharter {
  label: string;
  url: string;
}

export interface IGuidance {
  topic: string;
  slug: string;
  category: string;

  description?: string;
  steps?: IInstructionPoint[];

  author: Types.ObjectId;
  attachments?: string[];
  charter?: ICharter[];

  helpfulCount: number;
  unhelpfulCount: number;

  tags: string[];
  isActive: boolean;
}

import { Types } from "mongoose";

export type TBlogStatus = "draft" | "published" | "archived";

export interface IBlog {
  title: string;
  slug: string;
  content: string;
  author: Types.ObjectId;
  bannerImage: string;
  category: string;
  tags: string[];

  metaDescription?: string;
  readingTime: number;
  views: number;
  status: TBlogStatus;
  isFeatured: boolean;

  commentsCount: number;
}

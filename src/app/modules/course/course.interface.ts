import { Types } from "mongoose";

export type TCourseStatus = "upcoming" | "ongoing" | "completed";
export type TLessonType = "video" | "live"; // শুধুমাত্র ভিডিও এবং লাইভ রাখা হলো

export interface ILesson {
  title: string;
  description?: string;
  type: TLessonType;
  videoUrl?: string; // Pre-recorded ভিডিওর জন্য (YouTube/Vimeo/Cloudinary)
  zoomLink?: string; // Live ক্লাসের জন্য জুম লিঙ্ক
  liveTime?: Date; // জুম ক্লাস কখন শুরু হবে
  duration: string; // উদা: "৪৫ মিনিট"
}

export interface ICourseModule {
  moduleName: string;
  lessons: ILesson[];
}

export interface ICourse {
  title: string;
  slug: string;
  description: string;
  thumbnail: string;
  price: number;
  discountPrice?: number;
  category: string; // যেমন: 'কোরআন শিক্ষা', 'নামাজ শিক্ষা'
  instructor: Types.ObjectId;

  status: TCourseStatus;
  modules: ICourseModule[];

  totalLectures: number;
  durationInWeeks: number;
  totalEnrolled: number;

  tags: string[];
  isActive: boolean;
}

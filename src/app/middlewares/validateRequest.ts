import type { NextFunction, Request, Response } from "express";
import type { ZodObject } from "zod";

export const validateRequest =
  (
    zodSchema: ZodObject, // ZodObject এর বদলে AnyZodObject ব্যবহার করা ভালো
  ) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      // এখানে req.body এর বদলে পুরো অবজেক্ট পাস করুন যাতে স্কিমার 'body' এর সাথে মিলে যায়
      const parsedData = await zodSchema.parseAsync({
        body: req.body,
        query: req.query,
        params: req.params,
        cookies: req.cookies,
      });

      // ভ্যালিডেশনের পর ক্লিন ডাটা আবার req এ সেট করে দিন
      req.body = parsedData.body;

      next();
    } catch (error) {
      next(error);
    }
  };

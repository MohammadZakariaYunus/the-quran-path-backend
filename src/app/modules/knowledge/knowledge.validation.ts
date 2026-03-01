import { z } from "zod";

export const createKnowledgeValidationSchema = z.object({
  body: z.object({
    topic: z.string("Topic is required"),
    category: z.string("Category is required"),
    description: z.string().optional(),
    steps: z
      .array(
        z.object({
          title: z.string(),
          description: z.string(),
        }),
      )
      .optional(),
    tags: z.array(z.string()).optional(),
    author: z.string(),
  }),
});

export const updateKnowledgeValidationSchema = z.object({
  body: z.object({
    topic: z.string().optional(),
    category: z.string().optional(),
    description: z.string().optional(),
    steps: z
      .array(
        z.object({
          title: z.string(),
          description: z.string(),
        }),
      )
      .optional(),
    isActive: z.boolean().optional(),
  }),
});

import { Knowledge } from "./knowledge.model.js";
import AppError from "../../errorHelpers/AppError.js";
import { StatusCodes } from "http-status-codes";
import type { IKnowledge } from "./knowledge.interface.js";

const createKnowledge = async (payload: IKnowledge) => {
  const slug = payload.topic.toLowerCase().split(" ").join("-");

  const isExist = await Knowledge.findOne({ slug });
  if (isExist) {
    throw new AppError(StatusCodes.BAD_REQUEST, "This topic already exists!");
  }

  payload.slug = slug;
  const result = await Knowledge.create(payload);
  return result;
};

const getAllKnowledge = async (query: any) => {
  const filter = query.category ? { category: query.category } : {};
  const result = await Knowledge.find(filter).populate("author");
  return result;
};

const getSingleKnowledge = async (slug: string) => {
  const result = await Knowledge.findOne({ slug }).populate("author");
  if (!result) {
    throw new AppError(StatusCodes.NOT_FOUND, "Knowledge not found!");
  }
  return result;
};

const updateKnowledge = async (id: string, payload: Partial<IKnowledge>) => {
  if (payload.topic) {
    payload.slug = payload.topic.toLowerCase().split(" ").join("-");
  }
  const result = await Knowledge.findByIdAndUpdate(id, payload, { new: true });
  return result;
};

const deleteKnowledge = async (id: string) => {
  const result = await Knowledge.findByIdAndUpdate(
    id,
    { isActive: false },
    { after: true },
  );
  return result;
};

export const KnowledgeServices = {
  createKnowledge,
  getAllKnowledge,
  getSingleKnowledge,
  updateKnowledge,
  deleteKnowledge,
};

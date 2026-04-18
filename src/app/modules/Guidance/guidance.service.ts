import AppError from "../../errorHelpers/AppError.js";
import { StatusCodes } from "http-status-codes";
import { QueryBuilder } from "../../utils/QueryBuilder.js";
import type { IGuidance } from "./guidance.interface.js";
import { Guidance } from "./guidance.model.js";
import { guidanceSearchableFields } from "./guidance.constant.js";

const createGuidance = async (payload: IGuidance) => {
  const slug = payload.topic.toLowerCase().split(" ").join("-");

  const isExist = await Guidance.findOne({ slug });
  if (isExist) {
    throw new AppError(StatusCodes.BAD_REQUEST, "This topic already exists!");
  }

  payload.slug = slug;
  const result = await Guidance.create(payload);
  return result;
};

const getAllGuidance = async (query: Record<string, string>) => {
  const guidanceQueryBuilder = new QueryBuilder(Guidance.find(), query);

  const guidanceData = guidanceQueryBuilder
    .search(guidanceSearchableFields)
    .filter()
    .sort()
    .fields()
    .paginate();

  const [data, meta] = await Promise.all([
    guidanceData.build(),
    guidanceQueryBuilder.getMeta(),
  ]);

  return {
    meta,
    data,
  };
};

const getSingleGuidance = async (slug: string) => {
  const result = await Guidance.findOne({ slug }).populate("author");
  if (!result) {
    throw new AppError(StatusCodes.NOT_FOUND, "Guidance not found!");
  }
  return result;
};

const updateGuidance = async (id: string, payload: Partial<IGuidance>) => {
  if (payload.topic) {
    payload.slug = payload.topic.toLowerCase().split(" ").join("-");
  }
  const result = await Guidance.findByIdAndUpdate(id, payload, { new: true });
  return result;
};

const deleteGuidance = async (id: string) => {
  const result = await Guidance.findByIdAndUpdate(
    id,
    { isActive: false },
    { after: true },
  );
  return result;
};

export const GuidanceServices = {
  createGuidance,
  getAllGuidance,
  getSingleGuidance,
  updateGuidance,
  deleteGuidance,
};

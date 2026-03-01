import { StatusCodes } from "http-status-codes";
import AppError from "../../errorHelpers/AppError.js";
import { User } from "../user/user.model.js";
import bcrypt from "bcryptjs";
import { createNewAccessTokenWithRefreshToken } from "../../utils/user.tokens.js";
import type { JwtPayload } from "jsonwebtoken";
import { envVars } from "../../config/env.js";

const getNewAccessToken = async (refreshToken: string) => {
  const newAccessToken =
    await createNewAccessTokenWithRefreshToken(refreshToken);

  return {
    accessToken: newAccessToken,
  };
};
//
const resetPassword = async (
  oldPassword: string,
  newPassword: string,
  decodedToken: JwtPayload,
) => {
  const user = await User.findById(decodedToken.userId).select("+password");

  if (!user) {
    throw new AppError(StatusCodes.NOT_FOUND, "User not found");
  }

  const isOldPasswordMatch = await bcrypt.compare(
    oldPassword,
    user.password as string,
  );

  if (!isOldPasswordMatch) {
    throw new AppError(StatusCodes.UNAUTHORIZED, "Old Password does not Match");
  }

  user.password = await bcrypt.hash(
    newPassword,
    Number(envVars.BCRYPT_SALT_ROUND),
  );

  user.save();
};

export const AuthServices = {
  getNewAccessToken,
  resetPassword,
};

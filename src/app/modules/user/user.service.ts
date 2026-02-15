import { StatusCodes } from "http-status-codes";
import AppError from "../../errorHelpers/AppError.js";
import {
  IsActive,
  Role,
  type IAuthProvider,
  type IUser,
} from "./user.interface.js";
import { User } from "./user.model.js";
import bcrypt from "bcryptjs";
import { envVars } from "../../config/env.js";
import type { JwtPayload } from "jsonwebtoken";

const createUser = async (payload: Partial<IUser>) => {
  const { email, password, ...rest } = payload;

  const isUserExist = await User.findOne({ email: email as string });
  if (isUserExist) {
    throw new AppError(StatusCodes.BAD_REQUEST, "User Already Exist");
  }

  const hashedPassword = await bcrypt.hash(
    password as string,
    Number(envVars.BCRYPT_SALT_ROUND),
  );

  const authProvider: IAuthProvider = {
    provider: "credentials",
    providerId: email as string,
  };

  const user = await User.create({
    email: email as string,
    password: hashedPassword,
    auths: [authProvider],
    ...rest,
  });
  return user;
};

const updateUser = async (
  userId: string,
  payload: Partial<IUser>,
  decodedToken: JwtPayload,
) => {
  const ifUserExist = await User.findById(userId);
  if (!ifUserExist) {
    throw new AppError(StatusCodes.NOT_FOUND, "User Not Found");
  }

  const highPrivilegedRoles = [Role.SUPER_ADMIN, Role.ADMIN];
  const isHighAdmin = highPrivilegedRoles.includes(decodedToken.role);

  if (!isHighAdmin && userId !== decodedToken.userId) {
    throw new AppError(
      StatusCodes.FORBIDDEN,
      "You can only update your own profile!",
    );
  }

  if (payload.role) {
    if (!isHighAdmin) {
      throw new AppError(StatusCodes.FORBIDDEN, "Only admins can change roles");
    }

    if (payload.role === Role.SUPER_ADMIN && decodedToken.role === Role.ADMIN) {
      throw new AppError(
        StatusCodes.FORBIDDEN,
        "Admins cannot promote anyone to Super Admin",
      );
    }
  }

  if (payload.isActive || payload.isDeleted || payload.isVerified) {
    const canChangeStatus = [
      Role.SUPER_ADMIN,
      Role.ADMIN,
      Role.MODERATOR,
    ].includes(decodedToken.role);

    if (!canChangeStatus) {
      throw new AppError(
        StatusCodes.FORBIDDEN,
        "You don't have permission to change account status",
      );
    }
  }

  if (payload.password) {
    payload.password = await bcrypt.hash(
      payload.password,
      Number(envVars.BCRYPT_SALT_ROUND),
    );
  }

  const newUpdatedUser = await User.findByIdAndUpdate(userId, payload, {
    returnDocument: "after",
    runValidators: true,
  }).select("-password");

  return newUpdatedUser;
};

const getAllUsers = async () => {
  const users = await User.find({});

  const totalUser = await User.countDocuments();
  return {
    data: users,
    meta: { total: totalUser },
  };
};

export const UserServices = { createUser, getAllUsers, updateUser };

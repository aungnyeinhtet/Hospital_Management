import { User } from "@prisma/client";
import * as userRepository from "../repositories/user.repository";

export const findManyUsers = () => {
  //
};

/**
 * find user by id
 *
 * @param id string
 * @returns Promise<User>
 */
export const findUserById = async (id: string): Promise<User> => {
  return await userRepository.findUserById(id);
};

/**
 * find user by email
 *
 * @param email string
 * @returns Promise<User>
 */
export const findUserByEmail = async (email: string): Promise<User> => {
  return await userRepository.findUserByEmail(email);
};

export const createUser = async ({}) => {
  //
};

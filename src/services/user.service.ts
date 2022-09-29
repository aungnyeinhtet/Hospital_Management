import { User } from "@prisma/client";
import * as userRepository from "../repositories/user.repository";

export const findMany = () => {
  //
};

/**
 * find user by id
 *
 * @param id string
 * @returns Promise<User>
 */
export const findById = async (id: string): Promise<User> => {
  return await userRepository.findById(id);
};

/**
 * find user by email
 *
 * @param email string
 * @returns Promise<User>
 */
export const findByEmail = async (email: string): Promise<User> => {
  return await userRepository.findByEmail(email);
};

export const createUser = async ({}) => {
  //
};

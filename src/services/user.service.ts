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

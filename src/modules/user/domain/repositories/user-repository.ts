import { User } from "../entities/user";

export const UserRepository = Symbol.for("UserRepository");

export interface IUserRepository {
  create(user: User): Promise<User>;
  findByEmail(email: string): Promise<User | null>;
}

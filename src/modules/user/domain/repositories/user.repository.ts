import { User } from "../entities/user";

export const UserRepository = Symbol.for("UserRepository");

export interface IUserRepository<Context = any> {
  create(user: User, ctx?: Context): Promise<void>;
  findByEmail(email: string, ctx?: Context): Promise<User | null>;
}

import { PostgresJsDatabase } from "drizzle-orm/postgres-js";
import { IUserRepository } from "../../domain/repositories/user-repository";
import { User } from "../../domain/entities/user";

export class DrizzleUserRepository implements IUserRepository {
  // constructor(private readonly drizzleClient: PostgresJsDatabase) {}

  async create(user: User): Promise<User> {
    throw new Error("Method not implemented.");
  }

  async findByEmail(email: string): Promise<User | null> {
    throw new Error("Method not implemented.");
  }
}

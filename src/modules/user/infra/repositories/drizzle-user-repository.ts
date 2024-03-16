import { PostgresJsDatabase } from "drizzle-orm/postgres-js";
import { IUserRepository } from "../../domain/repositories/user.repository";
import { User } from "../../domain/entities/user";
import { DrizzleBaseRepository } from "src/shared/infra/db/drizzle/drizzle-base.repository";

export class DrizzleUserRepository extends DrizzleBaseRepository implements IUserRepository {
  constructor(protected readonly drizzleClient: PostgresJsDatabase) {
    super();
  }

  async create(user: User, ctx?: any): Promise<User> {
    throw new Error("Method not implemented.");
  }

  async findByEmail(email: string, ctx?: any): Promise<User | null> {
    throw new Error("Method not implemented.");
  }
}

import { PostgresJsDatabase } from "drizzle-orm/postgres-js";
import type { IUserRepository } from "../../domain/repositories/user.repository";
import { User } from "../../domain/entities/user";
import { DrizzleBaseRepository } from "src/shared/infra/db/drizzle/drizzle-base.repository";
import { db } from "src/shared/infra/db/drizzle/config";
import { userTable } from "src/modules/database/infra/drizzle/schema";
import { eq } from "drizzle-orm";

export class DrizzleUserRepository extends DrizzleBaseRepository implements IUserRepository {
  protected readonly drizzleClient: PostgresJsDatabase = db;

  constructor() {
    super();
  }

  async create(user: User, ctx?: any): Promise<void> {
    await this.getClient(ctx).insert(userTable).values(user);
  }

  async findByEmail(email: string, ctx?: any): Promise<User | null> {
    const users = await this.getClient(ctx).select().from(userTable).where(eq(userTable.email, email));

    const user = users[0];

    return user
      ? User.restore({
          userId: user.userId,
          name: user.name || undefined,
          email: user.email,
          role: user.role,
          verified: user.verified,
        })
      : null;
  }
}

import { PostgresJsDatabase } from "drizzle-orm/postgres-js";

export abstract class DrizzleBaseRepository {
  protected abstract drizzleClient: PostgresJsDatabase;

  protected getClient(ctx?: any): PostgresJsDatabase {
    return ctx ? ctx : this.drizzleClient;
  }
}

import { PostgresJsDatabase, PostgresJsQueryResultHKT } from "drizzle-orm/postgres-js";
import { IUnitOfWork } from "src/shared/unit-of-work/unit-of-work";
import { ExtractTablesWithRelations } from "drizzle-orm";
import { PgTransaction } from "drizzle-orm/pg-core";

type Transaction = PgTransaction<
  PostgresJsQueryResultHKT,
  Record<string, never>,
  ExtractTablesWithRelations<Record<string, never>>
>;

export class DrizzleUnitOfWork implements IUnitOfWork {
  constructor(private databaseConnection: PostgresJsDatabase) {}

  async run(fn: (tx: Transaction) => Promise<void>): Promise<any> {
    return await this.databaseConnection.transaction(fn);
  }
}

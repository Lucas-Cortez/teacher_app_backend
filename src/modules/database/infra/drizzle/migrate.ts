import postgres from "postgres";
import { migrate } from "drizzle-orm/postgres-js/migrator";
import { drizzle } from "drizzle-orm/postgres-js";
import { env } from "src/shared/utils/env";

const main = async () => {
  const client = postgres(env.DATABASE_URL);

  const db = drizzle(client, { logger: true });
  await migrate(db, { migrationsFolder: "./src/modules/database/infra/drizzle/migrations" });

  await client.end();
};

main();

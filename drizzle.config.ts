import "dotenv/config";
import { env } from "./src/shared/utils/env";

import type { Config } from "drizzle-kit";

export default {
  schema: "./drizzle/schema.ts",
  out: "./drizzle/migrations",
  driver: "pg",
  dbCredentials: { connectionString: env.DATABASE_URL },
} satisfies Config;

import { z } from "zod";
import "dotenv/config";

export enum Stage {
  DEVELOPMENT = "development",
  PRODUCTION = "production",
}

const envSchema = z.object({
  NODE_ENV: z.nativeEnum(Stage).default(Stage.DEVELOPMENT),
  PORT: z.coerce.number().default(3000),
  JWT_SECRET: z.string(),
  MAIL_FROM: z.string(),
  DATABASE_URL: z.string(),
});

export const env = envSchema.parse(process.env);

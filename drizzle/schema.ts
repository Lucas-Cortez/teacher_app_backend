import { boolean, date, pgTable, uuid, varchar } from "drizzle-orm/pg-core";
import { UserRole } from "./../src/modules/user/domain/enum/user-role";

export const userTable = pgTable("user", {
  userId: uuid("user_id").primaryKey(),
  email: varchar("email").notNull().unique(),
  name: varchar("name"),
  role: varchar("role", { enum: ["student", "teacher"] })
    .$type<UserRole>()
    .notNull(),
  verified: boolean("verified").notNull().default(false),
});

export type SelectUser = typeof userTable.$inferSelect;
export type InsertUser = typeof userTable.$inferInsert;

export const tokenCodeTable = pgTable("token_code", {
  tokenCodeId: uuid("token_code_id").primaryKey(),
  token: varchar("token").notNull().unique(),
  expiredAt: date("expired_at").notNull(),
  userId: uuid("user_id")
    .notNull()
    .unique()
    .references(() => userTable.userId),
});

export type SelectTokenCode = typeof tokenCodeTable.$inferSelect;
export type InsertTokenCode = typeof tokenCodeTable.$inferInsert;

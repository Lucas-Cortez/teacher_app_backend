import { boolean, date, pgTable, text, uuid, varchar, time, smallint } from "drizzle-orm/pg-core";
import { Duration } from "src/modules/class/domain/enums/duration";
import { UserRole } from "src/modules/user/domain/enum/user-role";

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

// =========================================================================================

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

// =========================================================================================

export const teacherTable = pgTable("teacher", {
  teacherId: uuid("teacher_id").primaryKey(),
  userId: uuid("user_id")
    .notNull()
    .unique()
    .references(() => userTable.userId),
});

export type SelectTeacher = typeof teacherTable.$inferSelect;
export type InsertTeacher = typeof teacherTable.$inferInsert;

// =========================================================================================

export const studentTable = pgTable("student", {
  studentId: uuid("student_id").primaryKey(),
  userId: uuid("user_id")
    .notNull()
    .unique()
    .references(() => userTable.userId),
});

export type SelectStudent = typeof studentTable.$inferSelect;
export type InsertStudent = typeof studentTable.$inferInsert;

// =========================================================================================

export const teacherStudentTable = pgTable("teacher_student", {
  teacherStudentId: uuid("teacher_student_id").primaryKey(),
  teacherId: uuid("teacher_id").references(() => teacherTable.teacherId),
  studentId: uuid("student_id").references(() => studentTable.studentId),
  active: boolean("active").notNull().default(true),
});

export type SelectTeacherStudent = typeof teacherStudentTable.$inferSelect;
export type InsertTeacherStudent = typeof teacherStudentTable.$inferInsert;

// =========================================================================================

export const classTable = pgTable("class", {
  classId: uuid("class_id").primaryKey(),
  teacherStudentId: uuid("teacher_student_id").references(() => teacherStudentTable.teacherStudentId),
  content: text("content"),
  startAt: date("start_at").notNull(),
  duration: smallint("duration").notNull(),
});

export type SelectClass = typeof classTable.$inferSelect;
export type InsertClass = typeof classTable.$inferInsert;

// =========================================================================================

export const scheduleTable = pgTable("schedule", {
  scheduleId: uuid("schedule_id").primaryKey(),
  teacherStudentId: uuid("teacher_student_id").references(() => teacherStudentTable.teacherStudentId),
  frequency: varchar("frequency").notNull(),
  hour: time("hour").notNull(),
  weekday: varchar("weekday").notNull(),
  duration: smallint("duration").$type<Duration>().notNull(),
});

export type SelectSchedule = typeof scheduleTable.$inferSelect;
export type InsertSchedule = typeof scheduleTable.$inferInsert;

// =========================================================================================

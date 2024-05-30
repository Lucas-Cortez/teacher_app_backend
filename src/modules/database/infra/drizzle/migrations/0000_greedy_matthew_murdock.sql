CREATE TABLE IF NOT EXISTS "class" (
	"class_id" uuid PRIMARY KEY NOT NULL,
	"teacher_student_id" uuid,
	"content" text,
	"start_at" date NOT NULL,
	"duration" smallint NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "schedule" (
	"schedule_id" uuid PRIMARY KEY NOT NULL,
	"teacher_student_id" uuid,
	"frequency" varchar NOT NULL,
	"hour" time NOT NULL,
	"weekday" varchar NOT NULL,
	"duration" smallint NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "student" (
	"student_id" uuid PRIMARY KEY NOT NULL,
	"user_id" uuid NOT NULL,
	CONSTRAINT "student_user_id_unique" UNIQUE("user_id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "teacher_student" (
	"teacher_student_id" uuid PRIMARY KEY NOT NULL,
	"teacher_id" uuid,
	"student_id" uuid,
	"active" boolean DEFAULT true NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "teacher" (
	"teacher_id" uuid PRIMARY KEY NOT NULL,
	"user_id" uuid NOT NULL,
	CONSTRAINT "teacher_user_id_unique" UNIQUE("user_id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "token_code" (
	"token_code_id" uuid PRIMARY KEY NOT NULL,
	"token" varchar NOT NULL,
	"expired_at" date NOT NULL,
	"user_id" uuid NOT NULL,
	CONSTRAINT "token_code_token_unique" UNIQUE("token"),
	CONSTRAINT "token_code_user_id_unique" UNIQUE("user_id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "user" (
	"user_id" uuid PRIMARY KEY NOT NULL,
	"email" varchar NOT NULL,
	"name" varchar,
	"role" varchar NOT NULL,
	"verified" boolean DEFAULT false NOT NULL,
	CONSTRAINT "user_email_unique" UNIQUE("email")
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "class" ADD CONSTRAINT "class_teacher_student_id_teacher_student_teacher_student_id_fk" FOREIGN KEY ("teacher_student_id") REFERENCES "teacher_student"("teacher_student_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "schedule" ADD CONSTRAINT "schedule_teacher_student_id_teacher_student_teacher_student_id_fk" FOREIGN KEY ("teacher_student_id") REFERENCES "teacher_student"("teacher_student_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "student" ADD CONSTRAINT "student_user_id_user_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "user"("user_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "teacher_student" ADD CONSTRAINT "teacher_student_teacher_id_teacher_teacher_id_fk" FOREIGN KEY ("teacher_id") REFERENCES "teacher"("teacher_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "teacher_student" ADD CONSTRAINT "teacher_student_student_id_student_student_id_fk" FOREIGN KEY ("student_id") REFERENCES "student"("student_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "teacher" ADD CONSTRAINT "teacher_user_id_user_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "user"("user_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "token_code" ADD CONSTRAINT "token_code_user_id_user_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "user"("user_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

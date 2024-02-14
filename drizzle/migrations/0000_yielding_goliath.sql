CREATE TABLE IF NOT EXISTS "token_code" (
	"token_code_id" uuid PRIMARY KEY NOT NULL,
	"token" varchar NOT NULL,
	"expired_at" date NOT NULL,
	"user_id" uuid NOT NULL,
	CONSTRAINT "token_code_token_unique" UNIQUE("token")
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
 ALTER TABLE "token_code" ADD CONSTRAINT "token_code_user_id_user_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "user"("user_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

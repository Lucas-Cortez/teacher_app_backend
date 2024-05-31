import { validateSchema } from "src/shared/factories/validate-schema.factory";
import { z } from "zod";
import { HomeworkQueryOptionsDto } from "./homework-query-options.dto";

export namespace GetTeacherHomeworks {
  export const schema = z.object({
    teacherId: z.string(),
    query: HomeworkQueryOptionsDto.schema.optional(),
  });

  export const validate = validateSchema(schema);

  export type Type = z.infer<typeof schema>;
}

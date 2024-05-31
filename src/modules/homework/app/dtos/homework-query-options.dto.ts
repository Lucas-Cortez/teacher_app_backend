import { validateSchema } from "src/shared/factories/validate-schema.factory";
import { z } from "zod";

export namespace HomeworkQueryOptionsDto {
  export const schema = z.object({
    page: z.string().optional(),
    size: z.string().optional(),
    teacherId: z.string().optional(),
  });

  export const validate = validateSchema(schema);

  export type Type = z.infer<typeof schema>;
}

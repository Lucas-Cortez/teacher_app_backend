import { validateSchema } from "src/shared/utils/helpers/validate-schema";
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

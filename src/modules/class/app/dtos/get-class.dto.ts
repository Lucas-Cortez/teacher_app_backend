import { validateSchema } from "src/shared/factories/validate-schema.factory";
import { z } from "zod";

export namespace GetClassDto {
  export const schema = z.object({
    teacherId: z.string(),
    studentId: z.string(),
  });

  export const validate = validateSchema(schema);

  export type Type = z.infer<typeof schema>;
}

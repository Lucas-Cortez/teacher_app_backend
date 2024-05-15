import { validateSchema } from "src/shared/utils/helpers/validate-schema";
import { z } from "zod";

export namespace GetClassDto {
  export const schema = z.object({
    teacherId: z.string(),
    studentId: z.string(),
  });

  export const validate = validateSchema(schema);

  export type Type = z.infer<typeof schema>;
}

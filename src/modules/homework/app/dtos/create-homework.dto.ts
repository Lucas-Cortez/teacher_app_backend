import { validateSchema } from "src/shared/factories/validate-schema.factory";
import { z } from "zod";

export namespace CreateHomeworkDto {
  export const schema = z.object({
    teacherId: z.string(),
  });

  export const validate = validateSchema(schema);

  export type Type = z.infer<typeof schema>;
}

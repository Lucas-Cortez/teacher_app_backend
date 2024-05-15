import { validateSchema } from "src/shared/utils/helpers/validate-schema";
import { z } from "zod";

export namespace CreateHomeworkDto {
  export const schema = z.object({
    teacherId: z.string(),
  });

  export const validate = validateSchema(schema);

  export type Type = z.infer<typeof schema>;
}

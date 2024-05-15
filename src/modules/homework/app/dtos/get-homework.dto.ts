import { validateSchema } from "src/shared/utils/helpers/validate-schema";
import { z } from "zod";

export namespace GetHomeworkDto {
  export const schema = z.object({
    homeworkId: z.string(),
  });

  export const validate = validateSchema(schema);

  export type Type = z.infer<typeof schema>;
}

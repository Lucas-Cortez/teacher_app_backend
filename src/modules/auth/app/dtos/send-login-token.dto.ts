import { validateSchema } from "src/shared/utils/helpers/validate-schema";
import { z } from "zod";

export namespace SendLoginTokenDto {
  export const schema = z.object({
    email: z.string().email(),
  });

  export const validate = validateSchema(schema);

  export type Type = z.infer<typeof schema>;
}

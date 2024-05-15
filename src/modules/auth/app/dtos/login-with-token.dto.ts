import { validateSchema } from "src/shared/utils/helpers/validate-schema";
import { z } from "zod";

export namespace LoginWithTokenDto {
  export const schema = z.object({
    email: z.string().email(),
    token: z.string(),
  });

  export const validate = validateSchema(schema);

  export type Type = z.infer<typeof schema>;
}

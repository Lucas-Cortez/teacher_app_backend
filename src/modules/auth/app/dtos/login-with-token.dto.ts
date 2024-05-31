import { z } from "zod";
import zodToJsonSchema from "zod-to-json-schema";
import { validateSchemaFactory } from "src/shared/factories/validate-schema.factory";

export namespace LoginWithTokenDto {
  export const schema = z.object({
    email: z.string().email(),
    token: z.string(),
  });

  export const validate = validateSchemaFactory(schema);

  export type Type = z.infer<typeof schema>;

  export const json = zodToJsonSchema(LoginWithTokenDto.schema, "schema").definitions?.schema;
}

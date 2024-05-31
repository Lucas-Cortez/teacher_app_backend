import { z } from "zod";
import zodToJsonSchema from "zod-to-json-schema";
import { validateSchemaFactory } from "src/shared/factories/validate-schema.factory";

export namespace SendLoginTokenDto {
  export const schema = z.object({
    email: z.string().email(),
  });

  export const validate = validateSchemaFactory(schema);

  export const json = zodToJsonSchema(SendLoginTokenDto.schema, "schema").definitions?.schema;

  export type Type = z.infer<typeof schema>;
}

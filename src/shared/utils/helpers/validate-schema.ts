import { ZodSchema, z } from "zod";

export function validateSchema<Z extends ZodSchema>(schema: Z) {
  return (data: any) => {
    const result = schema.safeParse(data);

    if (!result.success) throw new Error(result.error.message);

    return result.data as z.infer<Z>;
  };
}

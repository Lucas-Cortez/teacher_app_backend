import { validateSchema } from "src/shared/factories/validate-schema.factory";
import { z } from "zod";
import { Duration } from "../../domain/enums/duration";

export namespace CreateClassDto {
  export const schema = z.object({
    teacherId: z.string(),
    studentId: z.string(),
    content: z.string().optional(),
    startAt: z.coerce.date(),
    duration: z.nativeEnum(Duration).pipe(z.string()),
  });

  export const validate = validateSchema(schema);

  export type Type = z.infer<typeof schema>;
}

import { ZodError, ZodSchema } from 'zod';

export namespace ZodService {
  export function checkSchema(
    schemaName: string,
    schema: ZodSchema,
    data: unknown,
  ) {
    try {
      schema.parse(data);
      console.log(`Zod validation success ${schemaName}`);
    } catch (error) {
      if (error instanceof ZodError) {
        console.error(`Zod validation error ${schemaName}`, error);
      }
    }
  }
}

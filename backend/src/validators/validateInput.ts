import { z } from "zod";

export const validateInput = <T>(
    schema: z.ZodSchema<T>,
    data: any
): { valid: boolean; errors: string[]; value: T | null } => {
    try {
        const validatedData = schema.parse(data);
        return { valid: true, errors: [], value: validatedData };
    } catch (error) {
        if (error instanceof z.ZodError) {
            return {
                valid: false,
                errors: error.issues.map(
                    (err) => `${err.path.join(".")}: ${err.message}`
                ),
                value: null,
            };
        } else {
            return {
                valid: false,
                errors: ["An unexpected error occurred during validation."],
                value: null,
            };
        }
    }
};

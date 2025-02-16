import { createEnv } from "@t3-oss/env-nextjs";
import { config } from "dotenv";
import { expand } from "dotenv-expand";
import { z } from "zod";

expand(config());

export const env = createEnv({
  server: {
    NODE_ENV: z.enum(["development", "production"]),
    NEXTAUTH_URL: z.string().url(),
    NEXTAUTH_SECRET: z.string(),
    GOOGLE_CLIENT_ID: z.string(),
    GOOGLE_CLIENT_SECRET: z.string(),
    DB_HOST: z.string(),
    DB_USER: z.string(),
    DB_PASSWORD: z.string(),
    DB_NAME: z.string(),
    DB_PORT: z.coerce.number(),
    DATABASE_URL: z.string().url(),
    DB_MIGRATING: z
      .string()
      .optional()
      .refine((s) => s === "true" || s === "false", {
        message: "DB_MIGRATING must be 'true' or 'false'",
      })
      .transform((s) => s === "true"), // Transform to boolean only if provided
  },
  onValidationError: (error: unknown) => {
    console.log(typeof error);
    if (error instanceof z.ZodError) {
      console.error("❌ Invalid environment variables:", error.flatten().fieldErrors);
    } else {
      console.error("❌ Unknown validation error:", error);
    }
    process.exit(1);
  },
  emptyStringAsUndefined: true,
  // eslint-disable-next-line n/no-process-env
  experimental__runtimeEnv: process.env,
});

import { z } from "zod";

const envSchema = z.object({
  // App
  NODE_ENV: z
    .enum(["development", "production", "test"])
    .default("development"),
  PORT: z
    .string()
    .transform((v) => parseInt(v, 10))
    .default("3000"),

  // Monitoring
  LOG_LEVEL: z.enum(["debug", "info", "warn", "error"]).default("info"),
});

const _env = envSchema.safeParse(process.env);

if (!_env.success) {
  console.error("Invalid environment variables:", _env.error.format());
  process.exit(1);
}

export const config = {
  app: {
    env: _env.data.NODE_ENV,
    port: _env.data.PORT,
    frontendUrl: _env.data.FRONTEND_URL,
    adminUrl: _env.data.ADMIN_URL,
    isDevelopment: _env.data.NODE_ENV === "development",
    isTest: _env.data.NODE_ENV === "test",
  },
} as const;

export type Config = typeof config;

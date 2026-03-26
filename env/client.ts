// https://env.t3.gg/docs/nextjs#create-your-schema
import { createEnv } from '@t3-oss/env-nextjs';
import { z } from 'zod';

const shouldSkipEnvValidation = process.env.SKIP_ENV_VALIDATION === '1' || process.env.VERCEL === '1';

export const clientEnv = createEnv({
  client: {
    NEXT_PUBLIC_GOOGLE_MAPS_API_KEY: z.string().min(1),
    NEXT_PUBLIC_BUILD_SERVER_URL: z.string().url().optional(),
    NEXT_PUBLIC_BUILD_SERVER_SECRET: z.string().optional(),
  },
  runtimeEnv: {
    NEXT_PUBLIC_GOOGLE_MAPS_API_KEY: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
    NEXT_PUBLIC_BUILD_SERVER_URL: process.env.NEXT_PUBLIC_BUILD_SERVER_URL,
    NEXT_PUBLIC_BUILD_SERVER_SECRET: process.env.NEXT_PUBLIC_BUILD_SERVER_SECRET,
  },
  emptyStringAsUndefined: true,
  skipValidation: shouldSkipEnvValidation,
});

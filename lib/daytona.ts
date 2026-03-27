import { Daytona } from '@daytonaio/sdk';
import { serverEnv } from '@/env/server';

const shouldSkipEnvValidation = process.env.SKIP_ENV_VALIDATION === '1' || process.env.VERCEL === '1';

export function getDaytonaClient() {
  const jwtToken = process.env.DAYTONA_JWT_TOKEN;
  const organizationId = process.env.DAYTONA_ORGANIZATION_ID;
  const apiKey = serverEnv.DAYTONA_API_KEY || process.env.DAYTONA_API_KEY;

  if (jwtToken) {
    if (!organizationId) {
      if (shouldSkipEnvValidation) {
        return null;
      }

      throw new Error('DAYTONA_ORGANIZATION_ID is required when DAYTONA_JWT_TOKEN is set');
    }

    return new Daytona({
      jwtToken,
      organizationId,
      target: 'us',
    });
  }

  if (apiKey) {
    return new Daytona({
      apiKey,
      target: 'us',
    });
  }

  return null;
}

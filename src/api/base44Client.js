import { createClient } from '@base44/sdk';
import { appParams } from '@/lib/app-params';

const { appId, functionsVersion, appBaseUrl } = appParams;

// Public app — no auth token, no auto-auth calls
export const base44 = createClient({
  appId,
  token: null,
  functionsVersion,
  serverUrl: '',
  requiresAuth: false,
  appBaseUrl
});

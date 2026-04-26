import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.lovable.2892c224808b4b24930ff1dcf14e93a0',
  appName: 'popstation-zen-lounge',
  webDir: 'dist',
  server: {
    url: 'https://2892c224-808b-4b24-930f-f1dcf14e93a0.lovableproject.com?forceHideBadge=true',
    cleartext: true,
  },
  android: {
    allowMixedContent: true,
  },
};

export default config;

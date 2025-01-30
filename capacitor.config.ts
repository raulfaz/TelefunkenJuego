import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.telefunken.app',
  appName: 'telefunken-points-registry',
  webDir: 'dist/telefunken-points-registry/browser',
  server: {
    url: 'http://192.168.0.103:4200',
    cleartext: true
  }
};

export default config;

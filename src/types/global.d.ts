// filepath: src/types/global.d.ts
declare global {
  namespace NodeJS {
    interface ProcessEnv {
      PORT?: string;
      MONGODB_URI: string;
      JWT_SECRET: string;
      NODE_ENV: 'development' | 'production';
    }
  }
}

export {};
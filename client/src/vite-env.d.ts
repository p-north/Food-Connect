/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_SENDGRID_KEY: string;
    readonly VITE_JWT_SECRET: string;
    readonly VITE_API_URL: string;
  }
  
  interface ImportMeta {
    readonly env: ImportMetaEnv;
  }
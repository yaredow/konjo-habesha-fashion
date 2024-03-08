declare global {
  namespace NodeJS {
    interface ProcessEnv {
      [key: string]: string | undefined;
      MONGO_DATABASE: string;
      MONGO_PASSWORD: string;
    }
  }
}

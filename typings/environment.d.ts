namespace NodeJS {
  interface ProcessEnv extends NodeJS.ProcessEnv {
    GITHUB_ID: string
    GITHUB_SECRET: string
    GITLAB_ID: string
    GITLAB_SECRET: string
    DATABASE_URL: string
    SECRET: string
    API_KEYS_JWT_SECRET_KEY: string
    UPSTASH_REST_API_DOMAIN: string
    UPSTASH_REST_API_TOKEN: string
  }
}

export const API_KEYS = 'api-keys'

export const API_KEYS_JWT_SECRET_KEY = process.env.SECRET

if (!API_KEYS_JWT_SECRET_KEY)
  throw new Error('SECRET is missing in environment variables')

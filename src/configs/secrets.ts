import { config } from "dotenv"
import { NodeEnvironment, EnvironmentType } from "./../constants"
config()

const port: number | undefined = process.env.PORT as unknown as number /** <-- Env variable in heroku */

export const NODE_ENV: string | undefined = process.env.NODE_ENV as EnvironmentType

export const PORT: number | undefined = NODE_ENV === NodeEnvironment.DEVELOPMENT
  ? process.env.DEVELOPMENT_PORT as unknown as number
  : NODE_ENV === NodeEnvironment.PRODUCTION
  ? process.env.PRODUCTION_PORT as unknown as number
  : port

export const DB_HOST: string | undefined = process.env.DB_HOST
export const DB_USER: string | undefined = process.env.DB_USER
export const DB_PASSWORD: string | undefined = process.env.DB_PASSWORD
export const DB_NAME: string | undefined = process.env.DB_NAME
export const ACCESS_TOKEN_SECRET: string | undefined = process.env.ACCESS_TOKEN_SECRET
export const REFRESH_TOKEN_SECRET: string | undefined = process.env.REFRESH_TOKEN_SECRET
export const SALTROUNDS: string | undefined = process.env.SALTROUNDS
export const MAILER_EMAIL: string | undefined = process.env.EMAIL
export const MAILER_PASSWORD: string | undefined = process.env.PASSWORD
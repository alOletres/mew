import { config } from "dotenv"
import { NodeEnvironment, EnvironmentType } from "./../constants"
config()

const port: number | undefined = process.env.PORT as unknown as number /** <-- Env variable in heroku */

const NODE_ENV: string | undefined = process.env.NODE_ENV as EnvironmentType

export const PORT: number | undefined = NODE_ENV === NodeEnvironment.DEVELOPMENT
  ? process.env.DEVELOPMENT_PORT as unknown as number
  : NODE_ENV === NodeEnvironment.PRODUCTION
  ? process.env.PRODUCTION_PORT as unknown as number
  : port
  
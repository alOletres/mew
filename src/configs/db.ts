import {createConnection, ConnectionConfig, Connection} from "promise-mysql"
import {
  DB_HOST as host, 
  DB_USER as user, 
  DB_PASSWORD as password, 
  DB_NAME as database
} from "./secrets"

const config: ConnectionConfig = {
  host,
  user,
  password,
  database
}
const db: Promise<Connection> = createConnection(config)

export default db
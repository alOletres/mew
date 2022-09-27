import {DB_TABLES} from "./../constants"

export type ESQLTables = typeof DB_TABLES.BOOKINGS
  | typeof DB_TABLES.COTTAGES
  | typeof DB_TABLES.USERS

export interface ISQL {
  tables: ESQLTables[],   /** <-- If length is more than 1, join tables */
}
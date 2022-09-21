import {DB_TABLES} from "./db_tables"
import {DB_COLUMNS} from "./db_columns"

const {
  BOOKINGS: {
    cottage,
    selected_date_from, 
    selected_date_to,
    payment_type,
    booker,
    receipt
  }
} = DB_COLUMNS

export const COMMON_QUERIES = {
  CREATE_BOOKING: `INSERT INTO ${DB_TABLES.BOOKINGS}(${cottage}, ${selected_date_from}, ${selected_date_to}, ${payment_type}, ${booker}, ${receipt}) VALUES(?, ?, ?, ?, ?, ?)`
}
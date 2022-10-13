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
  },
  USER: {
    refresh_token,
    email
  }
} = DB_COLUMNS

export const COMMON_QUERIES = {
  CREATE_BOOKING: `
    INSERT INTO ${DB_TABLES.BOOKINGS}
    (${cottage}, ${selected_date_from}, ${selected_date_to}, ${payment_type}, ${booker}, ${receipt}) 
    VALUES(?, ?, ?, ?, ?, ?)
  `,
  GET_REFRESH_TOKEN: `
    SELECT ${refresh_token} 
    from ${DB_TABLES.USERS}
    WHERE ${email}=?
  `
}
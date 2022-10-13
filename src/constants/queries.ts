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
    email,
    role,
    firstname,
    lastname,
    address,
    mobile_number,
    password
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
    WHERE ${refresh_token}=?
  `,
  CREATE_USER: `
    INSERT INTO ${DB_TABLES.USERS}
    (${role}, ${firstname}, ${lastname}, ${address}, ${mobile_number}, ${email}, ${password})
    VALUES(?, ?, ?, ?, ?, ?, ?)
  `,
  LOGIN: `
    SELECT ${password}
    from ${DB_TABLES.USERS}
    where ${email}=?
  `,
  SET_REFRESH_TOKEN: `
    UPDATE ${DB_TABLES.USERS}
    SET ${refresh_token}=?
    WHERE ${email}=?
  `
}
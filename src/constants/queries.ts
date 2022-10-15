import {DB_TABLES} from "./db_tables"
import {DB_COLUMNS} from "./db_columns"

const {
  BOOKINGS: {
    cottage, selected_date_from, selected_date_to,
    payment_type, booker, receipt
  },
  USER: {
    refresh_token, email, role,
    firstname, lastname, address,
    mobile_number, password
  },
  COTTAGE: {
    type, description, 
    price, is_available
  }
} = DB_COLUMNS

export const PRESET_QUERIES = {
  CREATE_COTTAGE: `
    INSERT INTO ${DB_TABLES.COTTAGES}
    (${type}, ${description}, ${price}, ${is_available})
    VALUES (?, ?, ?, ?)
  `,
  CREATE_BOOKING: `
    INSERT INTO ${DB_TABLES.BOOKINGS}
    (${cottage}, ${selected_date_from}, ${selected_date_to}, ${payment_type}, ${booker}, ${receipt}) 
    VALUES(?, ?, ?, ?, ?, ?)
  `,
  CREATE_USER: `
    INSERT INTO ${DB_TABLES.USERS}
    (${role}, ${firstname}, ${lastname}, ${address}, ${mobile_number}, ${email}, ${password})
    VALUES(?, ?, ?, ?, ?, ?, ?)
  `,
  GET_REFRESH_TOKEN: `
    SELECT ${refresh_token} 
    from ${DB_TABLES.USERS}
    WHERE ${refresh_token}=?
  `,
  GET_ALL_COTTAGES: `
    SELECT * FROM ${DB_TABLES.COTTAGES}
  `,
  GET_ALL_COTTAGES_BY_TYPE: `
    SELECT * FROM ${DB_TABLES.COTTAGES}
    WHERE ${type}=?
  `,
  GET_ALL_COTTAGES_BY_STATUS_AND_TYPE: `
    SELECT * FROM ${DB_TABLES.COTTAGES}
    WHERE ${is_available}=? AND ${type}=?
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
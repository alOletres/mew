import {DB_TABLES} from "./db_tables"
import {DB_COLUMNS} from "./db_columns"

const {
  BOOKINGS: {
    cottages, selected_date_from, selected_date_to,
    payment_record, booker, status: bookingStatus, id: bookingId,
    type: bookingType
  },
  USER: {
    refresh_token, email, role,
    firstname, lastname, address,
    mobile_number, password,
    id: userId
  },
  COTTAGE: {
    type, description, 
    price, is_available, images,
    cottage_number, capacity
  },
  PAYMENT: {
    type: payment_type, account_name,
    account_number, reference_number,
    receipt
  }
} = DB_COLUMNS

export const PRESET_QUERIES = {
  GET_BOOKER_EMAIL: `
    SELECT a.${email} FROM 
    ${DB_TABLES.USERS} as a
    INNER JOIN
    ${DB_TABLES.BOOKINGS} as b
    WHERE 
    b.${bookingId}=?
    AND
    b.${booker}=a.${userId}
  `,
  ADD_PAYMENT: `
    INSERT INTO ${DB_TABLES.PAYMENT}
    (${payment_type}, ${account_name}, ${account_number}, ${reference_number}, ${receipt})
    VALUES (?, ?, ?, ?, ?)
  `,
  CREATE_COTTAGE: `
    INSERT INTO ${DB_TABLES.COTTAGES}
    (${type}, ${cottage_number}, ${description}, ${capacity}, ${price}, ${is_available}, ${images})
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `,
  CREATE_BOOKING: `
    INSERT INTO ${DB_TABLES.BOOKINGS}
    (${bookingType}, ${cottages}, ${selected_date_from}, ${selected_date_to}, ${payment_record}, ${booker}) 
    VALUES(?, ?, ?, ?, ?, ?)
  `,
  UPDATE_BOOKING_STATUS: `
    UPDATE ${DB_TABLES.BOOKINGS}
    SET ${bookingStatus}=?
    WHERE ${bookingId}=?
  `,
  CREATE_USER: `
    INSERT INTO ${DB_TABLES.USERS}
    (${role}, ${firstname}, ${lastname}, ${address}, ${mobile_number}, ${email}, ${password})
    VALUES(?, ?, ?, ?, ?, ?, ?)
  `,
  EDIT_USER: `
    UPDATE ${DB_TABLES.USERS}
    SET ${role}=?, ${firstname}=?, ${lastname}=?, ${address}=?, ${mobile_number}=?, ${email}=?, ${password}=?
    WHERE ${userId}=?
  `,
  LIST_USER: `
    SELECT * FROM ${DB_TABLES.USERS}
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
    SELECT ${userId}, ${role}, ${firstname}, ${lastname}, ${mobile_number}, ${password}
    from ${DB_TABLES.USERS}
    where ${email}=?
  `,
  SET_REFRESH_TOKEN: `
    UPDATE ${DB_TABLES.USERS}
    SET ${refresh_token}=?
    WHERE ${email}=?
  `,
  UPDATE_COTTAGE: `
    UPDATE ${DB_TABLES.COTTAGES}
    SET ${type}=?, ${cottage_number}=?, ${description}=?, ${capacity}=?, ${price}=?, ${is_available}=?, ${images}=?
    WHERE ${DB_COLUMNS.COTTAGE.id}=?
  `,
  LIST_BOOKINGS: `
    SELECT * FROM ${DB_TABLES.BOOKINGS}
  `
}
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PRESET_QUERIES = void 0;
const db_tables_1 = require("./db_tables");
const db_columns_1 = require("./db_columns");
const { BOOKINGS: { cottage, selected_date_from, selected_date_to, payment_type, booker, receipt }, USER: { refresh_token, email, role, firstname, lastname, address, mobile_number, password, id: userId }, COTTAGE: { type, description, price, is_available, images, cottage_number, capacity } } = db_columns_1.DB_COLUMNS;
exports.PRESET_QUERIES = {
    CREATE_COTTAGE: `
    INSERT INTO ${db_tables_1.DB_TABLES.COTTAGES}
    (${type}, ${cottage_number}, ${description}, ${capacity}, ${price}, ${is_available}, ${images})
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `,
    CREATE_BOOKING: `
    INSERT INTO ${db_tables_1.DB_TABLES.BOOKINGS}
    (${cottage}, ${selected_date_from}, ${selected_date_to}, ${payment_type}, ${booker}, ${receipt}) 
    VALUES(?, ?, ?, ?, ?, ?)
  `,
    CREATE_USER: `
    INSERT INTO ${db_tables_1.DB_TABLES.USERS}
    (${role}, ${firstname}, ${lastname}, ${address}, ${mobile_number}, ${email}, ${password})
    VALUES(?, ?, ?, ?, ?, ?, ?)
  `,
    EDIT_USER: `
    UPDATE ${db_tables_1.DB_TABLES.USERS}
    SET ${role}=?, ${firstname}=?, ${lastname}=?, ${address}=?, ${mobile_number}=?, ${email}=?, ${password}=?
    WHERE ${userId}=?
  `,
    LIST_USER: `
    SELECT * FROM ${db_tables_1.DB_TABLES.USERS}
  `,
    GET_REFRESH_TOKEN: `
    SELECT ${refresh_token} 
    from ${db_tables_1.DB_TABLES.USERS}
    WHERE ${refresh_token}=?
  `,
    GET_ALL_COTTAGES: `
    SELECT * FROM ${db_tables_1.DB_TABLES.COTTAGES}
  `,
    GET_ALL_COTTAGES_BY_TYPE: `
    SELECT * FROM ${db_tables_1.DB_TABLES.COTTAGES}
    WHERE ${type}=?
  `,
    GET_ALL_COTTAGES_BY_STATUS_AND_TYPE: `
    SELECT * FROM ${db_tables_1.DB_TABLES.COTTAGES}
    WHERE ${is_available}=? AND ${type}=?
  `,
    LOGIN: `
    SELECT ${userId}, ${role}, ${firstname}, ${lastname}, ${mobile_number}, ${password}
    from ${db_tables_1.DB_TABLES.USERS}
    where ${email}=?
  `,
    SET_REFRESH_TOKEN: `
    UPDATE ${db_tables_1.DB_TABLES.USERS}
    SET ${refresh_token}=?
    WHERE ${email}=?
  `,
    UPDATE_COTTAGE: `
    UPDATE ${db_tables_1.DB_TABLES.COTTAGES}
    SET ${type}=?, ${cottage_number}=?, ${description}=?, ${capacity}=?, ${price}=?, ${is_available}=?, ${images}=?
    WHERE ${db_columns_1.DB_COLUMNS.COTTAGE.id}=?
  `
};

import { DB_TABLES } from "./db_tables";
import { DB_COLUMNS } from "./db_columns";

const {
	BOOKINGS: {
		cottages,
		selected_date_from,
		selected_date_to,
		payment_record,
		booker,
		status: bookingStatus,
		id: bookingId,
		type: bookingType,
		x_reason,
	},
	USER: {
		refresh_token,
		email,
		role,
		firstname,
		lastname,
		address,
		mobile_number,
		password,
		id: userId,
	},
	COTTAGE: {
		type,
		description,
		price,
		is_available,
		images,
		cottage_number,
		capacity,
	},
	PAYMENT: {
		type: payment_type,
		account_name,
		account_number,
		reference_number,
		receipt,
		amount,
	},
} = DB_COLUMNS;

export const PRESET_QUERIES = {
	LIST_PAYMENTS: `
    SELECT * FROM ${DB_TABLES.PAYMENT}
  `,
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
    (${payment_type}, ${account_name}, ${account_number}, ${reference_number}, ${receipt}, ${amount})
    VALUES (?, ?, ?, ?, ?, ?)
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
    SET ${bookingStatus}=?, ${x_reason}=?
    WHERE ${bookingId}=?
  `,
	CREATE_USER: `
    INSERT INTO ${DB_TABLES.USERS}
    (${role}, ${firstname}, ${lastname}, ${address}, ${mobile_number}, ${email}, ${password})
    VALUES(?, ?, ?, ?, ?, ?, ?)
  `,
	EDIT_USER: `
    UPDATE ${DB_TABLES.USERS}
    SET 
    ${role}=?, ${firstname}=?, ${lastname}=?, ${address}=?, 
    ${mobile_number}=?, ${email}=?
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
  `,

	LIST_REPORTS: `
    SELECT 
    a.id,
    a.type,
    a.cottages,
    a.selected_date_from,
    a.selected_date_to,
    a.payment_record,
    a.booker,
    a.status,
    a.x_reason,
    b.role,
    b.firstname,
    b.lastname,
    b.address,
    b.mobile_number,
    b.email,
    a.createdAt,
    c.account_name,
    c.account_number,
    c.reference_number,
    c.receipt,
    c.amount

    FROM ${DB_TABLES.BOOKINGS} as a 
    INNER JOIN ${DB_TABLES.USERS} as b 
    ON a.booker=b.id
    INNER JOIN ${DB_TABLES.PAYMENT} as c 
    ON a.payment_record=c.id 
  `,

	UPDATE_USER_PASSWORD: `
    UPDATE ${DB_TABLES.USERS} 
    SET ${password}=? WHERE id=?
  `,

	GET_USER_BY_ID: `
    SELECT * FROM ${DB_TABLES.USERS} WHERE id=?
  `,

	CHECK_BOOK_DATE: `SELECT * FROM ${DB_TABLES.BOOKINGS} WHERE selected_date_from=? OR selected_date_to=?`,
};

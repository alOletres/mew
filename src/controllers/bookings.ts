import { Request, Response } from "express";
import { Connection } from "promise-mysql";
import {
	ErrorException,
	catchError,
	checkType,
	hashPassword,
	sendMail,
	readFile,
	emailBody,
} from "./../utils";
import {
	IBooking,
	IQueryOk,
	IUser,
	IDatesBooked,
	EBookingStatuses,
	EBookingPaymentType,
} from "./../types";
import { BOOKING_QUERIES, USER_QUERIES } from "./../services";
import { EHttpStatusCode } from "./../constants";
import { isError } from "../utils/errors";
import { SendMailOptions } from "nodemailer";
import { MAILER_EMAIL } from "../configs/secrets";

export const BookingsController = {
	BOOK: async (req: Request, res: Response) => {
		const connection: Connection = req._config_.connection as Connection;

		try {
			connection.beginTransaction();
			const details: IBooking = req.body;

			if (!details.type)
				throw new ErrorException(
					"Booking type should either be `walkin` or `online`."
				);

			const uploadedReceipt: any[] = req.files as unknown as any[];
			const attachment: string[] =
				uploadedReceipt && uploadedReceipt.length
					? uploadedReceipt.map((file: any) => file.path)
					: [];

			details["receiptAttachment"] = attachment;

			let paymentId: number | null = null;

			/**
			 *
			 * Add a payment if `payment` property is defined
			 * from the payload
			 */
			if (details.payment && details.type === '"online"') {
				const paymentPayload =
					typeof details.payment === "string"
						? {
								type: JSON.parse(details.payment).payment_type,
								account_name: JSON.parse(details.payment).accountName,
								account_number: JSON.parse(details.payment).accountNumber,
								reference_number: JSON.parse(details.payment).reference,
								amount: JSON.parse(details.payment).amount,
						  }
						: {
								type: details.payment.payment_type,
								account_name: details.payment.accountName,
								account_number: details.payment.accountNumber,
								reference_number: details.payment.reference,
								amount: details.payment.amount,
						  };

				const payment = await BOOKING_QUERIES.ADD_PAYMENT(connection, {
					...paymentPayload,
					receipt: JSON.stringify(details.receiptAttachment),
				});

				paymentId = checkType<IQueryOk>(payment, "insertId")
					? payment.insertId
					: null;
			}

			/**
			 * payment walkin
			 */

			if (details.payment && details.type === '"walkin"') {
				const paymentPayload =
					typeof details.payment === "string"
						? {
								type: JSON.parse(details.payment).payment_type,
								account_name: "",
								account_number: "",
								reference_number: "",
								amount: JSON.parse(details.payment).amount,
								receipt: "",
						  }
						: {
								type: details.payment.payment_type,
								account_name: "",
								account_number: "",
								reference_number: "",
								amount: details.payment.amount,
								receipt: "",
						  };

				const payment = await BOOKING_QUERIES.ADD_PAYMENT(connection, {
					...paymentPayload,
				});

				paymentId = checkType<IQueryOk>(payment, "insertId")
					? payment.insertId
					: null;
			}

			/**
			 *
			 * Extract dates from and to
			 */
			const dates: IDatesBooked =
				typeof details.dates === "string"
					? JSON.parse(details.dates)
					: details.dates;

			/**
			 *
			 * If `userid` property is defined, proceed directly
			 * without creating a new user
			 */

			if (details.userid && String(details.userid) !== "null") {
				const book = await BOOKING_QUERIES.CREATE_BOOKINGS(connection, {
					type: details.type,
					cottages:
						typeof details.cottages === "string"
							? details.cottages
							: JSON.stringify(details.cottages),
					dateFrom: new Date(dates.from),
					dateTo: new Date(dates.to),
					paymentId,
					user: details.userid as number,
				});

				if (checkType<IQueryOk>(book, "affectedRows")) {
					if (book.affectedRows > 0) {
						connection.commit();
						return res.status(EHttpStatusCode.OK).send({
							message: "Booking is successfully created.",
						});
					}
				}

				connection.rollback();
				throw new ErrorException(
					"Something went wrong, please try again later."
				);
			}

			/**
			 *
			 * If code executions reaches this line
			 * that means that we have to register this user first
			 */
			if (!details.user) {
				connection.rollback();
				throw new ErrorException("User details must be provided.");
			}

			const userDetails: IUser =
				typeof details.user === "string"
					? JSON.parse(details.user)
					: details.user;

			if (checkType<IUser>(userDetails, ["firstname", "lastname"])) {
				const { password } = userDetails;

				if (!password) {
					connection.rollback();
					throw new ErrorException("User must provide a password.");
				}

				const hashedPassword: string = hashPassword(password);

				const createdUser = await USER_QUERIES.CREATE_USER(connection, {
					...userDetails,
					password: hashedPassword,
				});

				if (isError(createdUser)) {
					connection.rollback();
					throw new ErrorException(
						createdUser.message ?? "Something went wrong with create user"
					);
				}

				const userid = checkType<IQueryOk>(createdUser, [
					"insertId",
					"affectedRows",
				])
					? createdUser.insertId
					: undefined;

				if (!userid) {
					connection.rollback();
					throw new ErrorException(
						"Something went wrong, please try again later."
					);
				}

				const book = await BOOKING_QUERIES.CREATE_BOOKINGS(connection, {
					type: details.type,
					cottages:
						typeof details.cottages === "string"
							? details.cottages
							: JSON.stringify(details.cottages),
					dateFrom: new Date(dates.from),
					dateTo: new Date(dates.to),
					paymentId,
					user: userid,
				});

				const html = emailBody(
					details.type === '"walkin"' ? "approved" : "pending"
				);

				if (userDetails.email)
					sendMail({
						from: MAILER_EMAIL,
						to: userDetails.email,
						subject: "RVS Resort Notification",
						html,
					} as SendMailOptions);

				if (checkType<IQueryOk>(book, "affectedRows")) {
					if (book.affectedRows > 0) {
						connection.commit();
						return res.status(EHttpStatusCode.OK).send({
							message: "Booking is successfully created",
						});
					}
				}
			}

			connection.rollback();
			res.status(EHttpStatusCode.INTERNAL_SERVER_ERROR).send({
				message: "Something went wrong, please try again later.",
			});
		} catch (err: unknown) {
			connection.rollback();
			const error: ErrorException = err as ErrorException;

			catchError(error, res);
		}
	},
	UPDATE_BOOKING_STATUS: async (req: Request, res: Response) => {
		const connection: Connection = req._config_.connection as Connection;

		try {
			const bookingId: number = req.params?.id as unknown as number;

			const { status, reason }: { status: EBookingStatuses; reason?: string } =
				req.body;

			if (!bookingId)
				throw new ErrorException(
					"Booking id must be supplied from the URL params."
				);

			if (
				!["pending", "approved", "rejected", "voided", "cancelled"].includes(
					status.toLowerCase()
				)
			)
				throw new ErrorException(
					"Status value should either be PENDING, APPROVED, REJECTED or VOIDED."
				);

			console.log("====================================");
			console.log("reason", reason);
			console.log("====================================");
			const [updateStatus, [{ email }]] = await Promise.all([
				BOOKING_QUERIES.UPDATE_BOOKING(connection, {
					id: bookingId,
					x_reason: reason,
					status,
				}),
				BOOKING_QUERIES.GET_BOOKER_EMAIL(connection, bookingId) as unknown as [
					{ email: string }
				],
			]);

			const html = emailBody(status);

			if (email)
				sendMail({
					from: MAILER_EMAIL,
					to: email,
					subject: "RVS Resort Notification",
					html,
				} as SendMailOptions);

			if (checkType<IQueryOk>(updateStatus, "affectedRows"))
				return res.status(EHttpStatusCode.OK).send({
					message: "Booking status is successfully updated.",
				});

			throw new ErrorException("Something went wrong, please try again later.");
		} catch (err) {
			const error: ErrorException = err as ErrorException;

			connection.rollback();
			catchError(error, res);
		}
	},
	BOOKING_LIST: async (req: Request, res: Response) => {
		const connection: Connection = req._config_.connection as Connection;

		try {
			const list: any[] = (await BOOKING_QUERIES.LIST_BOOKINGS(
				connection
			)) as any[];

			if (!list) throw new ErrorException("failed to fetch");

			const data =
				list && list.length
					? await Promise.all(
							list.map(async (value) => {
								if (value.receipt && typeof value.receipt !== "undefined") {
									const parse = JSON.parse(value.receipt);

									const actualImage: Buffer = await readFile(parse[0]);

									const image = Buffer.from(actualImage).toString("base64");
									value.receipt = image;
								}

								return value;
							})
					  )
					: [];

			res.status(EHttpStatusCode.OK).send({
				message: "Data is fetched successfully.",
				data,
			});
		} catch (err) {
			const error: ErrorException = err as ErrorException;
			connection.rollback();
			catchError(error, res);
		}
	},
	PAYMENTS_LIST: async (req: Request, res: Response) => {
		const connection: Connection = req._config_.connection as Connection;

		interface IDBPayment {
			id: number;
			type: EBookingPaymentType;
			account_name: string;
			account_number: string;
			reference_number: string;
			receipt: string | string[];
		}

		try {
			const list: IDBPayment[] = (await BOOKING_QUERIES.LIST_PAYMENTS(
				connection
			)) as unknown as IDBPayment[];

			const listWithImages = await Promise.all(
				list.map(async (item: IDBPayment) => {
					if (item.receipt) {
						const images: string[] = (await Promise.all(
							JSON.parse(item.receipt as string).map(
								async (receipt: string) => {
									const actualImage: Buffer = await readFile(receipt);

									return Buffer.from(actualImage).toString("base64");
								}
							)
						)) as unknown as string[];

						item.receipt = images;
					}

					return item;
				})
			);

			res.status(EHttpStatusCode.OK).send({
				message: "Payment list is successfully fetched.",
				data: listWithImages,
			});
		} catch (err) {
			const error: ErrorException = err as ErrorException;

			connection.rollback();
			catchError(error, res);
		}
	},

	LIST_REPORTS: async (req: Request, res: Response) => {
		const connection: Connection = req._config_.connection as Connection;

		try {
			connection.beginTransaction();
			const list = await BOOKING_QUERIES.LIST_REPORTS(connection);
			connection.commit();

			res.status(EHttpStatusCode.OK).send({
				message: "Report is succesfully fetched.",
				data: list,
			});
		} catch (err) {
			const error: ErrorException = err as ErrorException;
			connection.rollback();
			catchError(error, res);
		}
	},
};

import { Request, Response } from "express";
import {
	ErrorException,
	catchError,
	comparePassword,
	hashPassword,
	isError,
	sendMail,
} from "./../utils";
import { IUser, TUserRole } from "./../types";
import { USER_QUERIES } from "./../services";
import { Connection } from "promise-mysql";
import { EHttpStatusCode } from "./../constants";
import { SendMailOptions } from "nodemailer";
import { MAILER_EMAIL } from "../configs/secrets";

const checkRole = (role: TUserRole[]): role is TUserRole[] => {
	return (
		!role.includes("admin") ||
		!role.includes("customer") ||
		!role.includes("manager") ||
		!role.includes("booking-agent")
	);
};

export const UserController = {
	CREATE_USER: async (req: Request, res: Response) => {
		try {
			const connection: Connection = req._config_.connection as Connection;

			const {
				roles,
				firstname,
				lastname,
				address,
				mobile_number,
				email,
				password,
			}: IUser = req.body;

			const transformedRoles: TUserRole[] = JSON.parse(roles).map(
				(item: TUserRole): TUserRole => item.toLocaleLowerCase() as TUserRole
			);

			/** Check role */
			if (!transformedRoles.length)
				throw new ErrorException("User role should not be null.");
			if (!checkRole(transformedRoles))
				throw new ErrorException(
					"Roles should only include the following values: admin, customer or staff."
				);

			/** Step 1: hash user's password */
			const hashedPassword: string = hashPassword(password);

			/** Step 2: save data to database */
			const createUserResponse = await USER_QUERIES.CREATE_USER(connection, {
				roles,
				firstname,
				lastname,
				address,
				mobile_number,
				email,
				password: hashedPassword,
			});

			if (isError(createUserResponse))
				throw new ErrorException(
					createUserResponse.message ??
						"Something went wrong, please check your data."
				);

			res.status(EHttpStatusCode.OK).send({
				message: "User is successfully created!",
			});
		} catch (err) {
			const error: ErrorException = err as ErrorException;

			catchError(error, res);
		}
	},
	EDIT_USER: async (req: Request, res: Response) => {
		try {
			const connection: Connection = req._config_.connection as Connection;
			const id: number | undefined = req.params?.id as unknown as number;

			if (!id)
				throw new ErrorException("User ID is missing from request params.");

			const {
				roles,
				firstname,
				lastname,
				address,
				mobile_number,
				email,
			}: // password
			IUser = req.body;

			const transformedRoles: TUserRole[] = JSON.parse(roles).map(
				(item: TUserRole): TUserRole => item.toLocaleLowerCase() as TUserRole
			);

			/** Check role */
			if (!transformedRoles.length)
				throw new ErrorException("User role should not be null.");
			if (!checkRole(transformedRoles))
				throw new ErrorException(
					"Roles should only include the following values: admin, customer or staff."
				);

			/** Step 1: hash user's password */
			// const hashedPassword: string = hashPassword(password)

			/** Step 2: save data to database */
			const editUserResponse = await USER_QUERIES.EDIT_USER(connection, {
				roles,
				firstname,
				lastname,
				address,
				id,
				mobile_number,
				email,
				// password: hashedPassword
			} as IUser);

			if (isError(editUserResponse))
				throw new ErrorException(
					editUserResponse.message ??
						"Something went wrong, please check your data."
				);

			res.status(EHttpStatusCode.OK).send({
				message: "User is successfully updated!",
			});
		} catch (err) {
			const error: ErrorException = err as ErrorException;

			catchError(error, res);
		}
	},
	LIST_USER: async (req: Request, res: Response) => {
		try {
			const connection: Connection = req._config_.connection as Connection;

			const list = await USER_QUERIES.LIST_USER(connection);

			res.status(EHttpStatusCode.OK).send({
				message: "Data is fetched succesfully!",
				data: list,
			});
		} catch (err) {
			const error: ErrorException = err as ErrorException;

			catchError(error, res);
		}
	},

	UPDATE_USER_PASSWORD: async (req: Request, res: Response) => {
		try {
			const {
				current_password,
				new_password,
			}: { id: number; current_password: string; new_password: string } =
				req.body;

			const connection: Connection = req._config_.connection as Connection;

			if (!current_password || !new_password)
				throw new ErrorException("Something went wrong in payload");

			connection.beginTransaction();

			const id: number = req.params.id as unknown as number;

			if (!id) throw new ErrorException("'id' is missing in params");

			/**
			 * step 1 check if the current password is equal to hash password in database
			 */

			const user_list = await USER_QUERIES.GET_USER_BY_ID(connection, { id });

			if (isError(user_list)) {
				connection.rollback();
				throw new ErrorException(
					user_list.message ?? "Something went wrong in fetching user by id"
				);
			}

			const isEqual_password = comparePassword(
				current_password,
				user_list[0].password
			);

			if (!isEqual_password)
				throw new ErrorException("Current password is incorrect");

			const nw_pwrd = hashPassword(new_password);

			if (!nw_pwrd) throw new ErrorException("Please provide new password");

			const user_response = await USER_QUERIES.UPDATE_USER_PASSWORD(
				connection,
				{
					id,
					password: nw_pwrd,
				} as IUser
			);

			if (isError(user_response)) {
				connection.rollback();
				throw new ErrorException(
					user_response.message ?? "Something went wrong"
				);
			}

			res.status(EHttpStatusCode.OK).send({
				message: "Password succesfully updated!",
			});
		} catch (err) {
			const error: ErrorException = err as ErrorException;
			catchError(error, res);
		}
	},

	CLIENT_EMAIL: async (req: Request, res: Response) => {
		try {
			const { from, html }: SendMailOptions = req.body;

			if (from && html)
				sendMail({
					from,
					to: MAILER_EMAIL,
					html,
				} as SendMailOptions);

			res.status(EHttpStatusCode.OK).send({
				message: "Sucessfully sent!, Thank you for contacting us!",
				status: EHttpStatusCode.OK,
				stattusText: "OK",
			});
		} catch (err) {
			const error: ErrorException = err as ErrorException;
			catchError(error, res);
		}
	},
};

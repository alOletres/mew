import {Request, Response, NextFunction} from "express"
import {EHttpStatusCode} from "./../constants"
import {decodeToken} from "./../utils"

export const authToken = (req: Request, res: Response, next: NextFunction) => {
	try {
		/**
		 * 
		 * Before anything else, check for landing headers
		 */
		const landingHeader: undefined | Boolean = req.headers && req.headers["landing"] as unknown as Boolean

		if (landingHeader && Boolean(landingHeader) == true) return next()
		
		/**
		 * 
		 * Step 1: Extract the `Authorization` header from the request's headers
		 */
		const authHeader = req.headers && req.headers["authorization"]

		/**
		 * 
		 * Step 2: Check if `Authorization` header is extracted and not empty
		 */
		if (!authHeader) return res.status(EHttpStatusCode.UNAUTHORIZED).send({
			message: "Request headers are missing."
		})

		/**
		 * 
		 * Step 3: Split the `Authorization` header into pieces
		 */
		const headerChunk: string[] = authHeader.split(" ")

		/**
		 * 
		 * Step 4: Validate the header's length, it should only be equal to 2
		 */
		if (headerChunk.length !== 2) return res.status(EHttpStatusCode.UNAUTHORIZED).send({
			message: "Invalid authorization header."
		})

		/**
		 * 
		 * Step 5: Extract the bearer and the access token value based on it's static indexes
		 */
		const bearer: string = headerChunk[0]
		const accessToken: string = headerChunk[1]

		/**
		 * 
		 * Step 6: Validate the `Bearer` value
		 */
		if (bearer.toLowerCase() !== "bearer") return res.status(EHttpStatusCode.UNAUTHORIZED).send({
			message: "Invalid token bearer."
		})

		/**
		 * 
		 * Step 7: Validate if token is missing or not
		 */
		if (!accessToken) return res.status(EHttpStatusCode.UNAUTHORIZED).send({
			message: "Token is missing from the request header."
		})

		/**
		 * 
		 * Step 8: Verify the validity of the access token
		 */
		const isTokenValid = decodeToken(accessToken, "access")

		/**
		 * 
		 * If not valid, or has expired, send a 401 response code
		 */
		if (!isTokenValid) return res.sendStatus(EHttpStatusCode.UNAUTHORIZED)

		/**
		 * 
		 * If valid, allow the request to continue
		 */
		return next()
	} catch (err) {
		return res.sendStatus(EHttpStatusCode.UNAUTHORIZED)
	}
}
import {PRESET_QUERIES} from "./../constants"
import {returnError} from "./../utils"
import {ICottage, IError, TParamFilter, IFilterBy} from "./../types"
import {Connection, Query} from "promise-mysql"

interface ICottageFilter extends IFilterBy {
	type: TParamFilter
}

export const CREATE_COTTAGE = async (
	connection: Connection,
	cottage: ICottage
): Promise<Query<any> | IError> => {
	try {
		const {
			type, description,
			price, is_available,
			images
		}: ICottage = cottage

		const response = await connection.query(PRESET_QUERIES.CREATE_COTTAGE, [type, description, price, is_available, images])

		return response
	} catch (err) {
		return returnError(connection, err)
	}
}

export const COTTAGE_LIST = async (
	connection: Connection,
	filterBy: ICottageFilter
): Promise<Query<any> | IError> => {
	try {
		const {
			type,
			status
		}: ICottageFilter = filterBy

		if (type === "all") {
			const response = await connection.query(PRESET_QUERIES.GET_ALL_COTTAGES)

			return response
		} else if (status === 'true') {
			const response = await connection.query(PRESET_QUERIES.GET_ALL_COTTAGES_BY_STATUS_AND_TYPE, [status === 'true', type])

			return response
		} else {
			const response = await connection.query(PRESET_QUERIES.GET_ALL_COTTAGES_BY_TYPE, [type])
		
			return response
		}
	} catch (err) {
		return returnError(connection, err)
	}
}

export const EDIT_COTTAGE = async (
	connection: Connection,
	cottage: ICottage
): Promise<any | IError> => {
	try {
		const {
			type, description,
			price, is_available,
			images, id
		}: ICottage = cottage

		await connection.query(PRESET_QUERIES.UPDATE_COTTAGE, [type, description, price, is_available, images, id])

		return
	} catch (err) {
		return returnError(connection, err)
	}
}
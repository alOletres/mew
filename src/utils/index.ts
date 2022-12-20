import {ErrorException, catchError, returnError, isError} from "./errors"
import {
  hashPassword, comparePassword, generateToken, 
  validateToken, decodeToken, readFile, checkType,
  sendMail
} from './methods';

export {
  ErrorException, catchError, hashPassword, 
  comparePassword, generateToken, validateToken,
  decodeToken, isError, returnError, readFile,
  checkType, sendMail
}
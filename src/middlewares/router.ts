import { Express } from "express";
import {Bookings, Auth, User, Cottage} from "./../models"
import {authToken} from "./authenticate_token"

export const router = (app: Express) => {
  app.use("/authenticate", Auth)
  app.use("/user", authToken, User)
  app.use("/cottage", authToken, Cottage)
  app.use("/book", authToken, Bookings)
}
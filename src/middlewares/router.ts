import { Express } from "express";
import {Bookings, Auth, User} from "./../models"

export const router = (app: Express) => {
  app.use("/book", Bookings)
  app.use("/authenticate", Auth)
  app.use("/user", User)
}
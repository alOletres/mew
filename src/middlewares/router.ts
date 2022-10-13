import { Express } from "express";
import {Bookings, Auth} from "./../models"

export const router = (app: Express) => {
  app.use("/book", Bookings)
  app.use("/authenticate", Auth)
}
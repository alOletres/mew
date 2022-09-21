import { Express } from "express";
import {Bookings} from "./../models"

export const router = (app: Express) => {
  app.use("/book", Bookings)
}
import { createTransport, Transporter } from "nodemailer"
import { MAILER_EMAIL, MAILER_PASSWORD } from "./secrets"

export const transporter: Transporter = createTransport({
  service: "gmail",
  auth: {
    user: MAILER_EMAIL,
    pass: MAILER_PASSWORD
  }
})
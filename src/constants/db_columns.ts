const timestampColumns = {
  createdAt: "createdAt",
  updatedAt: "updatedAt"
}

export const DB_COLUMNS = {
  BOOKINGS: {
    id: "id",
    date_booked: "date_booked",
    cottage: "cottage",
    selected_date_from: "selected_date_from",
    selected_date_to: "selected_date_to",
    payment_type: "payment_type",
    booker: "booker",
    receipt: "receipt",
    ...timestampColumns
  },
  USER: {
    id: "id",
    role: "role",
    firstname: "firstname",
    lastname: "lastname",
    address: "address",
    mobile_number: "mobile_number",
    email: "email",
    password: "password",
    refresh_token: "refresh_token",
    ...timestampColumns
  },
  COTTAGE: {
    id: "id",
    type: "type",
    cottage_number: "cottage_number",
    description: "description",
    capacity: "capacity",
    price: "price",
    is_available: "is_available",
    images: "images",
    ...timestampColumns
  }
}
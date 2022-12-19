const timestampColumns = {
  createdAt: "createdAt",
  updatedAt: "updatedAt"
}

export const DB_COLUMNS = {
  BOOKINGS: {
    id: "id",
    cottages: "cottages",
    selected_date_from: "selected_date_from",
    selected_date_to: "selected_date_to",
    payment_record: "payment_record",
    booker: "booker",
    status: "status",
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
  },
  PAYMENT: {
    id: "id",
    type: "type",
    account_name: "account_name",
    account_number: "account_number",
    reference_number: "reference_number",
    receipt: "receipt",
    ...timestampColumns
  }
}
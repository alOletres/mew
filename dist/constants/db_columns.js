"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DB_COLUMNS = void 0;
const timestampColumns = {
    createdAt: "createdAt",
    updatedAt: "updatedAt"
};
exports.DB_COLUMNS = {
    BOOKINGS: Object.assign({ id: "id", date_booked: "date_booked", cottage: "cottage", selected_date_from: "selected_date_from", selected_date_to: "selected_date_to", payment_type: "payment_type", booker: "booker", receipt: "receipt" }, timestampColumns),
    USER: Object.assign({ id: "id", role: "role", firstname: "firstname", lastname: "lastname", address: "address", mobile_number: "mobile_number", email: "email", password: "password", refresh_token: "refresh_token" }, timestampColumns),
    COTTAGE: Object.assign({ id: "id", type: "type", cottage_number: "cottage_number", description: "description", capacity: "capacity", price: "price", is_available: "is_available", images: "images" }, timestampColumns)
};

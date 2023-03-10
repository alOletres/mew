const { config } = require("dotenv");
config();
const { faker } = require("@faker-js/faker");
const axios = require("axios");
const { createConnection } = require("promise-mysql");

const dbconfig = {
	host: process.env.DB_HOST,
	user: process.env.DB_USER,
	password: process.env.DB_PASSWORD,
	database: process.env.DB_NAME,
};

const db = createConnection(dbconfig);

const data = [];
console.log("Please wait, seeding data to database...");

// Get first cottage found
const getACottage = async () => {
	try {
		const DATABASE_CONNECT = await db;
		const cottageId = await DATABASE_CONNECT.query(
			"SELECT id from m_cottages LIMIT 1"
		);

		return cottageId;
	} catch (err) {
		throw err;
	}
};

const createBookingData = async () => {
	const firstname = faker.name.firstName();
	const lastname = faker.name.lastName();
	const mobile_number = faker.phone.number();

	return {
		cottages: [(await getACottage())[0]["id"]],
		type: '"walkin"',
		user: {
			email: faker.internet.email(),
			address: faker.address.streetAddress(),
			firstname,
			lastname,
			mobile_number,
			password: faker.internet.password(),
			roles: "customer",
		},
		dates: {
			from: new Date(),
			to: new Date(),
		},
		payment: {
			accountName: `${firstname} ${lastname}`,
			accountNumber: mobile_number,
			reference: "randomseed",
			amount: faker.finance.amount(),
			payment_type: "cash",
		},
	};
};

Promise.resolve(
	Array.from({ length: 100 }).forEach(() => {
		data.push(createBookingData());
	})
).then(async () => {
	// call the service here
	await Promise.all(
		data.map(async (item) =>
			axios.post("http://localhost:3000/book", await item, {
				headers: {
					landing: true,
					"Content-type": "application/json",
				},
			})
		)
	)
		.then(() => console.log("A data is saved..."))
		.catch((err) => console.error(err));
});

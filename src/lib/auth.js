import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "better-auth/adapters/mongodb";

const client = new MongoClient(process.env.MONGO_BD_URI); // Replace with your MongoDB connection string);
const db = client.db(process.env.MONGODB_NAME); // Replace with your database name

export const auth = betterAuth({
  database: mongodbAdapter(db, {
    // Optional: if you don't provide a client, database transactions won't be enabled.
    client,
  }),
  //...other options
  emailAndPassword: {
    enabled: true,
  },
});

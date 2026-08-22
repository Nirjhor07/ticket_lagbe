import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { nextCookies } from "better-auth/next-js";
import { admin, jwt } from "better-auth/plugins";

const client = new MongoClient(process.env.MONGO_BD_URI);
const db = client.db(process.env.MONGODB_NAME || "ticket_lagbe");

export const auth = betterAuth({
  baseURL: process.env.BETTER_AUTH_URL || "http://localhost:3000",
  secret: process.env.BETTER_AUTH_SECRET,
  database: mongodbAdapter(db, {
    client,
  }),
  emailAndPassword: {
    enabled: true,
  },
  // session: {
  //   cookieCache: {
  //     enabled: false,
  //   },
  // },
  session: {
    cookieCache: {
      enabled: true,
      strategy: "jwt",
      //max age: 7 days
      maxAge: 7 * 24 * 60 * 60,
    },
  },
  user: {
    additionalFields: {
      role: {
        type: "string",
        defaultValue: "user",
      },
    },
  },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    },
  },

  plugins: [admin(), jwt(), nextCookies()],
});

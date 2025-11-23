import { betterAuth } from "better-auth";
import { db } from "./server/db";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import * as authSchema from "./server/db/schema/auth-schema"

export const auth = betterAuth({
    database: drizzleAdapter(db, {
        provider: "pg",
        schema: authSchema
    }),
});
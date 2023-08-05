import { prisma } from "@lucia-auth/adapter-prisma";
import { PrismaClient } from "@prisma/client";
import { lucia } from "lucia";

const client = new PrismaClient();

export const auth = lucia({
  env: "DEV", // "PROD" if deployed to HTTPS
  adapter: prisma(client),
});

export type Auth = typeof auth;

// import { authOptions } from "@/lib/auth";
// import { getServerSession } from "next-auth";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { z } from "zod";

export async function GET() {
  try {
    const users = await db.user.findMany();

    return new Response(JSON.stringify({ users }), {
      status: 200,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(JSON.stringify(error.issues), { status: 422 });
    }

    return new Response(null, { status: 500 });
  }
}

export async function POST() {
  const username = "username" + Math.random() * 1000;
  try {
    const user = await auth.createUser({
      key: {
        providerId: "username",
        providerUserId: username,
        password: "password" + Math.random() * 1000,
      },
      attributes: {
        username,
      }, // expects `Lucia.DatabaseUserAttributes`
    });

    // console.log({ user });

    return new Response(JSON.stringify({ user }), {
      status: 200,
    });
  } catch (e) {
    // if (e instanceof LuciaError && e.message === `DUPLICATE_KEY_ID`) {
    //   // key already exists
    // }
    // provided user attributes violates database rules (e.g. unique constraint)
    // or unexpected database errors

    return new Response(JSON.stringify({ error: e.message }), { status: 500 });
  }
}

import NextAuth from "next-auth/next";

import { NextApiRequest, NextApiResponse } from "next";
import { options } from "./options";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  return await NextAuth(req, res, options);
}

export { handler as GET, handler as POST };

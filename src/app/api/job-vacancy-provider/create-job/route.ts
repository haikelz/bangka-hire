import { NextApiRequest, NextApiResponse } from "next";

export async function POST(req: NextApiRequest, res: NextApiResponse) {
  try {
    // ambil data yang di input oleh user
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
}

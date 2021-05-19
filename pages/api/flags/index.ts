import { NextApiRequest, NextApiResponse } from "next";
import { checkAll } from "@src/flags";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const flags = await checkAll();
  res.status(200).json(flags);
};

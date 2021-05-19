import { NextApiRequest, NextApiResponse } from "next";
import { disableFlag, checkAll } from "@src/flags";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const key = req.query.key as string;
  await disableFlag(key);
  const flags = await checkAll();
  res.status(200).json(flags);
};

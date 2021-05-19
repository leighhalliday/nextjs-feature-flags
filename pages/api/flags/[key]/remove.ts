import { NextApiRequest, NextApiResponse } from "next";
import { removeFlag, checkAll } from "@src/flags";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const key = req.query.key as string;
  await removeFlag(key);
  const flags = await checkAll();
  res.status(200).json(flags);
};

import { NextApiRequest, NextApiResponse } from "next";
import { enableFlag, checkAll } from "@src/flags";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const key = req.query.key as string;
  await enableFlag(key);
  const flags = await checkAll();
  res.status(200).json(flags);
};

import type { NextApiRequest, NextApiResponse } from "next";
import { say } from "cowsay";
import dayjs from "dayjs";

type Data = {
  cowsay: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  res.status(200).json({
    cowsay: say({
      text: `${dayjs().format("HH:mm:ss")}: Moooooo`,
    }),
  });
}

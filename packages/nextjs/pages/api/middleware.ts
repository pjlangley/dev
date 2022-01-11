import nextConnect from 'next-connect'
import { NextApiRequest, NextApiResponse } from "next";

const handler = nextConnect<NextApiRequest, NextApiResponse>();

interface ExtendedRequest {
  user: undefined | string
}

handler.use<ExtendedRequest>(async (req, _, next) => {
  req.user = await new Promise((res) => {
    setTimeout(() => {
      res(Math.floor(Math.random() * 2) ? 'Bill' : undefined);
    }, 1500)
  });

  next();
});

handler.use((req: ExtendedRequest, res: NextApiResponse) => {
  if (!req.user) {
    return res.end('There is no user');
  }
  res.end(`The user is ${req.user}`);
});

export default handler;

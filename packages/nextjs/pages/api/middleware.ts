import { IncomingMessage, ServerResponse } from 'http';
import nextConnect from 'next-connect'

const handler = nextConnect();

type RequestWithUser = IncomingMessage & {
  user: undefined | string
}

handler.use(async (req: RequestWithUser, _, next) => {
  req.user = await new Promise((res) => {
    setTimeout(() => {
      return res(Math.floor(Math.random() * 2) ? 'Bill' : undefined);
    }, 1500)
  });

  next();
});

handler.use((req: RequestWithUser, res: ServerResponse) => {
  if (!req.user) {
    res.end('There is no user');
  }
  res.end(`The user is ${req.user}`);
});

export default handler;

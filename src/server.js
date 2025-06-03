import "dotenv/config";
import express from 'express';
import cors from 'cors';
import pino from 'pino-http';
import cookieParser from 'cookie-parser';

import { notFoundHandler } from "./middlewares/notFoundHandler.js";
import { errorHandler } from "./middlewares/errorHandler.js";
import contactsRouter from "./routers/contacts.js";
import authRouter from "./routers/auth.js";

export async function setupServer() {
  const PORT = 3000;
  const app = express();

  app.use(cookieParser());
  app.use(cors());

  app.use('/contacts', contactsRouter);
  app.use('/auth', authRouter);

  app.use(notFoundHandler);
  app.use(errorHandler);

  app.use(
    pino({
      transport: {
        target: 'pino-pretty',
      },
    }),
  );

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}

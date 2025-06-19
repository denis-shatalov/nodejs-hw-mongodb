import "dotenv/config";
import express from 'express';
import cors from 'cors';
import pino from 'pino-http';
import cookieParser from 'cookie-parser';
import path from 'node:path';
import * as fs from 'node:fs';

import { notFoundHandler } from "./middlewares/notFoundHandler.js";
import { errorHandler } from "./middlewares/errorHandler.js";
import contactsRouter from "./routers/contacts.js";
import authRouter from "./routers/auth.js";

import swaggerUI from "swagger-ui-express";

export async function setupServer() {
  const PORT = 3000;
  const app = express();

  const SWAGGER_DOCS = JSON.parse(
    fs.readFileSync(path.join('docs', 'swagger.json'), 'utf-8'),
  );

  app.use('/photo', express.static(path.resolve('src', 'upload', 'photo')));

  app.use(cookieParser());
  app.use(cors());

  app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(SWAGGER_DOCS));

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

import "dotenv/config";
import express from 'express';
import cors from 'cors';
import pino from 'pino-http';
import { notFoundHandler } from "./middlewares/notFoundHandler.js";
import { errorHandler } from "./middlewares/errorHandler.js";
import contactsRouter from "./routers/contacts.js";

export async function setupServer() {
    const PORT = 3000;
    const app = express();

    app.use(cors());

    app.use(contactsRouter);

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
    


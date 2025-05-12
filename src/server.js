import "dotenv/config";
import express from 'express';
import cors from 'cors';
import pino from 'pino-http';
import { getContact, getContacts } from "./controllers/contactController.js";





export async function setupServer() {
    const app = express();
    app.use(cors());

    app.get("/contacts", getContacts);

    app.get("/contacts/:contactId", getContact);

    app.use(
        pino({
          transport: {
            target: 'pino-pretty',
          },
        }),
    );
    
    app.use((req, res) => {
        res.status(404).json({ 
            message: 'Not found',
          } );
    });
     
    try {

        const PORT = 3000;


        app.listen(PORT, (error) => {
            if (error) {
                throw error;
            }
            console.log(`Server is running on port ${PORT}`);
        });
    }
    catch (error) {
        console.log(error);
    } 
    }
    


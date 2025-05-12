import { initMongoConnections } from "./db/initMongoConnection.js";
import { setupServer } from "./server.js"; 

async function startApp() {
  try {
    
    await initMongoConnections();

    setupServer();
  } catch (error) {
    console.error(error);
  }
}

startApp();

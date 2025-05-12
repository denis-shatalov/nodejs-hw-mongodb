import mongoose from "mongoose";
import { getEnvVar } from "../utils/getEnvVar.js";

export function initMongoConnections() {
  const MONGODB_USER = getEnvVar("MONGODB_USER");
  const MONGODB_PASSWORD = getEnvVar("MONGODB_PASSWORD");
  const MONGODB_URL = getEnvVar("MONGODB_URL");
  const MONGODB_DB = getEnvVar("MONGODB_DB");

  const uri = `mongodb+srv://${MONGODB_USER}:${MONGODB_PASSWORD}@${MONGODB_URL}/${MONGODB_DB}?retryWrites=true&w=majority`;

  return mongoose.connect(uri);
}

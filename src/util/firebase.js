import config from "./config";
import { initializeApp } from "firebase/app";
import { browserLocalPersistence, initializeAuth, setPersistence } from "firebase/auth";
import { getDatabase } from "firebase/database";

const app = initializeApp(config.firebase);
export const database = getDatabase(app);
export const auth = initializeAuth(app);

(async () => {
    await setPersistence(auth, browserLocalPersistence);
})();


 
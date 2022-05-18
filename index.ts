import express, { Express } from "express";
import dotenv from "dotenv";

dotenv.config();

const mountRoutes = require("./routes");
const app: Express = express();
const port = process.env.PORT;

mountRoutes(app);

app.listen(port, () => {
  console.log(`Server is running at https://localhost:${port}`);
});

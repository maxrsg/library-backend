import { Express } from "express";
const items = require("./items");

module.exports = (app: Express) => {
  app.use("/items", items);
};

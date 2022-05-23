import { Express } from "express";
const items = require("./items");
const category = require("./category");

module.exports = (app: Express) => {
  app.use("/items", items);
  app.use("/category", category);
};

import { Request, Response } from "express";
const Router = require("express-promise-router");
const db = require("../db");
const category = require("../models/category");
const bodyParser = require("body-parser");
const jsonParser = bodyParser.json();

const router = new Router();

module.exports = router;

// get all categories
router.get("/", async (req: Request, res: Response) => {
  const { rows } = await db.query('SELECT * FROM "Category"');
  res.send(rows);
});

router.get("/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  const { rows } = await db.query('SELECT * FROM "Category" WHERE "Id" = $1', [
    id,
  ]);
  res.send(rows[0]);
});

// Create a new category
router.post("/", jsonParser, async (req: Request, res: Response) => {
  return category.createCategory(res, req.body);
});

router.put("/", jsonParser, async (req: Request, res: Response) => {
  return category.editCategory(res, req.body);
});

router.delete("/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  return category.removeCategory(res, id);
});

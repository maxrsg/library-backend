import { Request, Response } from "express";
const Router = require("express-promise-router");
const db = require("../db");
const items = require("../models/items");
const bodyParser = require("body-parser");
const jsonParser = bodyParser.json();

const router = new Router();

module.exports = router;
router.get("/", async (req: Request, res: Response) => {
  const { rows } = await db.query('SELECT * FROM "LibraryItems"');
  res.send(rows);
});

router.get("/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  const { rows } = await db.query(
    'SELECT * FROM "LibraryItems" WHERE "Id" = $1',
    [id]
  );
  res.send(rows[0]);
});

router.post("/", jsonParser, async (req: Request, res: Response) => {
  return items.createItem(res, req.body);
});

router.put("/", jsonParser, async (req: Request, res: Response) => {
  return items.editItem(res, req.body);
});

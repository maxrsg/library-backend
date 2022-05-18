import { Request, Response } from "express";
const Router = require("express-promise-router");
const db = require("../db");

const router = new Router();

module.exports = router;
router.get("/", async (req: Request, res: Response) => {
  const { id } = req.params;
  const { rows } = await db.query('SELECT * FROM "LibraryItems"');
  res.send(rows[0]);
});

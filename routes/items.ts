import { Request, Response } from "express";
const Router = require("express-promise-router");
const items = require("../models/items");
const bodyParser = require("body-parser");
const jsonParser = bodyParser.json();

const router = new Router();

module.exports = router;
router.get("/", async (req: Request, res: Response) => {
  // check if items should be ordered by type
  if (req.query.orderByType) {
    return items.getAllItems(res, true);
  }
  return items.getAllItems(res);
});

router.get("/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  return items.getItemById(res, id);
});

router.post("/", jsonParser, async (req: Request, res: Response) => {
  return items.createItem(res, req.body);
});

router.put("/", jsonParser, async (req: Request, res: Response) => {
  return items.editItem(res, req.body);
});

router.delete("/:id", jsonParser, async (req: Request, res: Response) => {
  const { id } = req.params;
  return items.removeItem(res, id);
});

router.put("/borrow", jsonParser, async (req: Request, res: Response) => {
  return items.borrowItem(res, req.body);
});

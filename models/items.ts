import { Request, Response } from "express";
const db = require("../db");

interface Item {
  Id?: number;
  CategoryId: number;
  Title: string;
  Author: string;
  Pages: number;
  RunTimeMinutes: number;
  IsBorrowable: boolean;
  Borrower: string;
  BorrowDate: Date;
  Type: string;
}

const items = {
  createItem: async (res: Response, item: Item) => {
    try {
      const sql = `CALL "add_item"($1, $2, $3, $4, $5, $6, $7, $8, $9);`;
      const response = await db.query(sql, [
        item.CategoryId,
        item.Title,
        item.Author,
        item.Pages,
        item.RunTimeMinutes,
        item.IsBorrowable,
        item.Borrower,
        item.BorrowDate,
        item.Type,
      ]);
      console.log(response.rows[0]);
      return res.status(200).json({ itemId: response.rows[0] });
    } catch (error) {
      return res.status(500).json({
        error: {
          status: 500,
          path: "/items",
          title: "Database error",
          message: error,
        },
      });
    }
  },
};

module.exports = items;

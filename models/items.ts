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
    } catch (error) {
      console.log(error);
    }
    // const response = await db.query('INSERT INTO "LibraryItems"("CategoryId", "Title", "Author", "Pages", "RunTimeMinutes", "IsBorrowable", "Borrower", "BorrowDate", "Type") VALUES ()')
  },
};

module.exports = items;

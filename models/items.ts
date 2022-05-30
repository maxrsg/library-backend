import { Request, response, Response } from "express";
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

interface Borrow {
  Id: number;
  IsBorrowable: boolean;
  Borrower: string;
  BorrowDate: Date;
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
      return res.status(200).json({ itemId: response.rows[0].i_Id });
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

  editItem: async (res: Response, item: Item) => {
    try {
      const sql = `CALL "edit_item"($1, $2, $3, $4, $5, $6, $7, $8, $9, $10);`;
      const response = await db.query(sql, [
        item.Id,
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
      return res.status(200).json({ res: response.rows[0] });
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

  getItemById: async (res: Response, id: number) => {
    try {
      const sql = `SELECT * FROM view_items WHERE "Id" = $1;`;
      const response = await db.query(sql, [id]);
      return res.status(200).json({ item: response.rows[0] });
    } catch (error) {
      return res.status(500).json({
        error: {
          status: 500,
          path: "/items/:id",
          title: "Database error",
          message: error,
        },
      });
    }
  },

  getAllItems: async (res: Response, orderByType = false) => {
    try {
      let sql = 'SELECT * FROM view_items ORDER BY "view_items"."CategoryName"';
      if (orderByType) {
        sql = 'SELECT * FROM view_items ORDER BY "view_items"."Type"';
      }
      const response = await db.query(sql);
      return res.status(200).json({ items: response.rows });
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

  removeItem: async (res: Response, id: number) => {
    try {
      const sql = `CALL remove_item($1);`;
      const response = await db.query(sql, [id]);
      return res.status(200).json({ deleted: id });
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

  borrowItem: async (res: Response, borrowData: Borrow) => {
    try {
      let borrowDate: string | null;
      const sql = `CALL "borrow_item"($1, $2, $3);`;
      if (borrowData.Borrower !== null) {
        borrowDate = new Date().toISOString();
      } else {
        borrowDate = null;
      }
      const response = await db.query(sql, [
        borrowData.Id,
        borrowData.Borrower,
        borrowDate,
      ]);
      return res.status(200).json({ res: response.rows[0] });
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

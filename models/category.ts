import { Response } from "express";
const db = require("../db");

interface Category {
  id?: number;
  CategoryName: string;
}

const category = {
  createCategory: async (res: Response, category: Category) => {
    try {
      const sql = `CALL "add_category"($1);`;
      const response = await db.query(sql, [category.CategoryName]);
      return res.status(200).json({ categoryId: response.rows[0] });
    } catch (error) {
      return res.status(500).json({
        error: {
          status: 500,
          path: "/category",
          title: "Database error",
          message: error,
        },
      });
    }
  },

  removeCategory: async (res: Response, id: number) => {
    try {
      const sql = `CALL "remove_category"($1);`;
      const response = await db.query(sql, [id]);
      return res.status(200).json({ deleted: id });
    } catch (error) {
      return res.status(500).json({
        error: {
          status: 500,
          path: "/category",
          title: "Database error",
          message: error,
        },
      });
    }
  },
};

module.exports = category;

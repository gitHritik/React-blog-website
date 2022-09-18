import express from "express";
import Category from "../models/Category.js";
const router = express.Router();

router.post("/", async (req, res) => {
  const newCategory = new Category(req.body);
  console.log(req.body);
  try {
    const saveCategory = await newCategory.save();

    res.status(200).json(saveCategory);
  } catch (error) {
    res.status(500).json(error);
  }
});
router.get("/", async (req, res) => {
  try {
    const cats = await Category.find();

    res.status(200).json(cats);
  } catch (error) {
    res.status(500).json(error);
  }
});

const categoryRoutes = router;

export default categoryRoutes;

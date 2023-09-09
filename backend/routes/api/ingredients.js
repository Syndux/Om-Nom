const express = require("express");

const { requireAuth } = require("../../utils/auth");
const { Ingredient } = require("../../db/models");

const router = express.Router();

// Get details of ingredient with ingredientId
router.get("/:ingredientId", async (req, res, next) => {
  const { ingredientId } = req.params;
  const ingredient = await Ingredient.findByPk(ingredientId);

  return res.json(ingredient);
});

// Get all ingredients
router.get("/", async (req, res, next) => {
  const ingredients = await Ingredient.findAll({
    order: ["id"],
  });

  return res.json(ingredients);
});

module.exports = router;

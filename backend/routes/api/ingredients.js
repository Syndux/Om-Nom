const express = require("express");

const { requireAuth } = require("../../utils/auth");
const { Ingredient } = require("../../db/models");

const router = express.Router();

// Get all ingredients
router.get("/", async (req, res, next) => {
  const ingredients = await Ingredient.findAll({
    order: ["name"],
  });

  return res.json(ingredients);
});

module.exports = router;

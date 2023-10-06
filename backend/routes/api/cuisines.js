const express = require("express");

const { requireAuth } = require("../../utils/auth");
const {
  Food,
  Ingredient,
  FoodIngredient,
  Cuisine,
  sequelize,
} = require("../../db/models");

const router = express.Router();

// Get all cuisines
router.get("/", async (req, res, next) => {
    const cuisines = await Cuisine.findAll();

    return res.json(cuisines);
});

module.exports = router;
const express = require("express");

const { requireAuth } = require("../../utils/auth");
const { Ingredients } = require("../../db/models");

const router = express.Router();

router.get("/", async (req, res, next) => {
  const ingredients = await Ingredients.findAll({
    order: ["name"],
  });

  return res.json(ingredients);
});

module.exports = router;

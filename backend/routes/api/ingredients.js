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

// Update details of ingredient with ingredientId
router.put("/:ingredientId", requireAuth, async (req, res, next) => {
  const { ingredientId } = req.params;
  const userId = req.user.id;
  const { name, imgUrl } = req.body;

  const titleCase = (name) => {
    return name
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  const titleCasedName = titleCase(name);

  const ingredient = await Ingredient.findByPk(ingredientId);

  if (userId !== ingredientId) {
    const err = new Error("Authorization required");
    err.status = 403;
    err.message = "You are not allowed to edit this food's ingredients.";
    return next(err);
  }

  const updatedIngredient = await ingredient.update({
    name: titleCasedName,
    imgUrl,
  });

  return res.status(200).json(updatedIngredient);
})


// Get all ingredients
router.get("/", async (req, res, next) => {
  const ingredients = await Ingredient.findAll({
    order: ["id"],
  });
  
  return res.json(ingredients);
});

// Create new ingredient
router.post("/", requireAuth, async (req, res, next) => {
  const { name, imgUrl } = req.body;
  const userId = req.user.id;

  const titleCase = (name) => {
    return name
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  const titleCasedName = titleCase(name);

  const existingIngredient = await Ingredient.findOne({
    where: {
      name: titleCasedName
    }
  });

  if (existingIngredient) {
    const err = new Error("Existing ingredient");
    err.status = 403;
    err.message = "An ingredient with this name already exists!";
    return next(err);
  }

  const newIngredient = await Ingredient.create({
    name: titleCasedName,
    imgUrl,
  });

  return res.status(201).json(newIngredient);
});

module.exports = router;

const express = require("express");

const { requireAuth } = require("../../utils/auth");
const { Meal, Ingredient, MealIngredient, sequelize } = require("../../db/models");

const router = express.Router();

// Create/add ingredients for a meal with mealId
router.post("/:mealId/ingredients/:ingredientId", requireAuth, async (req, res, next) => {
  const { mealId, ingredientId } = req.params;
  const { quantity, unit } = req.body;

  const meal = await Meal.findByPk(mealId);
  const ingredient = await Ingredient.findByPk(ingredientId);

  if (!meal || !ingredient) {
    return next({
      status: 404,
      message: "Meal or ingredient could not be found",
    })
  }

  const newMealIngredient = await MealIngredient.create({
    mealId: meal.id,
    ingredientId: ingredient.id,
    quantity,
    unit
  });

  return res.status(201).json({ newMealIngredient });
});

// Update ingredient info for a meal with mealId and ingredientId
router.put("/:mealId/ingredients/:ingredientId", requireAuth, async (req, res, next) => {
  const { mealId, ingredientId } = req.params;
  const { quantity, unit } = req.body;
  
  const meal = await Meal.findByPk(mealId);
  const ingredient = await Ingredient.findByPk(ingredientId);

  if (!meal || !ingredient) {
    return next({
      status: 404,
      message: "Meal or ingredient could not be found",
    })
  }

  const mealIngredient = await MealIngredient.findOne({
    where: {
      mealId: meal.id,
      ingredientId: ingredient.id,
    },
  });

  if (!mealIngredient) {
    return next({
      status: 404,
      message: "Ingredient not found for this meal"
    })
  }

  await mealIngredient.update({
    mealId: meal.id,
    ingredientId: ingredient.id,
    quantity,
    unit
  });

  return res.status(200).json({ mealIngredient });
});

// Delete ingredient in a meal with mealId and ingredientId
router.delete("/:mealId/ingredients/:ingredientId", requireAuth, async (req, res, next) => {
  const { mealId, ingredientId } = req.params;
  const userId = req.user.id;

  const meal = await Meal.findByPk(mealId);

  if (!meal) {
    return next({
      status: 404,
      message: "Meal could not be found",
    });
  }

  const mealIngredient = await MealIngredient.findOne({
    where: {
      mealId,
      ingredientId,
    },
  });

  if (!mealIngredient) {
    return next({
      status: 404,
      message: "Ingredient could not be found.",
    });
  }

  if (userId !== meal.creatorId) {
    const err = new Error("Authorization required");
    err.status = 403;
    err.message = "You are not allowed to edit this meal's ingredients.";
    return next(err);
  }

  await mealIngredient.destroy();

  return res.json({
    status: 200,
    message: "Successfully deleted",
  });
});

// Read ingredients for a meal with mealId
router.get("/:mealId/ingredients", async (req, res, next) => {
  const { mealId } = req.params;

  const meal = await Meal.findByPk(mealId);

  if (!meal) {
    return next({
      status: 404,
      message: "Meal could not be found",
    });
  }

  const mealIngredients = await MealIngredient.findAll({
    where: { mealId },
    include: {
      model: Ingredient,
      as: "ingredient",
      attributes: ["name", "imgUrl"],
    },
    attributes: { exclude: ["mealId"] },
    raw: true,
  });

  if (!mealIngredients) {
    return next({
      status: 404,
      message: "No ingredients for this meal could be found.",
    });
  }

  return res.json({ mealIngredients });
});

// Get all meals from current user
router.get("/current", requireAuth, async (req, res, next) => {
  const meals = await Meal.findAll({
    where: { creatorId: req.user.id },
    order: [["createdAt", "DESC"]],
  });

  return res.json(meals);
});

// Get details of a meal with mealId
router.get("/:mealId", async (req, res, next) => {
  const { mealId } = req.params;
  const meal = await Meal.findByPk(mealId, {
    include: {
      model: Ingredient,
      as: "ingredients",
      through: {
        model: MealIngredient,
        attributes: ["quantity", "unit"],
      },
      attributes: {
        exclude: ["id", "createdAt", "updatedAt"],
      },
    },
    raw: true,
    attributes: {
      exclude: ["createdAt", "updatedAt"],
    },
  });

  if (!meal) {
    return next({
      status: 400,
      message: "Meal could not be found",
    });
  }

  return res.json(meal);
});

// Edit details of a meal with mealId
router.put("/:mealId", requireAuth, async (req, res, next) => {
  const { mealId } = req.params;
  const userId = req.user.id;
  const { name, imgUrl, cuisine } = req.body;

  const meal = await Meal.findByPk(mealId);

  if (!meal) {
    return next({
      status: 404,
      message: "Meal could not be found",
    });
  }

  if (userId !== meal.creatorId) {
    const err = new Error("Authorization required");
    err.status = 403;
    err.message = "You are not allowed to edit this meal.";
    return next(err);
  }

  console.log(name, imgUrl, cuisine);
  const updatedMeal = await meal.update({
    name,
    imgUrl,
    cuisine,
  });

  return res.json(updatedMeal);
});

// Delete meal from mealId
router.delete("/:mealId", requireAuth, async (req, res, next) => {
  const { mealId } = req.params;
  const userId = req.user.id;

  const meal = await Meal.findByPk(mealId);

  if (!meal) {
    return next({
      status: 404,
      message: "Meal could not be found",
    });
  }

  if (userId !== meal.creatorId) {
    const err = new Error("Authorization required");
    err.status = 403;
    err.message = "You are not allowed to delete this meal.";
    return next(err);
  }

  await meal.destroy();

  return res.json({
    status: 200,
    message: "Successfully deleted",
  });
});

// Get all meals
router.get("/", async (req, res, next) => {
  const meals = await Meal.findAll({
    order: ["name"],
  });

  return res.json(meals);
});

// Create a new meal
router.post("/", requireAuth, async (req, res, next) => {
  const { name, imgUrl, cuisine } = req.body;
  const userId = req.user.id;

  const newMeal = await Meal.create({
    creatorId: userId,
    name,
    imgUrl,
    cuisine,
  });

  return res.status(201).json(newMeal);
});

module.exports = router;

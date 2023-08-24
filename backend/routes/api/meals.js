const express = require("express");

const { requireAuth } = require("../../utils/auth");
const { Meal } = require("../../db/models");

const router = express.Router();

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
  const meal = await Meal.findByPk(mealId);

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
      message: "Meal couldn't be found",
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

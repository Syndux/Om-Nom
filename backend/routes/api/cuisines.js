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

// Create new cuisine
router.post("/", requireAuth, async (req, res, next) => {
  try {
    const { name } = req.body;
    const userId = req.user.id;

    const titleCase = (name) => {
      return name
        .split(" ")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");
    };

    const titleCasedName = titleCase(name);

    const newCuisine = await Cuisine.create({
      creatorId: userId,
      name: titleCasedName,
    });

    return res.status(201).json(newCuisine);
  } catch (err) {
    return next(err);
  }
});

// Edit cuisine
router.put("/:cuisineId", requireAuth, async (req, res, next) => {
  const { cuisineId } = req.params;
  const userId = req.user.id;
  const { name } = req.body;

  const cuisine = await Cuisine.findByPk(cuisineId);

  if (!cuisine) {
    return next({
      status: 404,
      message: "Cuisine could not be found",
    });
  }

  if (userId !== cuisine.creatorId) {
    const err = new Error("Authorization required");
    err.status = 403;
    err.message = "You are not allowed to edit the cuisine.";
    return next(err);
  }

  const updatedCuisine = await cuisine.update({
    name,
  });

  return res.json(updatedCuisine);
});

// Delete cuisine
router.delete("/:cuisineId", requireAuth, async (req, res, next) => {
  const { cuisineId } = req.params;
  const userId = req.user.id;

  const cuisine = await Cuisine.findByPk(cuisineId);

  if (!cuisine) {
    return next({
      status: 404,
      message: "Cuisine could not be found",
    });
  }

  if (userId !== cuisine.creatorId) {
    const err = new Error("Authoration required");
    err.status = 403;
    err.message = "You are not allowed to delete this cuisine.";
    return next(err);
  }

  await cuisine.destroy();

  return res.json({
    status: 200,
    message: "Successfully delete",
  });
});

module.exports = router;

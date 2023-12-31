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

// Add ingredients for a food with foodId
router.post(
  "/:foodId/ingredients/:ingredientId",
  requireAuth,
  async (req, res, next) => {
    const { foodId, ingredientId } = req.params;
    const { quantity, unit } = req.body;
    const userId = req.user.id;

    const food = await Food.findByPk(foodId);
    const ingredient = await Ingredient.findByPk(ingredientId);

    if (!food || !ingredient) {
      return next({
        status: 404,
        message: "Food or ingredient could not be found",
      });
    }

    if (userId !== food.creatorId) {
      const err = new Error("Authorization required");
      err.status = 403;
      err.message = "You are not allowed to edit this food's ingredients.";
      return next(err);
    }

    const newFoodIngredient = await FoodIngredient.create({
      foodId: food.id,
      ingredientId: ingredient.id,
      quantity,
      unit,
    });

    return res.status(201).json({ newFoodIngredient });
  }
);

// Update ingredient info for a food with foodId and ingredientId
router.put(
  "/:foodId/ingredients/:ingredientId",
  requireAuth,
  async (req, res, next) => {
    const { foodId, ingredientId } = req.params;
    const { quantity, unit } = req.body;
    const userId = req.user.id;

    const food = await Food.findByPk(foodId);
    const ingredient = await Ingredient.findByPk(ingredientId);

    if (!food || !ingredient) {
      return next({
        status: 404,
        message: "Food or ingredient could not be found",
      });
    }

    if (userId !== food.creatorId) {
      const err = new Error("Authorization required");
      err.status = 403;
      err.message = "You are not allowed to edit this food's ingredients.";
      return next(err);
    }

    const foodIngredient = await FoodIngredient.findOne({
      where: {
        foodId: food.id,
        ingredientId: ingredient.id,
      },
    });

    if (!foodIngredient) {
      return next({
        status: 404,
        message: "Ingredient not found for this food",
      });
    }

    const updatedFoodIngredient = await foodIngredient.update({
      foodId: food.id,
      ingredientId: ingredient.id,
      quantity,
      unit,
    });

    return res.status(200).json({ updatedFoodIngredient });
  }
);

// Delete ingredient in a food with foodId and ingredientId
router.delete(
  "/:foodId/ingredients/:ingredientId",
  requireAuth,
  async (req, res, next) => {
    const { foodId, ingredientId } = req.params;
    const userId = req.user.id;

    const food = await Food.findByPk(foodId);

    if (!food) {
      return next({
        status: 404,
        message: "Food could not be found",
      });
    }

    const foodIngredient = await FoodIngredient.findOne({
      where: {
        foodId,
        ingredientId,
      },
    });

    if (!foodIngredient) {
      return next({
        status: 404,
        message: "Ingredient could not be found.",
      });
    }

    if (userId !== food.creatorId) {
      const err = new Error("Authorization required");
      err.status = 403;
      err.message = "You are not allowed to edit this food's ingredients.";
      return next(err);
    }

    await foodIngredient.destroy();

    return res.json({
      status: 200,
      message: "Successfully deleted",
    });
  }
);

// Read ingredients for a food with foodId
router.get("/:foodId/ingredients", async (req, res, next) => {
  const { foodId } = req.params;

  const food = await Food.findByPk(foodId);

  if (!food) {
    return next({
      status: 404,
      message: "Food could not be found",
    });
  }

  const foodIngredients = await FoodIngredient.findAll({
    where: { foodId },
    include: {
      model: Ingredient,
      as: "ingredient",
      attributes: ["name", "imgUrl"],
    },
    attributes: { exclude: ["foodId"] },
    // raw: true,
  });

  if (!foodIngredients) {
    return next({
      status: 404,
      message: "No ingredients for this food could be found.",
    });
  }

  return res.json({ foodIngredients });
});

// Get all foods from current user
router.get("/current", requireAuth, async (req, res, next) => {
  const foods = await Food.findAll({
    where: { creatorId: req.user.id },
    include: {
      model: Cuisine,
      as: "cuisine",
      attributes: ["name"],
    },
    raw: true,
    order: [["createdAt", "DESC"]],
  });

  return res.json(foods);
});

// Get details of a food with foodId
router.get("/:foodId", async (req, res, next) => {
  const { foodId } = req.params;
  const food = await Food.findByPk(foodId, {
    include: [
      {
        model: Ingredient,
        as: "ingredients",
        through: {
          model: FoodIngredient,
          attributes: ["quantity", "unit"],
        },
        attributes: {
          exclude: ["createdAt", "updatedAt"],
        },
      },
      {
        model: Cuisine,
        as: "cuisine",
        attributes: ["name"],
      },
    ],
    attributes: {
      exclude: ["createdAt", "updatedAt"],
    },
  });

  if (!food) {
    return next({
      status: 400,
      message: "Food could not be found",
    });
  }

  return res.json(food);
});

// Edit details of a food with foodId
router.put("/:foodId", requireAuth, async (req, res, next) => {
  const { foodId } = req.params;
  const userId = req.user.id;
  const { name, imgUrl, cuisine } = req.body;

  const food = await Food.findByPk(foodId);

  if (!food) {
    return next({
      status: 404,
      message: "Food could not be found",
    });
  }

  if (userId !== food.creatorId) {
    const err = new Error("Authorization required");
    err.status = 403;
    err.message = "You are not allowed to edit this food.";
    return next(err);
  }

  const updatedFood = await food.update({
    name,
    imgUrl,
    cuisine,
  });

  const resFood = await Food.findByPk(foodId, {
    include: [
      {
        model: Ingredient,
        as: "ingredients",
        through: {
          model: FoodIngredient,
          attributes: ["quantity", "unit"],
        },
        attributes: {
          exclude: ["createdAt", "updatedAt"],
        },
      },
      {
        model: Cuisine,
        as: "cuisine",
        attributes: ["name"],
      },
    ],
    attributes: {
      exclude: ["createdAt", "updatedAt"],
    },
  });
  
  return res.json(resFood);
});

// Delete food from foodId
router.delete("/:foodId", requireAuth, async (req, res, next) => {
  const { foodId } = req.params;
  const userId = req.user.id;

  const food = await Food.findByPk(foodId);

  if (!food) {
    return next({
      status: 404,
      message: "Food could not be found",
    });
  }

  if (userId !== food.creatorId) {
    const err = new Error("Authorization required");
    err.status = 403;
    err.message = "You are not allowed to delete this food.";
    return next(err);
  }

  await food.destroy();

  return res.json({
    status: 200,
    message: "Successfully deleted",
  });
});

// Get all foods
router.get("/", async (req, res, next) => {
  const foods = await Food.findAll({
    include: {
      model: Cuisine,
      as: "cuisine",
      attributes: ["name"]
    },
    raw: true,
    order: ["id"],
  });

  return res.json(foods);
});

// Create new food
router.post("/", requireAuth, async (req, res, next) => {
  try {
    const { name, imgUrl, cuisineId } = req.body;
    const userId = req.user.id;

    const titleCase = (name) => {
      return name
        .split(" ")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");
    };

    const titleCasedName = titleCase(name);
    
    const newFood = await Food.create({
      creatorId: userId,
      name: titleCasedName,
      imgUrl,
      cuisineId: Number(cuisineId),
    });

    return res.status(201).json(newFood);
  } catch (err) {
    return next(err);
  }
});

module.exports = router;

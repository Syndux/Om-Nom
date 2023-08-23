const express = require("express")

const { requireAuth } = require("../../utils/auth");
const { Meal } = require("../../db/models");

const router = express.Router();

// Get all meals from current user
router.get("/current", requireAuth, async (req, res, next) => {
    const meals = await Meal.findAll({
        where: { creatorId: req.user.id },
        order: [['createdAt', 'DESC']],
    });

    return res.json(meals);
});

// Get details of a meal with mealId
router.get("/:mealId", async (req, res, next) => {
    const { mealId } = req.params;
    const meal = await Meal.findByPk(mealId);

    return res.json(meal);
});

// Get all meals 
router.get("/", async (req, res, next) => {
    const meals = await Meal.findAll({
        order: ['name']
    });

    return res.json(meals);
});

module.exports = router;
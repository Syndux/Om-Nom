// backend/routes/api/index.js
const router = require("express").Router();
const usersRouter = require("./users.js");
const foodsRouter = require("./foods.js");
const ingredientsRouter = require("./ingredients.js");
const cuisinesRouter = require("./cuisines.js");
const { restoreUser } = require("../../utils/auth.js");

// Connect restoreUser middleware to the API router
// If current user session is valid, set req.user to the user in the database
// If current user session is not valid, set req.user to null
router.use(restoreUser);

router.use("/users", usersRouter);
router.use("/foods", foodsRouter);
router.use("/ingredients", ingredientsRouter);
router.use("/cuisines", cuisinesRouter);

router.post("/test", function (req, res) {
  res.json({ requestBody: req.body });
});

module.exports = router;

// backend/routes/api/users.js
const express = require("express");
const bcrypt = require("bcryptjs");
const { Op } = require("sequelize");

const { setTokenCookie } = require("../../utils/auth");
const { validateLogin, validateSignup }  = require("../../utils/validation");
const { User } = require("../../db/models");

const router = express.Router();

// Restore session user
router.get("/current", (req, res) => {
  const { user } = req;
  if (user) {
    const safeUser = {
      id: user.id,
      email: user.email,
      username: user.username,
      firstName: user.firstName,
      lastName: user.lastName,
      imgUrl: user.imgUrl,
    };
    return res.json({
      user: safeUser,
    });
  } else return res.json({ user: null });
});

// Login
router.post("/login", validateLogin, async (req, res, next) => {
  const { credential, password } = req.body;
  console.log(credential, password);
  
  const user = await User.unscoped().findOne({
    where: {
      [Op.or]: {
        username: credential,
        email: credential,
      },
    },
  });

  if (!user || !bcrypt.compareSync(password, user.hashedPassword.toString())) {
    const err = new Error("Login failed");
    err.status = 401;
    err.title = "Login failed";
    err.message = "The provided credentials were invalid.";
    return next(err);
  }

  const safeUser = {
    id: user.id,
    email: user.email,
    username: user.username,
    firstName: user.firstName,
    lastName: user.lastName,
    imgUrl: user.imgUrl,
  };

  await setTokenCookie(res, safeUser);

  return res.json({ user: safeUser });
});

// Sign up
router.post("/", validateSignup, async (req, res) => {
  const { email, username, firstName, lastName, password } = req.body;
  const hashedPassword = bcrypt.hashSync(password);
  const user = await User.create({
    email,
    username,
    firstName,
    lastName,
    hashedPassword,
    imgUrl: "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
  });

  const safeUser = {
    id: user.id,
    email: user.email,
    username: user.username,
    firstName: user.firstName,
    lastName: user.lastName,
    imgUrl: user.imgUrl,
  };

  await setTokenCookie(res, safeUser);

  return res.json({
    user: safeUser,
  });
});

// Log out
router.delete("/", (_req, res) => {
  res.clearCookie("token");
  return res.json({ message: "Successfully logged out." });
});

module.exports = router;

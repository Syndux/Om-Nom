const express = require("express");

const { requireAuth } = require("../../utils/auth");
const { Ingredients } = require("../../db/models");

const router = express.Router();

module.exports = router;
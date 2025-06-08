const express = require("express");
const router = express.Router();

router.get("/dashboard", async (req, res, next) => {
  res.render('dashboard')
});

router.get("/login", async (req, res, next) => {
  res.render('auth/login')
});

router.get("/register", async (req, res, next) => {
  res.render('auth/register')
});

router.get("/forgot-password", async (req, res, next) => {
  res.render('auth/forget-password')
});

module.exports = router;

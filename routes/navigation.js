const express = require("express");
const router = express.Router();

router.get("/map", (req, res) => {
  res.render("../views/healthcare/map");
});

router.get("/professional", (req, res) => {
  res.render("../views/healthcare/professional");
});

router.get("/aboutUs", (req, res) => {
  res.render("../views/info/aboutUs");
});

router.get("/faq", (req, res) => {
  res.render("../views/info/faq");
});

router.get("/contact", (req, res) => {
  res.render("../views/info/contact");
});

router.get("/language", (req, res) => {
  res.render("../views/info/language");
});

module.exports = router;
const express = require("express");
const router = express.Router();
const { getAllGuns, createGun } = require("../controllers/guns");

router.route("/").get(getAllGuns);
router.route("/createGun").post(createGun);

module.exports = router;

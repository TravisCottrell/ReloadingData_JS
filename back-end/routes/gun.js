const express = require("express");
const router = express.Router();
const {
    getSingleGun,
    getBullet,
    createBullet,
    deleteBullet,
    editBullet,
    createRowData,
    updateRowData,
    deleteResult,
} = require("../controllers/gun");

router.route("/:id").get(getSingleGun);

router.route("/:id/create_bullet").post(createBullet);
router.route("/delete_bullet/:id").delete(deleteBullet);
router.route("/edit_bullet/:id").get(getBullet).patch(editBullet);

router.route("/create_row/:id").post(createRowData);
router.route("/update_row").patch(updateRowData);
router.route("/delete_result/:id").delete(deleteResult);

module.exports = router;

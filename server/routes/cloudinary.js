const express = require("express");
const router = express.Router();

const { upload, remove } = require("../controllers/cloudinary");

router.post("/uploadimages", upload);
router.post("/removeimages", remove);

module.exports = router;

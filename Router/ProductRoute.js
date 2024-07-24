const express = require("express")
const router = express.Router()
const multer = require("multer");
const path = require("path");
// const fs = require("fs");

const ProductController = require("../Controller/ProductController")

// Define storage for the images
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '../public/data/uploads/')); // Corrected path
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname)); // Append extension
    }
});

// Initialize multer with storage
const upload = multer({ storage: storage });

// router.get("/product/findByPriceGreater/:price", ProductController.findByPriceGreater)
// router.get("/product/findByPriceLesser/:price", ProductController.findByPriceLesser)
// router.post("/product/findByPriceBetween", ProductController.findByPriceBetween)
router.get("/product/list", ProductController.list)
router.post("/product/insert", upload.single('file'), ProductController.insert)
// router.put("/product/like/:id", ProductController.like)
router.delete("/product/delete/:id", ProductController.delete)
router.put("/product/update/:id", upload.single('file'), ProductController.update)
// router.post("/product/file/upload", upload.single('file'), ProductController.upload);

module.exports = router
const router = require("express").Router();
// const Product = require("./model");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });
const path = require("path");
// const fs = require("fs");
const {
  getProduct,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} = require("./controller");

router.get("/product", getProduct);
router.get("/product/:id", getProductById);
router.post("/product", upload.single("image"), createProduct);
router.put("/product/:id", upload.single("image"), updateProduct);
router.delete("/product/:id", upload.single("image"), deleteProduct);

module.exports = router;

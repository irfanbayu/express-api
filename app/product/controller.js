// * Import Model Product
const Product = require("./model");
const path = require("path");
const fs = require("fs");

// * Get all product
const getProduct = async (req, res) => {
  try {
    const product = await Product.findAll();
    res.send(product);
  } catch (error) {
    res.send(error);
  }
};

// * Get product sort by id
const getProductById = async (req, res) => {
  try {
    const product = await Product.findAll({
      where: {
        sql: "Select * from product where id = ?",
        values: [req.params.id],
      },
    });
    res.send(product);
  } catch (error) {
    res.send(error);
  }
};

// * Create new product
const createProduct = async (req, res) => {
  const { users_id, name, price, stock, status } = req.body;
  const image = req.file;
  if (image) {
    const target = path.join(__dirname, "../../uploads", image.originalname);
    fs.renameSync(image.path, target);
    try {
      await Product.sync();
      const result = await Product.create({
        users_id,
        name,
        price,
        stock,
        status,
        image_url: `http://localhost:3000/public/${image.originalname}`,
      });
      res.send(result);
    } catch (err) {
      res.send(err);
    }
  }
};

// * Update product by id
const updateProduct = async (req, res) => {
  const { users_id, name, price, stock, status } = req.body;
  const image = req.file;
  let sql = "";
  let values = [];
  if (image) {
    const target = path.join(__dirname, "../../uploads", image.originalname);
    fs.renameSync(image.path, target);
    try {
      await Product.sync();
      const result = await Product.update(
        {
          users_id: users_id,
          name: name,
          price: price,
          stock: stock,
          status: status,
          image_url: `http://localhost:3000/public/${image.originalname}`,
        },
        {
          where: {
            id: req.params.id,
          },
        }
      );
      res.send(result);
    } catch (err) {
      res.send(err);
    }
  }
};

// * Delete product by id
const deleteProduct = async (req, res) => {
  try {
    await Product.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.json({
      message: "Delete product success",
    });
  } catch (error) {
    res.send(error);
  }
};

module.exports = {
  getProduct,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};

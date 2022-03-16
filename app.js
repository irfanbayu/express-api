const express = require("express");
const router = require("./app/product/routes");
const productRouter = require("./app/product/routes");
const logger = require("morgan");
const app = express();

app.use(express.json());
app.use(logger("dev"));
app.use(router);
app.use("/api", productRouter);
app.use("/", (req, res) => {
  res.status(404);
  res.send({
    status: "Failed",
    message: "Reource" + req.originalUrl + " not found",
  });
});
app.listen(3000, () => console.log("Server http://localhost:3000"));

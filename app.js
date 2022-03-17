const express = require("express");
const router = require("./app/product/routes");
const productRouter = require("./app/product/routes");
const logger = require("morgan");
const app = express();
const port = process.env.PORT || 5000;

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

// * viewed on port 5000
app.listen(port, () => console.log(`Listening on port ${port}`));

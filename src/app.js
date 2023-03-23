import express from "express";
import productRouter from "./api/products/productRouter.js";
import cartRouter from "./api/carts/cartRouter.js";
import __dirname from "./utils.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/", express.static(`${__dirname}/public`));

app.use("/api/products", productRouter);
app.use("/api/carts", cartRouter);

app.listen(8080, (req, res) => {
  console.log("Listening on port 8080");
});

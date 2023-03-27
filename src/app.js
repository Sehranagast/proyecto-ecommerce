/*import express from "express";
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
*/
import express from "express";
import productRouter from "./api/products/productRouter.js";
import cartRouter from "./api/carts/cartRouter.js";
import Handlebars from "handlebars";
import fs from "fs";
import path from "path";
const app = express();
const __dirname = path.resolve();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/", express.static(`${__dirname}/public`));
app.use("/api/products", productRouter);
app.use("/api/carts", cartRouter);
const productsFilePath = path.join(__dirname, "src", "files", "Products.json");
const productsRawData = fs.readFileSync(productsFilePath);
const products = JSON.parse(productsRawData);
const data = {
  productsList: products,
};
const homeFilePath = path.join(__dirname, "src", "views", "home.handlebars");
const homeRawData = fs.readFileSync(homeFilePath, "utf8");
const homeTemplate = Handlebars.compile(homeRawData);
const homeHTML = homeTemplate(data);
app.get("/", (req, res) => {
  res.send(homeHTML);
});
app.listen(8080, () => {
  console.log("Listening on port 8080");
});

import { Router } from "express";
import ProductManager from "../../ProductManager.js";
import { uploader } from "../../utils.js";

const router = Router();
const manager = new ProductManager();

router.get("/", async (req, res) => {
  try {
    const { limit } = req.query;
    const products = await manager.getProducts();

    if (!limit) {
      return res.send({ products: products });
    }

    const limitedProducts = products.slice(0, limit);

    return res.send({ products: limitedProducts });
  } catch (error) {
    console.error(error);
    return res.status(500).send({ error: "Internal Server Error" });
  }
});

router.get("/:pid", async (req, res) => {
  try {
    const productId = req.params.pid;
    const product = await manager.getProductById(+productId);

    if (!product) {
      return res
        .status(404)
        .send({ status: "Error", error: "product was not found" });
    }
    return res.send({ status: "OK", message: product });
  } catch (error) {
    console.error(error);
    return res.status(500).send({ error: "Internal Server Error" });
  }
});

router.post("/", uploader.array("thumbnails", 5), async (req, res) => {
  try {
    const product = req.body;
    const files = req.files;

    if (!product) {
      return res.status(400).send({
        status: "Error",
        error: "Error, cannot find the product",
      });
    }

    product.thumbnails = [];

    if (files) {
      files.forEach((file) => {
        const imageUrl = `http://localhost:8080/images/${file.thumbnail}`;
        product.thumbnails.push(imageUrl);
      });
    }

    await manager.addProduct(product);
    return res.send({ status: "OK", message: "product successfully added" });
  } catch (error) {
    console.error(error);
    return res.status(500).send({ error: "Internal Server Error" });
  }
});

router.put("/:pid", async (req, res) => {
  try {
    const productId = req.params.pid;
    const changes = req.body;

    const updatedProduct = await manager.updateProduct(+productId, changes);

    if (!updatedProduct) {
      return res
        .status(404)
        .send({ statud: "Error", error: "Product was not found" });
    }
    return res.send({
      status: "OK",
      message: "Product succesfully updated",
      product: updatedProduct,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send({ error: "Internal Server Error" });
  }
});

router.delete("/:pid", async (req, res) => {
  try {
    const productId = req.params.pid;
    const deletedProduct = await manager.deleteProduct(+productId);

    if (!deletedProduct) {
      return res
        .status(404)
        .send({ status: "Error", error: "Product does not exist" });
    }
    return res.send({ status: "OK", message: "PRoduct deleted successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).send({ error: "Internal Server Error" });
  }
});

export default router;

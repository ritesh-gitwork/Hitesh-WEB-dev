import express from "express";
import logger from "./logger.js";
import morgan from "morgan";

const app = express();
const port = 3000;
app.use(express.json());

const morganFormat = ":method :url :status :response-time ms";

app.use(
  morgan(morganFormat, {
    stream: {
      write: (message) => {
        const logObject = {
          method: message.split(" ")[0],
          url: message.split(" ")[1],
          status: message.split(" ")[2],
          responseTime: message.split(" ")[3],
        };
        logger.info(JSON.stringify(logObject));
      },
    },
  })
);

let productData = [];
let productId = 1;

// adding the product to cart
app.post("/addProduct", (req, res) => {
  const { name, category, price, stock } = req.body;
  const newProduct = { id: productId++, name, category, price, stock };
  productData.push(newProduct);
  res.status(200).send(newProduct);
});

//get all product list
app.get("/listProduct", (req, res) => {
  res.status(201).send(productData);
});

//get all product list by id
app.get("/listProduct/:id", (req, res) => {
  let product = productData.find((p) => p.id === parseInt(req.params.id));
  if (!product) {
    res.status(404).send("product not found");
  }
  res.status(200).send(product);
});

//update the cart
app.put("/product/:id", (req, res) => {
  let product = productData.find((p) => p.id === parseInt(req.params.id));
  if (!product) {
    res.status(404).send("product not found");
  }
  const { name, price, stock } = req.body;
  product.name = name;
  product.price = price;
  product.stock = stock;

  res.status(200).send(product);
});

// deleting the product
app.delete("/product/:id", (req, res) => {
  const index = productData.findIndex((p) => p.id === parseInt(req.params.id));
  if (index === -1) {
    return res.status(404).send("product not found");
  }
  productData.splice(index, 1);
  res.status(204).send("product deleted");
});

app.listen(port, () => {
  console.log(`server is litening on : ${port}...`);
});

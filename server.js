const express = require("express");

const fs = require('fs');
let jsonData = fs.readFileSync('./products.json')
let jsonProducts = JSON.parse(jsonData);

// const jsonProducts = require('./products.json')
const app = express();
const port = 3000;

// Middleware (?)
app.use(express.static("public"));
app.use(express.json());

// GET-anrop som hämtar alla produkter
app.get("/api/products", (req, res) => {
  res.send(jsonProducts);
});

// GET-anrop som hämtar en produkt med ett specifikt id
app.get("/api/products/:id", (req, res) => {
  const id = req.params.id;

  const foundProduct = jsonProducts.find((product) => {
    return product.id == id;
  });

  if (!foundProduct) {
    res.status(404)
    res.json({ error: `Det finns ingen produkt med id: ${id}` });
  }

  res.json(foundProduct);
});

// PUT-anrop som ändrar en specifik produkt

app.put("/api/products/:id", (req, res) => {
  const id = req.params.id;
  const updatedProduct = jsonProducts.find((product) => {
    return product.id == id;
  });

  if (!updatedProduct) {
    res.status(404)
    res.json({ error: `Det finns ingen produkt med id: ${id}` });
    return;
  }

  updatedProduct.name = req.body.name;
  updatedProduct.description = req.body.description;
  updatedProduct.price = req.body.price;
  res.send(updatedProduct);

  let data = JSON.stringify(jsonProducts, null, 2)
  fs.writeFileSync('./products.json', data)

 });

app.delete("/api/products/:id", (req, res) => {
  const id = req.params.id;
  const deletedProduct = jsonProducts.find((product) => {
    return product.id == id;
  });

  if (!deletedProduct) {
    res.status(404)
    res.json({ error: `Det finns ingen produkt med id: ${id}` });
    return;
  }

  const index = jsonProducts.indexOf(deletedProduct);
  jsonProducts.splice(index, 1);
  res.json(deletedProduct);

  let data = JSON.stringify(jsonProducts, null, 2)
  fs.writeFileSync('./products.json', data)
});

// POST-anrop
app.post("/api/products", (req, res) => {

  if (!req.body.name) {
    res.json({ error: "Produkten som försöker skapas saknar namn" });
    return;
  }

  if (!req.body.description) {
    res.json({ error: "Produkten som försöker skapas saknar beskrivning" });
    return;
  }

  if (!req.body.price) {
    res.json({ error: "Produkten som försöker skapas saknar pris" });
    return;
  }

  const newProductName = req.body.name;
  const newProductDescription = req.body.description;
  const newProductPrice = req.body.price;

  let newProductId = 0;
  jsonProducts.forEach((product) => {
    if (product.id > newProductId) {
      newProductId = product.id;
    }
  });

  newProductId++;

  jsonProducts.push({
    id: newProductId,
    name: newProductName,
    description: newProductDescription,
    price: newProductPrice,
  });

  res.json({
    status: "Ny produkt sparad",
  });

  let data = JSON.stringify(jsonProducts, null, 2)
  fs.writeFileSync('./products.json', data)

});

// körs när servern och express-appen är igång
app.listen(port, () => {
  console.log(`App is running on http://localhost:${port}`);
});

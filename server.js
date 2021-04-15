const express = require("express");

const fs = require("fs");
let jsonData = fs.readFileSync("./products.json");
let jsonProducts = JSON.parse(jsonData);

const app = express();
const port = 3000;

// Middleware
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
    res.status(404).json({ error: `Det finns ingen produkt med id: ${id}` });
    return;
  }

  res.json(foundProduct);
});

// PUT-anrop som ändrar en specifik produkt
app.put("/api/products/:id", (req, res) => {
  if (!req.body.name || !req.body.name.length) {
    res.status(400).json({ error: "Produkten som försöker uppdateras saknar namn" });
    return;
  }

  if (!req.body.description || !req.body.description.length) {
    res.status(400).json({ error: "Produkten som försöker uppdateras saknar beskrivning" });
    return;
  }

  if (!req.body.price || !req.body.price.length) {
    console.log("hej");
    res.status(400).json({ error: "Produkten som försöker uppdateras saknar pris" });
    return;
  }

  const id = req.params.id;
  const updatedProduct = jsonProducts.find((product) => {
    return product.id == id;
  });

  if (!updatedProduct) {
    res.status(404).json({ error: `Det finns ingen produkt med id: ${id}` });
    return;
  }

  updatedProduct.name = req.body.name;
  updatedProduct.description = req.body.description;
  updatedProduct.price = req.body.price;

  res.send(updatedProduct);
});

app.delete("/api/products/:id", (req, res) => {
  const id = req.params.id;
  const deletedProduct = jsonProducts.find((product) => {
    return product.id == id;
  });

  if (!deletedProduct) {
    res.status(404).json({ error: `Det finns ingen produkt med id: ${id}` });
    return;
  }

  const index = jsonProducts.indexOf(deletedProduct);
  jsonProducts.splice(index, 1);
  res.json(deletedProduct);
});

// POST-anrop
app.post("/api/products/", (req, res) => {
  const newProductName = req.body.name;
  const newProductDescription = req.body.description;
  const newProductPrice = req.body.price;

  if (!newProductName || newProductName == "") {
    res.status(400).json({ error: "Produkten som försöker skapas saknar namn" });
    return;
  }

  if (!newProductDescription || newProductDescription == "") {
    res.status(400).json({ error: "Produkten som försöker skapas saknar beskrivning" });
    return;
  }

  if (!newProductPrice || newProductPrice == "") {
    res.status(400).json({ error: "Produkten som försöker skapas saknar pris" });
    return;
  }

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

  res.json(req.body);
});

// körs när servern och express-appen är igång
app.listen(port, () => {
  console.log(`App is running on http://localhost:${port}`);
});

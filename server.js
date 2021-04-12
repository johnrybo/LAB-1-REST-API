const express = require("express");
const app = express();
const port = 3000;

const products = [
  {
    name: "Stol",
    description: "En fin stol",
    price: 1499,
    id: 1,
  },
  {
    name: "Soffa",
    description: "En skön soffa",
    price: 8999,
    id: 2,
  },
];

// Middleware (?)
app.use(express.static("public"));
app.use(express.json());

// GET-anrop som hämtar alla produkter
app.get("/api", (req, res) => {
  res.send(products);
});

// GET-anrop som hämtar en produkt med ett specifikt id
app.get("/api/products/:id", (req, res) => {
  const id = req.params.id;

  const foundProduct = products.find((product) => {
    return product.id == id;
  });

  if (!foundProduct) {
    res.json({ error: `Det finns ingen produkt med id: ${id}` });
  }

  res.json(foundProduct);
});

// PUT-anrop som ändrar priset på en specifik produkt

app.put("/api/products/:id", (req, res) => {
  const id = req.params.id;
  const updatedProduct = products.find((product) => {
    return product.id == id;
  });

  if (!updatedProduct) {
    res.json({ error: `Det finns ingen produkt med id: ${id}` });
    return;
  }

  updatedProduct.price = req.body.price;
  res.send(updatedProduct);
});

// DELETE-anrop som tar bort en specifik produkt

app.delete("/api/products/:id", (req, res) => {
  const id = req.params.id;
  const deletedProduct = products.find((product) => {
    return product.id == id;
  });

  if (!deletedProduct) {
    res.json({ error: `Det finns ingen produkt med id: ${id}` });
    return;
  }

  // Delete
  const index = products.indexOf(deletedProduct);
  products.splice(index, 1);

  // Return the same product
  res.json(deletedProduct);
});

// POST-anrop
app.post("/api", (req, res) => {

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
  products.forEach((product) => {
    if (product.id > newProductId) {
      newProductId = product.id;
    }
  });

  newProductId++;

  products.push({
    id: newProductId,
    name: newProductName,
    description: newProductDescription,
    price: newProductPrice,
  });

  res.json({
    status: "Ny produkt sparad",
  });
});

// körs när servern och express-appen är igång
app.listen(port, () => {
  console.log(`App is running on http://localhost:${port}`);
});

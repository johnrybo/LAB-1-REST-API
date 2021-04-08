const express = require('express');
const app = express();
const port = 3000;

const products = [
    {
        "name": "Stol",
        "description": "En fin stol",
        "price": 1499,
        "id": 1
    },
    {
        "name": "Soffa",
        "description": "En skön soffa",
        "price": 8999,
        "id": 2
    }
];

// Serve all files in the public folder
app.use(express.static('public'))

// Parse incoming body from json to js-object
app.use(express.json());

// Define our endpoints
app.get('/api/products', (req, res) => {
    res.json(products);
})

app.post('/api/products', (req, res) => {
    products.push(req.body);
    res.status(201).json(req.body);
})

app.delete('/api/products', (req, res) => {
    const index = products.findIndex(p => p.name == "Sebastians tröja");
    const deletedProduct = products.splice(index, 1);
    res.json(deletedProduct);
})

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`)
})
const express = require('express');
const app = express();
const port = 3000;

const products = [
    {
        name: "Stol",
        description: "En fin stol",
        price: 1499,
        id: 1
    },
    {
        name: "Soffa",
        description: "En skön soffa",
        price: 8999,
        id: 2
    }
];

// Serve all files in the public folder
app.use(express.static('public'))

// Parse incoming body from json to js-object
app.use(express.json());

// middleware
app.use(express.static('public'))

app.use(express.json())

// GET-anrop till vår bas-url
app.get('/api', (req, res) => {
    res.send(products)
})

// GET-anrop till ett specifikt id
app.get('/api/products/:id', (req, res) => {
    const id = req.params.id

    const foundProduct = products.find((product) => {
        return product.id == id
    })

    if(!foundProduct) {
        res.json({"error": "Oops detta id finns ej..."})
    }

    res.json(foundProduct)
})

// POST-anrop
app.post('/api', (req, res) => {

    if (!req.body.name) {
        res.json({"error": "Oops title finns ej..."})
        return
    }
    const nameToSave = req.body.name
    const descriptionToSave = req.body.description
    const priceToSave = req.body.price

    let idToSave = 0;
    products.forEach((product) => {
        if (product.id > idToSave) {
            idToSave = product.id;
        }
    })

    idToSave++;

    products.push({
        id: idToSave,
        title: nameToSave,
        description: descriptionToSave,
        price: priceToSave
    })

    res.json({
        status: "Ny produkt sparad"
    })
})

// körs när servern och express-appen är igång
app.listen(port, () => {
    console.log(`App is running on http://localhost:${port}`)
})
const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res, next) => {
    // nånting
    next();
})

app.use(express.static('public'));

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`)
})
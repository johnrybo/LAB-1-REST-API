window.addEventListener("load", initSite)

 async function initSite() {
    const allProducts = await getAllProducts()
    console.log(allProducts)
    // getSpecificProduct(3)
    // createNewProduct("Köra bil")
}

async function getAllProducts() {
    const products = await makeRequest("/api", "GET")
    return products
}

async function getSpecificProduct(id) {
    const product = await makeRequest("/api/" + id, "GET")
    console.log(product)
}

async function createNewProduct(title) {

    const body = {title: title}

    const status = await makeRequest("/api", "POST", body)
    console.log(status)
}

async function makeRequest(url, method, body) {

    const response = await fetch(url, {
        method: method,
        body: JSON.stringify(body),
        headers: {
            'Content-type': 'application/json'
        }
    })

    console.log(response)
    const result = await response.json()
    return result

}
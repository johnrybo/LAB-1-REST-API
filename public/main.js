window.addEventListener("load", initSite);

async function initSite() {
  const allProducts = await getAllProducts();
  console.log(allProducts);
  const specificProduct = await getSpecificProduct(2);
  console.log(specificProduct);
  const newProduct = await createNewProduct("Bord", "Ett bra bord", 999);
  console.log(newProduct);
}

async function getAllProducts() {
  const products = await makeRequest("/api", "GET");
  return products;
}

async function getSpecificProduct(id) {
  const product = await makeRequest("/api/products/" + id, "GET");
  return product;
}

async function createNewProduct(name, description, price) {
  const body = { name: name, description: description, price: price };

  const status = await makeRequest("/api", "POST", body);
  return status;
}

async function makeRequest(url, method, body) {
  const response = await fetch(url, {
    method: method,
    body: JSON.stringify(body),
    headers: {
      "Content-type": "application/json",
    },
  });

  console.log(response);
  const result = await response.json();
  return result;
}

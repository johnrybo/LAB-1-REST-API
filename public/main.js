window.addEventListener("load", main);

function main() {

  showProductsInTable();

  const getAllProductsButton = document.createElement("button");
  getAllProductsButton.innerHTML = "Hämta alla produkter";
  document.body.append(getAllProductsButton);
  getAllProductsButton.addEventListener(
    "click",
    async () => await getAllProducts()
  );

  const inputProductId = document.createElement("input");
  inputProductId.placeholder = "Id";
  document.body.append(inputProductId);

  const getSpecificProductButton = document.createElement("button");
  getSpecificProductButton.innerHTML = "Hämta en specifik produkt";
  document.body.append(getSpecificProductButton);

  getSpecificProductButton.addEventListener(
    "click",
    async () => await getSpecificProduct(inputProductId.value)
  );

  const inputProductName = document.createElement("input");
  inputProductName.placeholder = "Namn";
  document.body.append(inputProductName);

  const inputProductDescription = document.createElement("input");
  inputProductDescription.placeholder = "Beskrivning";
  document.body.append(inputProductDescription);

  const inputProductPrice = document.createElement("input");
  inputProductPrice.placeholder = "Pris";
  document.body.append(inputProductPrice);

  const createProductButton = document.createElement("button");
  createProductButton.innerHTML = "Skapa en ny produkt";
  document.body.append(createProductButton);

  createProductButton.addEventListener(
    "click",
    async () =>
      await createNewProduct(
        inputProductName.value,
        inputProductDescription.value,
        inputProductPrice.value
      )
  );
}

async function showProductsInTable() {
  const products = await makeRequest("/api", "GET");

  products.forEach(product => {

    let productContainer = document.createElement('div')
    productContainer.classList.add('productContainer')

    let id = document.createElement('p');
    id.innerHTML = product.id;
    let name = document.createElement('p');
    name.innerHTML = product.name;
    let description = document.createElement('p');
    description.innerHTML = product.description;
    let price = document.createElement('p');
    price.innerHTML = product.price;

    productContainer.append(id)
    productContainer.append(name)
    productContainer.append(description)
    productContainer.append(price)
    
    document.body.append(productContainer);
  });

}

async function getAllProducts() {
  const products = await makeRequest("/api", "GET");
  showProductsInTable();
  return products;
}

async function getSpecificProduct(id) {
  const product = await makeRequest("/api/products/" + id, "GET");
  showProductsInTable();
  return product;
}

async function createNewProduct(name, description, price) {
  const body = { name: name, description: description, price: price };

  const status = await makeRequest("/api", "POST", body);
  showProductsInTable();
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

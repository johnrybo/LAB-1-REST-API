window.addEventListener("load", main);

function main() {
  showAllProducts();

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

async function showAllProducts() {
  const products = await makeRequest("/api", "GET");

  let table = document.querySelector("table");

  products.forEach((product) => {
    let tr = document.createElement("tr");
    let cell1 = document.createElement("td");
    let cell2 = document.createElement("td");
    let cell3 = document.createElement("td");
    let cell4 = document.createElement("td");

    cell1.innerHTML = product.id;
    cell2.innerHTML = product.name;
    cell3.innerHTML = product.description;
    cell4.innerHTML = product.price;

    tr.appendChild(cell1);
    tr.appendChild(cell2);
    tr.appendChild(cell3);
    tr.appendChild(cell4);

    table.appendChild(tr);
  });
}

async function getAllProducts() {
  showAllProducts();
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

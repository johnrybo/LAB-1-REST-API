window.addEventListener("load", main);

function main() {
  showAllProducts();
  document.body.append(getAllProductsButton);

  document.body.append(inputProductId);
  document.body.append(getSpecificProductButton);

  document.body.append(inputProductIdDelete);
  document.body.append(getSpecificProductButtonDelete);

  document.body.append(inputProductIdUpdate);
  document.body.append(inputProductNameUpdate);
  document.body.append(inputProductDescriptionUpdate);
  document.body.append(inputProductPriceUpdate);
  document.body.append(getSpecificProductButtonUpdate);

  document.body.append(inputProductName);
  document.body.append(inputProductDescription);
  document.body.append(inputProductPrice);
  document.body.append(createProductButton);
}

// Hämta alla produkter ////////////////////////////////////

const getAllProductsButton = document.createElement("button");
getAllProductsButton.innerHTML = "Hämta alla produkter";
getAllProductsButton.addEventListener(
  "click",
  async () => await getAllProducts()
);

async function getAllProducts() {
  const products = await makeRequest("/api", "GET");
  showAllProducts();
  console.log(products);
  return products;
}

// Hämta en specifik produkt ////////////////////////////////////

const inputProductId = document.createElement("input");
inputProductId.placeholder = "Id";

const getSpecificProductButton = document.createElement("button");
getSpecificProductButton.innerHTML = "Hämta en specifik produkt";

getSpecificProductButton.addEventListener(
  "click",
  async () => await getSpecificProduct(inputProductId.value)
);

async function getSpecificProduct(id) {
  
  const products = await makeRequest("/api", "GET");
  const product = await makeRequest("/api/products/" + id, "GET");
  inputProductId.value = "";

  var found = false;
  for(var i = 0; i < products.length; i++) {
      if (products[i].id == id) {
          found = true;
          break;
      }
  }

  if (!found) {
    alert(JSON.stringify(product))
  } else {
    showSpecificProduct(id);
    return product;
  }
}

async function showSpecificProduct(id) {
  const product = await makeRequest("/api/products/" + id, "GET");

  let tableBody = document.querySelector("tbody");
  tableBody.innerHTML = "";
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

  tableBody.appendChild(tr);
}

// Ta bort en specifik produkt ////////////////////////////////////

const inputProductIdDelete = document.createElement("input");
inputProductIdDelete.placeholder = "Id";

const getSpecificProductButtonDelete = document.createElement("button");
getSpecificProductButtonDelete.innerHTML = "Ta bort en specifik produkt";

getSpecificProductButtonDelete.addEventListener(
  "click",
  async () => await deleteSpecificProduct(inputProductIdDelete.value)
);

async function deleteSpecificProduct(id) {
  const products = await makeRequest("/api", "GET");
  const product = await makeRequest("/api/products/" + id, "DELETE");
  inputProductIdDelete.value = "";

  var found = false;
  for(var i = 0; i < products.length; i++) {
      if (products[i].id == id) {
          found = true;
          break;
      }
  }

  if (!found) {
    alert(JSON.stringify(product))
  } else {
    showAllProducts();
    return product;
  }
}

// Uppdatera en specifik produkt ////////////////////////////////////

const inputProductIdUpdate = document.createElement("input");
inputProductIdUpdate.placeholder = "Id";

const inputProductNameUpdate = document.createElement("input");
inputProductNameUpdate.placeholder = "Namn";

const inputProductDescriptionUpdate = document.createElement("input");
inputProductDescriptionUpdate.placeholder = "Beskrivning";

const inputProductPriceUpdate = document.createElement("input");
inputProductPriceUpdate.placeholder = "Pris";

const getSpecificProductButtonUpdate = document.createElement("button");
getSpecificProductButtonUpdate.innerHTML = "Uppdatera en specifik produkt";

getSpecificProductButtonUpdate.addEventListener(
  "click",
  async () =>
    await updateSpecificProduct(
      inputProductIdUpdate.value,
      inputProductNameUpdate.value,
      inputProductDescriptionUpdate.value,
      inputProductPriceUpdate.value
    )
);

async function updateSpecificProduct(id, name, description, price) {
  const body = { id: id, name: name, description: description, price: price };
  const products = await makeRequest("/api", "GET");
  const product = await makeRequest("/api/products/" + id, "PUT", body);
  
  inputProductIdUpdate.value = "";
  inputProductNameUpdate.value = "";
  inputProductDescriptionUpdate.value = "";
  inputProductPriceUpdate.value = "";

  var found = false;
  for(var i = 0; i < products.length; i++) {
      if (products[i].id == id) {
          found = true;
          break;
      }
  }

  if (!found) {
    alert(JSON.stringify(product))
  } else {
    showSpecificProduct(id);
    return product;
  }
}

// Skapa en ny produkt ////////////////////////////////////

const inputProductName = document.createElement("input");
inputProductName.placeholder = "Namn";

const inputProductDescription = document.createElement("input");
inputProductDescription.placeholder = "Beskrivning";

const inputProductPrice = document.createElement("input");
inputProductPrice.placeholder = "Pris";

const createProductButton = document.createElement("button");
createProductButton.innerHTML = "Skapa en ny produkt";

createProductButton.addEventListener(
  "click",
  async () =>
    await createNewProduct(
      inputProductName.value,
      inputProductDescription.value,
      inputProductPrice.value
    )
);

async function createNewProduct(name, description, price) {
  const body = { name: name, description: description, price: price };
  const status = await makeRequest("/api", "POST", body);
  showAllProducts();

  inputProductName.value = "";
  inputProductDescription.value = "";
  inputProductPrice.value = "";

  console.log(status);
  return status;
}

//////////////////////////////////////////////////////////////////////////

async function showAllProducts() {
  const products = await makeRequest("/api", "GET");

  let tableBody = document.querySelector("tbody");
  tableBody.innerHTML = "";

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

    tableBody.appendChild(tr);
  });
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

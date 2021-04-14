window.addEventListener("load", main);

function main() {
  document.body.append(
    getAllProductsButton,
    getSpecificProductForm,
    createProductForm
  );
  showAllProducts();
}

// Hämta alla produkter ////////////////////////////////////

const getAllProductsButton = document.createElement("button");
getAllProductsButton.innerHTML = "Hämta alla produkter";
getAllProductsButton.addEventListener(
  "click",
  async () => await getAllProducts()
);

async function getAllProducts() {
  const products = await makeRequest("/api/products/", "GET");
  showAllProducts();
  return products;
}

// Hämta en specifik produkt ////////////////////////////////////

const getSpecificProductForm = document.createElement("form");
const inputProductId = document.createElement("input");
inputProductId.placeholder = "Id";
inputProductId.required = true;

const getSpecificProductButton = document.createElement("button");
getSpecificProductButton.innerHTML = "Hämta en specifik produkt";

getSpecificProductForm.append(inputProductId, getSpecificProductButton);
getSpecificProductForm.addEventListener("submit", (event) => {
  event.preventDefault();
});

getSpecificProductButton.addEventListener(
  "click",
  async () => await getSpecificProduct(inputProductId.value)
);

async function getSpecificProduct(id) {
  const products = await makeRequest("/api/products/", "GET");
  const product = await makeRequest("/api/products/" + id, "GET");
  inputProductId.value = "";

  var found = false;
  for (var i = 0; i < products.length; i++) {
    if (products[i].id == id) {
      found = true;
      break;
    }
  }

  if (!found) {
    alert(JSON.stringify(product));
  } else {
    showSpecificProduct(id);
    return product;
  }
}

function createTableRow(product) {
  let tr = document.createElement("tr");
  let cell1 = document.createElement("td");
  let cell2 = document.createElement("td");
  let cell3 = document.createElement("td");
  let cell4 = document.createElement("td");
  let cell5 = document.createElement("td");
  let cell6 = document.createElement("td");

  cell1.innerHTML = product.id;
  cell2.innerHTML = product.name;
  cell3.innerHTML = product.description;
  cell4.innerHTML = product.price;

  const button1 = document.createElement("button");
  button1.innerHTML = "Redigera";
  button1.addEventListener("click", () => {
    document.body.append(updateForm);
    inputProductIdUpdate.value = product.id;
    inputProductNameUpdate.value = product.name;
    inputProductDescriptionUpdate.value = product.description;
    inputProductPriceUpdate.value = product.price;
  });

  const button2 = document.createElement("button");
  button2.innerHTML = "Ta bort";
  button2.addEventListener(
    "click",
    async () => await deleteSpecificProduct(product.id)
  );

  cell5.append(button1);
  cell6.append(button2);

  tr.append(cell1, cell2, cell3, cell4, cell5, cell6);
  return tr
}

async function showSpecificProduct(id) {
  const product = await makeRequest("/api/products/" + id, "GET");

  let tableBody = document.querySelector("tbody");
  tableBody.innerHTML = "";

  const tr = createTableRow(product)

  tableBody.appendChild(tr);
}

// Ta bort en specifik produkt ////////////////////////////////////

async function deleteSpecificProduct(id) {
  const products = await makeRequest("/api/products/", "GET");
  const product = await makeRequest("/api/products/" + id, "DELETE");

  var found = false;
  for (var i = 0; i < products.length; i++) {
    if (products[i].id == id) {
      found = true;
      break;
    }
  }

  if (!found) {
    alert(JSON.stringify(product));
  } else {
    showAllProducts();
    return product;
  }
}

// Uppdatera en specifik produkt ////////////////////////////////////

const updateForm = document.createElement("form");

const inputProductIdUpdate = document.createElement("input");
inputProductIdUpdate.placeholder = "Id";
inputProductIdUpdate.required = true;
inputProductIdUpdate.disabled = true;

const inputProductNameUpdate = document.createElement("input");
inputProductNameUpdate.placeholder = "Namn";
inputProductNameUpdate.required = true;

const inputProductDescriptionUpdate = document.createElement("input");
inputProductDescriptionUpdate.placeholder = "Beskrivning";
inputProductDescriptionUpdate.required = true;

const inputProductPriceUpdate = document.createElement("input");
inputProductPriceUpdate.placeholder = "Pris";
inputProductPriceUpdate.required = true;

const getSpecificProductButtonUpdate = document.createElement("button");
getSpecificProductButtonUpdate.innerHTML = "Uppdatera produkten";

updateForm.append(
  inputProductIdUpdate,
  inputProductNameUpdate,
  inputProductDescriptionUpdate,
  inputProductPriceUpdate,
  getSpecificProductButtonUpdate
);

updateForm.addEventListener("submit", (event) => {
  event.preventDefault();
});

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
  const products = await makeRequest("/api/products/", "GET");
  const product = await makeRequest("/api/products/" + id, "PUT", body);

  var found = false;
  for (var i = 0; i < products.length; i++) {
    if (products[i].id == id) {
      found = true;
      break;
    }
  }

  if (!found) {
    alert(JSON.stringify(product));
  } else {
    showAllProducts();
    document.body.removeChild(updateForm);
    return product;
  }
}

// Skapa en ny produkt ////////////////////////////////////

const createProductForm = document.createElement("form");

const inputProductName = document.createElement("input");
inputProductName.placeholder = "Namn";
inputProductName.required = true;

const inputProductDescription = document.createElement("input");
inputProductDescription.placeholder = "Beskrivning";
inputProductDescription.required = true;

const inputProductPrice = document.createElement("input");
inputProductPrice.placeholder = "Pris";
inputProductPrice.required = true;

const createProductButton = document.createElement("button");
createProductButton.innerHTML = "Skapa ny produkt";

createProductForm.append(
  inputProductName,
  inputProductDescription,
  inputProductPrice,
  createProductButton
);
createProductForm.addEventListener("submit", (event) => {
  event.preventDefault();
});

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
  const status = await makeRequest("/api/products/", "POST", body);
  showAllProducts();

  inputProductName.value = "";
  inputProductDescription.value = "";
  inputProductPrice.value = "";
  return status;
}

//////////////////////////////////////////////////////////////////////////

async function showAllProducts() {
  const products = await makeRequest("/api/products/", "GET");

  let tableBody = document.querySelector("tbody");
  tableBody.innerHTML = "";

  products.forEach((product) => {
    const tr = createTableRow(product)

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

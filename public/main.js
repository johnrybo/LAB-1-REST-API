window.addEventListener("load", main);

function main() {
  showAllProducts();
  document.body.append(getAllProductsButton);
  document.body.append(getSpecificProductForm);

  // document.body.append(deleteForm);
  // document.body.append(updateForm);
  document.body.append(createForm);
}

// Globala grejer

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

const getSpecificProductForm = document.createElement("form");
const inputProductId = document.createElement("input");
inputProductId.placeholder = "Id";
inputProductId.required = true;

const getSpecificProductButton = document.createElement("button");
getSpecificProductButton.innerHTML = "Hämta en specifik produkt";

getSpecificProductForm.append(inputProductId);
getSpecificProductForm.append(getSpecificProductButton);

getSpecificProductButton.addEventListener(
  "click",
  async () => await getSpecificProduct(inputProductId.value)
);

async function getSpecificProduct(id) {
  const products = await makeRequest("/api", "GET");
  const product = await makeRequest("/api/products/" + id, "GET");
  // inputProductId.value = "";

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

async function showSpecificProduct(id) {
  const product = await makeRequest("/api/products/" + id, "GET");

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

    tr.appendChild(cell1);
    tr.appendChild(cell2);
    tr.appendChild(cell3);
    tr.appendChild(cell4);
    tr.appendChild(cell5);
    tr.appendChild(cell6);

    tableBody.appendChild(tr);
}

// Ta bort en specifik produkt ////////////////////////////////////

const deleteForm = document.createElement("form");

const inputProductIdDelete = document.createElement("input");
inputProductIdDelete.placeholder = "Id";
inputProductIdDelete.required = true;

const getSpecificProductButtonDelete = document.createElement("button");
getSpecificProductButtonDelete.innerHTML = "Ta bort en specifik produkt";

deleteForm.append(inputProductIdDelete);
deleteForm.append(getSpecificProductButtonDelete);

getSpecificProductButtonDelete.addEventListener(
  "click",
  async () => await deleteSpecificProduct(inputProductIdDelete.value)
);

async function deleteSpecificProduct(id) {
  const products = await makeRequest("/api", "GET");
  const product = await makeRequest("/api/products/" + id, "DELETE");
  inputProductIdDelete.value = "";

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
getSpecificProductButtonUpdate.innerHTML = "Uppdatera en specifik produkt";

updateForm.append(inputProductIdUpdate);
updateForm.append(inputProductNameUpdate);
updateForm.append(inputProductDescriptionUpdate);
updateForm.append(inputProductPriceUpdate);
updateForm.append(getSpecificProductButtonUpdate);

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

// Skapa en ny produkt ////////////////////////////////////

const createForm = document.createElement("form");

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
createProductButton.innerHTML = "Skapa en ny produkt";

createForm.append(inputProductName);
createForm.append(inputProductDescription);
createForm.append(inputProductPrice);
createForm.append(createProductButton);

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

    tr.appendChild(cell1);
    tr.appendChild(cell2);
    tr.appendChild(cell3);
    tr.appendChild(cell4);
    tr.appendChild(cell5);
    tr.appendChild(cell6);

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

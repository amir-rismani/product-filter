let products = [];
let filterString = "";

const productsContainer = document.querySelector(".products");
const searchBox = document.querySelector("#search-box");
const categoryButtons = document.querySelectorAll(".category__item");

document.addEventListener("DOMContentLoaded", getProducts);
searchBox.addEventListener("input", (event) => {
  renderProducts(products, event.target.value);
});

categoryButtons.forEach((categoryButton) => {
  categoryButton.addEventListener("click", (event) => {
    console.log(event.target);
    filterString = event.target.dataset.filter;
    renderProducts(products, filterString);
  });
});

function getProducts() {
  axios
    .get("http://localhost:3000/products")
    .then((res) => {
      products = res.data;
      renderProducts(products, filterString);
    })
    .catch((err) => console.log(err));
}

function renderProducts(products, filterString) {
  console.log(products, filterString);
  productsContainer.innerHTML = "";
  products.forEach((product) => {
    if (
      product.ShopProductName.includes(filterString) ||
      product.ShopProductGroup.includes(filterString)
    )
      addProductToDOM(product);
  });
}

function addProductToDOM(product) {
  const article = document.createElement("article");
  article.classList.add("product");
  article.innerHTML = `
    <div class="product__image">
      <img src="${product.AssociationShopProductImageFile_relativeUrl}" alt="${
    product.ShopProductName
  }" />
    </div>
    <div class="product__details">
      <span class="name">${product.ShopProductName}</span>
      <span class="price">${separator(product.SalePrice)}</span>
    </div>
  `;
  productsContainer.appendChild(article);
}

function separator(price) {
  return `${price.toLocaleString("en")} <span class="unit">تومان</span>`;
}

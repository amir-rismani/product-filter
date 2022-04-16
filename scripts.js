let products = [];

document.addEventListener("DOMContentLoaded", getProducts);

function getProducts() {
  axios
    .get("http://localhost:3000/products")
    .then((res) => {
      products = res.data;
    })
    .catch((err) => console.log(err));
}

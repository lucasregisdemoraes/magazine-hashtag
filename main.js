import { addProductToCart, startCart } from "./src/cart";
import { catalogo, convertValueToCurrency, renderProductsElementsOnTheList } from "./src/utilidades"

const productsList = document.querySelector("#products-list")

function createProductElement({ id, brand, name, price, image, womans }, index) {
  let li = document.createElement("li")

  price = convertValueToCurrency(price)

  li.classList.add("group")
  // li.style = `--delay: ${index * 200};`
  console.log(li.style)
  li.innerHTML = `
    <img class="group-hover:scale-110" src="./assets/img/${image}" alt="Imagem de ${name}">
    <p class="brand font-medium">${brand}</p>
    <p class="name">${name}</p>
    <p class="price font-bold">${price}</p>
    <button type="button" data-id="${id}">
      <i class="fa-solid fa-cart-plus group-hover:scale-125 duration-300"></i>
      <span class="sr-only">Adicionar ao carrinho</span>
    </button>
  `
  return li
}

renderProductsElementsOnTheList(catalogo, createProductElement, productsList)


const addCartButtons = document.querySelectorAll("#products-list li button")
addCartButtons.forEach(button => {
  button.addEventListener("click", (e) => addProductToCart(e.currentTarget.dataset.id))
})

startCart()
import { convertValueToCurrency, readOnLocalStorage, renderProductsElementsOnTheList, saveOnLocalStorage, getProductsOnCart } from "./utilidades"

const cart = document.querySelector("#cart")
const cartOpenButton = document.querySelector("#cart-open-button")
const cartCloseButton = document.querySelector("#cart-close-button")
const cartProductsElement = document.querySelector("#cart-products")
const totalValueElement = document.querySelector("#total-value")
const checkoutButton = document.querySelector("#checkout")
let productsIdOnCart = readOnLocalStorage("cart") ?? {}

function openCart() {
    cart.classList.remove("-right-96")
    cart.classList.add("right-0")
}
function closeCart() {
    cart.classList.remove("right-0")
    cart.classList.add("-right-96")
}

export function startCart() {
    cartOpenButton.addEventListener("click", openCart)
    cartCloseButton.addEventListener("click", closeCart)
    renderProductsElementsOnTheList(getProductsOnCart(), createCartProductElement, cartProductsElement)
    updateTotal()
}

function reloadCard() {
    saveOnLocalStorage("cart", productsIdOnCart)
    renderProductsElementsOnTheList(getProductsOnCart(), createCartProductElement, cartProductsElement)
    updateTotal()
}

export function addProductToCart(productId) {
    if (`product-${productId}` in productsIdOnCart === false) {
        productsIdOnCart[`product-${productId}`] = 0
    }
    productsIdOnCart[`product-${productId}`]++
    reloadCard()
}

function decreaseProductFromCart(productId) {
    productsIdOnCart[`product-${productId}`]--
    if (productsIdOnCart[`product-${productId}`] === 0) {
        removeProductFromCart(productId)
    }
    reloadCard()
}

function removeProductFromCart(productId) {
    delete productsIdOnCart[`product-${productId}`]
    reloadCard()
}

function updateTotal() {
    let total = 0
    getProductsOnCart().forEach(product => {
        const quantity = productsIdOnCart[`product-${product.id}`]
        total += product.price * quantity
    })
    totalValueElement.textContent = convertValueToCurrency(total)
}

function createCartProductElement({ id, brand, name, price, image }) {
    let li = document.createElement("li")
    li.dataset.id = id

    const quantity = productsIdOnCart[`product-${id}`]

    price = convertValueToCurrency(price)

    li.innerHTML = `
        <button type="button" data-action="remove" class="remove-button">
          <i class="fa-solid fa-circle-xmark"></i>
          <span class="sr-only">Remover <span class="name">${name}</span> do carrinho</span>
        </button>
        <img src="./assets/img/${image}" alt="Imagem do ${name}">
        <div class="product-info">
          <p class="name">${name}</p>
          <p class="size">Tam. M</p>
          <p class="price">${price}</p>
        </div>
        <div class="quantity">
          <button type="button" data-action="decrease">-</button>
          <span>${quantity}</span>
          <button type="button" data-action="increase">+</button>
        </div>
`
    li.querySelector("button[data-action=decrease]").addEventListener("click", () => decreaseProductFromCart(id))
    li.querySelector("button[data-action=increase]").addEventListener("click", () => addProductToCart(id))
    li.querySelector("button[data-action=remove]").addEventListener("click", () => removeProductFromCart(id))
    return li
}

function goToCheckout() {
    if (Object.keys(productsIdOnCart).length === 0) {
        alert("Antes de finalizar a compra adicione produtos no carrinho")
        return;
    }
    window.location.href = "./checkout.html";
}

checkoutButton.addEventListener("click", goToCheckout)
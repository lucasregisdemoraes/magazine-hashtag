import { convertValueToCurrency, getProductsOnCart, readOnLocalStorage, removeFromLocalStorage, renderProductsElementsOnTheList, saveOnLocalStorage } from "./utilidades"

const productsListElement = document.querySelector("#products-list")
const totalElement = document.querySelector("#total")
const form = document.querySelector("form")

const products = getProductsOnCart()
const productsIdOnCart = readOnLocalStorage("cart")

function createProductElement({ id, brand, name, price, image }) {
    let li = document.createElement("li")

    const quantity = productsIdOnCart[`product-${id}`]

    price = convertValueToCurrency(price)

    li.innerHTML = `
        <img src="./assets/img/${image}" alt="Imagem do ${name}">
        <div class="product-info">
        <p class="name">${name}</p>
          <p class="size">Tam. M</p>
          <p class="price">${price}</p>
        </div>
        <span class="quantity">${quantity}</span>
    `
    return li
}

function getTotal() {
    let total = 0
    products.forEach(product => {
        const quantity = productsIdOnCart[`product-${product.id}`]
        total += product.price * quantity
    })
    return convertValueToCurrency(total)
}

function finishPurchase(e) {
    e.preventDefault()

    if (Object.keys(productsIdOnCart).length === 0) {
        return;
    }

    const currentDate = new Date()
    const currentOrder = {
        date: currentDate,
        order: productsIdOnCart
    }

    const orderHistory = readOnLocalStorage("order-history") ?? []
    const updatedOrderHistory = [currentOrder, ...orderHistory]
    console.log(updatedOrderHistory)
    saveOnLocalStorage("order-history", updatedOrderHistory)
    removeFromLocalStorage("cart")

    window.location.href = window.location.origin + "/orders.html"
}

form.addEventListener("submit", e => finishPurchase(e))

renderProductsElementsOnTheList(products, createProductElement, productsListElement)
totalElement.textContent = getTotal()
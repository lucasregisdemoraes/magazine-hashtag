import { catalogo, readOnLocalStorage, renderProductsElementsOnTheList, convertValueToCurrency } from "./utilidades"

const orderHistory = readOnLocalStorage("order-history") ?? []
const listElement = document.querySelector("#order-history-list")
const emptyMessage = document.querySelector("#empty-message")

function createCartProductElement({ id, brand, name, price, image }) {
    let li = document.createElement("li")

    const order = orderHistory.find(order => order.order[`product-${id}`]).order
    const quantity = order[`product-${id}`]

    price = convertValueToCurrency(price)

    li.innerHTML = `
        <img src="./assets/img/${image}" alt="Imagem do ${name}">
        <div class="product-info">
        <p class="name">${name}</p>
        <p class="size">Tam. M</p>
          <p class="price">${price}</p>
        </div>
        <div class="quantity">
            <span>${quantity}</span>
        </div>
        `
    return li
}

orderHistory.forEach(order => {
    const li = document.createElement("li")
    const products = []
    for (const id in order.order) {
        const product = catalogo.find(product => product.id === id.substring(8, 9))
        products.push(product)
    }

    const productsUl = document.createElement("ul")
    productsUl.classList.add("products-list")

    const date = new Date(order.date).toLocaleDateString("pt-BR", {
        hour: "2-digit",
        minute: "2-digit",
    })
    li.innerHTML = `<p>${date}</p>`

    renderProductsElementsOnTheList(products, createCartProductElement, productsUl)

    li.appendChild(productsUl)
    listElement.appendChild(li)
})

if (orderHistory.length === 0) {
    emptyMessage.classList.remove("hide")
    listElement.classList.add("hide")
}
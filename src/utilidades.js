export const catalogo = [
    {
        id: "1",
        brand: "Zara",
        name: "Camisa Larga com Bolsos",
        price: 70,
        image: "product-1.jpg",
        womans: false,
    },
    {
        id: "2",
        brand: "Zara",
        name: "Casaco Reto com Lã",
        price: 85,
        image: "product-2.jpg",
        womans: true,
    },
    {
        id: "3",
        brand: "Zara",
        name: "Jaqueta com Efeito Camurça",
        price: 60,
        image: "product-3.jpg",
        womans: false,
    },
    {
        id: "4",
        brand: "Zara",
        name: "Sobretudo em Mescla de Lã",
        price: 160,
        image: "product-4.jpg",
        womans: false,
    },
    {
        id: "5",
        brand: "Zara",
        name: "Camisa Larga Acolchoada de Veludo Cotelê",
        price: 110,
        image: "product-5.jpg",
        womans: false,
    },
    {
        id: "6",
        brand: "Zara",
        name: "Casaco de Lã com Botões",
        price: 170,
        image: "product-6.jpg",
        womans: true,
    },
    {
        id: "7",
        brand: "Zara",
        name: "Casaco com Botões",
        price: 75,
        image: "product-7.jpg",
        womans: true,
    },
    {
        id: "8",
        brand: "Zara",
        name: "Colete Comprido com Cinto",
        price: 88,
        image: "product-8.jpg",
        womans: true,
    },
]

export function renderProductsElementsOnTheList(products, elementConstructor, listElement) {
    listElement.innerHTML = ""
    products.forEach((product, index) => {
        listElement.appendChild(elementConstructor(product, index))
    })
}

export function getProductsOnCart() {
    let productsOnCart = []
    const productsIdOnCart = readOnLocalStorage("cart")
    for (const id in productsIdOnCart) {
        const product = catalogo.find(product => product.id === id.substring(8, 9))
        productsOnCart.push(product)
    }
    return productsOnCart
}

export function saveOnLocalStorage(key, value) {
    localStorage.setItem(key, JSON.stringify(value))
}

export function readOnLocalStorage(key) {
    return JSON.parse(localStorage.getItem(key))
}

export function removeFromLocalStorage(key) {
    localStorage.removeItem(key)
}

export function convertValueToCurrency(value) {
    return value.toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL',
    })
}
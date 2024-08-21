import { Header } from "../../components/header/header.js";
import { Product } from "../../components/product/product.js";

window.customElements.define('site-header', Header)
window.customElements.define('site-product', Product)

const productHolderElem = document.querySelector(".new-arrivals__wrapper")

window.addEventListener('DOMContentLoaded', () => {
    displayNewArrivalsProducts()
})

async function getProducts(orderBy) {
    const url = `https://shop-co-18eec-default-rtdb.firebaseio.com/products.json?orderBy="category"&equalTo="${orderBy}"`
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching data:', error);
    }
    
}

async function displayNewArrivalsProducts() {
    try {
        const products = await getProducts('new_arrivals'); 
        for (const id in products) {
            addProductIntoDom(products[id]);
        }
        
    } catch (error) {
        console.error('Error fetching products:', error);
    }
}

function addProductIntoDom(product) {
    const productElem = document.createElement('site-product')
    productElem.setAttribute('product-title',product.name)
    productElem.setAttribute('product-img',product.imageUrl)
    productElem.setAttribute('product-score',product.score)
    productElem.setAttribute('product-final-price',product.price)
    productElem.setAttribute('product-initial-price',product.initialPrice)

    productHolderElem.append(productElem)

}

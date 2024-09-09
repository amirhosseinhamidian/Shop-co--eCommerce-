import { Header } from "../../components/header/header.js";
import { Product } from "../../components/product/product.js";
import { Comment } from "../../components/comment/comment.js";
import { Footer } from "../../components/footer/footer.js";
import { PaginationComponent } from "../../components/pagination/pagination.js";
import { CartItem } from "../../components/cartItem/cartItem.js";

window.customElements.define('site-header', Header)
window.customElements.define('site-product', Product)
window.customElements.define('site-comment', Comment)
window.customElements.define('site-footer', Footer)
window.customElements.define('pagination-component', PaginationComponent)
window.customElements.define('cart-item', CartItem)

const newArrivalsHolder = document.querySelector(".new-arrivals__wrapper")
const topSellingHolder = document.querySelector(".top-selling__wrapper")
const arrowRightElem = document.getElementById("comments__prev")
const arrowLeftElem = document.getElementById("comments__next")
const commentContainerElem = document.querySelector(".comments__wrapper")


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
            newArrivalsHolder.append(generateProductElement(id,products[id]));
        }
        
    } catch (error) {
        console.error('Error fetching products:', error);
    }
}

async function displayTopSellingProducts() {
    try {
        const products = await getProducts('top_selling'); 
        for (const id in products) {
            topSellingHolder.append(generateProductElement(id,products[id]));
        }
        
    } catch (error) {
        console.error('Error fetching products:', error);
    }
}

function generateProductElement(id,product) {
    const productElem = document.createElement('site-product')
    productElem.setAttribute('product-id',id)
    productElem.setAttribute('product-title',product.name)
    productElem.setAttribute('product-img',product.imageUrl)
    productElem.setAttribute('product-score',product.score)
    productElem.setAttribute('product-final-price',product.price)
    productElem.setAttribute('product-initial-price',product.initialPrice)
    return productElem
}

async function getComments() {
    const url = `https://shop-co-18eec-default-rtdb.firebaseio.com/comments.json?orderBy="productId"&equalTo=-1`
    try{
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
    } catch(err) {
        console.error('Error fetching data:', err);
    }
}

async function displayComments() {
    let comments = await getComments()
    for (const key in comments) {
        if (Object.prototype.hasOwnProperty.call(comments, key)) {
            const element = comments[key];
            commentContainerElem.append(generateCommentElement(element))
        }
    }
}

function generateCommentElement(comment){
    const commentElem = document.createElement('site-comment')
    commentElem.setAttribute("comment-title", comment.username)
    commentElem.setAttribute("comment-text", comment.text)
    commentElem.setAttribute("comment-score", comment.score)
    commentElem.classList.add("comment__site-item")
    return commentElem
}
        
function calculateCommentsOnViewPort(screenX){
    console.log(screenX)
    if(screenX > 992){
        return 3;
    } else if(screenX <= 992 && screenX > 578) {
        return 2;
    } else{
        return 1;
    }
}
                
function scrollComments(numberComments,direction) {
    const comments = Array.from(commentContainerElem.children);
    let scrollPosition = commentContainerElem.scrollLeft;

    for (let comment of comments) {
        if (direction === 1) {
            scrollPosition += (comment.clientWidth  + parseInt(getComputedStyle(comment).marginRight) + 5) * numberComments;          
            break;
        } else {
            scrollPosition -= (comment.clientWidth + parseInt(getComputedStyle(comment).marginRight) - 5) * numberComments;
            break;
        }
    }

    commentContainerElem.scrollLeft = scrollPosition;
}

arrowRightElem.addEventListener('click', (event) => {
    scrollComments(calculateCommentsOnViewPort(event.screenX),-1);
})
arrowLeftElem.addEventListener('click', (event) => {
    scrollComments(calculateCommentsOnViewPort(event.screenX),1);
})
window.addEventListener('DOMContentLoaded', () => {
    displayNewArrivalsProducts()
    displayTopSellingProducts()
    displayComments()
})
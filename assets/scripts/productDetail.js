

const tabItems = document.querySelectorAll(".tabs__item")
const productImage = document.querySelector(".product__main-img")
const sizeItems = document.querySelectorAll(".size__item")
const decreaseBtn = document.querySelector(".count__decrease")
const countInput = document.querySelector(".count__text")
const increaseBtn = document.querySelector(".count__increase")
const productImagesWrapper = document.querySelector(".product-images")
const productTitle = document.querySelector(".product__title")
const scoreElem = document.querySelector(".score__stars")
const scoreTextElem = document.querySelector(".score__text")
const priceFinalElem = document.querySelector(".price__final")
const priceInitialElem = document.querySelector(".price__initial")
const priceDiscountElem = document.querySelector(".price__discount")
const productCaption = document.querySelector(".product__caption")
const colorsElem = document.querySelector(".colors")
const sizesElem = document.querySelector(".sizes")
const addToCartElem = document.querySelector(".add__link")
const reviewsContainer = document.querySelector(".reviews__container")
const productLikeWrapper = document.querySelector(".product-like__wrapper")

let count = countInput.value
let productSelectProperties = {}

async function getProductDetails() {
    const url = "https://shop-co-18eec-default-rtdb.firebaseio.com/productDetail.json"
    try {
        const response = await fetch(url);
        if(!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json()
    } catch(err) {
        console.error('Error fetching data:', err);
    }
}

async function getComments(productId) {
    const url = `https://shop-co-18eec-default-rtdb.firebaseio.com/comments.json?orderBy="productId"&equalTo=${productId}`
    try {
        const response = await fetch(url);
        if(!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`)
        }
        return await response.json()
    } catch(err) {
        console.log("Error fetching data:", err)
    }
}

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

async function displayDetailProduct() {
    //image section
    const productDetail = await getProductDetails();
    
    productDetail.images.forEach((image, index) => {
        const imageWrapperElem = document.createElement('div')
        imageWrapperElem.classList.add("product__image")

        const imageElem = document.createElement("img")
        imageElem.classList.add("product-images__img")
        imageElem.setAttribute("src", image)
        imageElem.setAttribute('alt', productDetail.title)
        if(index === 0) {
            imageElem.classList.add("product-images__img--active")
            setAttributesMainImage(image, productDetail.title)
        }
        
        imageElem.addEventListener("click", () => {
            document.querySelector(".product-images__img--active").classList.remove("product-images__img--active")
            imageElem.classList.add("product-images__img--active")
            setAttributesMainImage(image, productDetail.title)
        })
        imageWrapperElem.append(imageElem)
        productImagesWrapper.append(imageWrapperElem)
    })

    //title section
    productTitle.innerHTML = productDetail.title
    
    //score section

    scoreTextElem.innerHTML = productDetail.score + '/<span>5</span>'
    for(let i = 0; i < Math.floor(productDetail.score); i++) {
        const starContainer = document.createElement('div');
        starContainer.style.display = 'flex'
        starContainer.style.alignItems = 'center'
        starContainer.innerHTML = `<svg width="23" height="21" viewBox="0 0 23 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M11.4868 0L14.6852 6.8872L22.2237 7.80085L16.662 12.971L18.1226 20.4229L11.4868 16.731L4.85096 20.4229L6.31155 12.971L0.749813 7.80085L8.2883 6.8872L11.4868 0Z" fill="#FFC633"/>
                                </svg>`;
        scoreElem.append(starContainer);
    }
    if(!Number.isInteger(productDetail.score)){
        const halfStarContainer = document.createElement('div');
        halfStarContainer.style.display = 'flex'
        halfStarContainer.style.alignItems = 'center'
        halfStarContainer.innerHTML = `<svg width="9" height="17" viewBox="0 0 9 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M3.56594 16.9794L8.99998 13.9561V0.255127L6.38077 5.89504L0.20752 6.64322L4.76201 10.8771L3.56594 16.9794Z" fill="#FFC633"/>
                                        </svg>`
        scoreElem.append(halfStarContainer)
    }

    // price section
    priceFinalElem.innerHTML = `$${productDetail.price}`
    if(productDetail.initialPrice !== -1) {
        let discountPercentage = 100 - (Math.ceil((productDetail.price/productDetail.initialPrice) * 100))
        priceInitialElem.innerHTML = `$${productDetail.initialPrice}`
        priceDiscountElem.innerHTML = '-' + discountPercentage + '%'
    } else {
        priceInitialElem.style.display = 'none'
        priceDiscountElem.style.display = 'none'
    }

    // caption section
    productCaption.innerHTML = productDetail.description

    //color section
    productDetail.colors.forEach((color,index) => {
        const colorElem = document.createElement("div")
        colorElem.classList.add("color__item")
        colorElem.style.backgroundColor = color
        if (index === 0) {
            setSelectedColor(colorElem)
            productSelectProperties.color = color;
        }
        colorElem.addEventListener("click", () => {
            document.querySelector(".color__item--selected").classList.remove("color__item--selected")
            document.querySelectorAll(".color__item").forEach((item) => {
                item.innerHTML = ''
            })
            setSelectedColor(colorElem)
            productSelectProperties.color = color;
        })
        colorsElem.append(colorElem)
    })

    //size section
    productDetail.sizes.forEach((size,index) => {
        const sizeElem = document.createElement("a")
        sizeElem.classList.add("size__item")
        sizeElem.classList.add("btn-secondary")
        sizeElem.innerHTML = size
        if (index === 0) {
            sizeElem.classList.add("size__item--active")
            productSelectProperties.size = size
        }
        sizeElem.addEventListener("click", () => {
            document.querySelector(".size__item--active").classList.remove("size__item--active")
            sizeElem.classList.add("size__item--active")
            productSelectProperties.size = size
        })
        sizesElem.append(sizeElem)
    })

    // load comments
    displayComments(productDetail.id)
}

async function displayComments(productId) {
    const comments = await getComments(productId)
    for (const key in comments) {
        if (Object.prototype.hasOwnProperty.call(comments, key)) {
            const element = comments[key];
            reviewsContainer.append(generateCommentElement(element))
        }
    }
}

function generateCommentElement(comment){
    const commentElement = document.createElement('site-comment')
    commentElement.setAttribute("comment-title", comment.username)
    commentElement.setAttribute("comment-text", comment.text)
    commentElement.setAttribute("comment-score", comment.score)
    commentElement.setAttribute("comment-date", comment.date)
    commentElement.classList.add("comment__site-item")
    return commentElement
}

function setAttributesMainImage(image, alt) {
    productImage.setAttribute('src',image)
    productImage.setAttribute('alt',alt)
}

function setSelectedColor(element) {
    element.classList.add("color__item--selected")
    element.innerHTML= `<svg width="14" height="11" viewBox="0 0 14 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M13.5306 2.03063L5.5306 10.0306C5.46092 10.1005 5.37813 10.156 5.28696 10.1939C5.1958 10.2317 5.09806 10.2512 4.99935 10.2512C4.90064 10.2512 4.8029 10.2317 4.71173 10.1939C4.62057 10.156 4.53778 10.1005 4.4681 10.0306L0.968098 6.53063C0.898333 6.46087 0.842993 6.37804 0.805236 6.28689C0.76748 6.19574 0.748047 6.09804 0.748047 5.99938C0.748047 5.90072 0.76748 5.80302 0.805236 5.71187C0.842993 5.62072 0.898333 5.53789 0.968098 5.46813C1.03786 5.39837 1.12069 5.34302 1.21184 5.30527C1.30299 5.26751 1.40069 5.24808 1.49935 5.24808C1.59801 5.24808 1.69571 5.26751 1.78686 5.30527C1.87801 5.34302 1.96083 5.39837 2.0306 5.46813L4.99997 8.4375L12.4693 0.969379C12.6102 0.828483 12.8013 0.749329 13.0006 0.749329C13.1999 0.749329 13.391 0.828483 13.5318 0.969379C13.6727 1.11028 13.7519 1.30137 13.7519 1.50063C13.7519 1.69989 13.6727 1.89098 13.5318 2.03188L13.5306 2.03063Z" fill="white"/>
                        </svg>`
}

async function displayYouLikeProducts() {
    try {
        const products = await getProducts('you_like'); 
        for (const id in products) {
            productLikeWrapper.append(generateProductElement(products[id]));
        }
        
    } catch (error) {
        console.error('Error fetching products:', error);
    }
}

function generateProductElement(product) {
    
    const productElem = document.createElement('site-product')
    productElem.setAttribute('product-title',product.name)
    productElem.setAttribute('product-img',product.imageUrl)
    productElem.setAttribute('product-score',product.score)
    productElem.setAttribute('product-final-price',product.price)
    productElem.setAttribute('product-initial-price',product.initialPrice)
    return productElem
}

tabItems.forEach((tab) => {
    tab.addEventListener("click", () => {
        tabItems.forEach((item) => item.classList.remove("tabs__item--active"));
        tab.classList.add("tabs__item--active")
    })
})

sizeItems.forEach((size) => {
    size.addEventListener("click", () => {
        sizeItems.forEach((item) => {
            item.classList.remove("size__item--active")
            item.classList.add("btn-secondary")
        });
        size.classList.add("size__item--active")
        size.classList.remove("btn-secondary")
    })
})
increaseBtn.addEventListener('click', () => {
    countInput.value = ++count
})
decreaseBtn.addEventListener('click', () => {
    if(countInput.value > 1) {
        countInput.value = --count
    }
})

addToCartElem.addEventListener("click", () => {
    productSelectProperties.count = countInput.value
    console.log(productSelectProperties)
})

window.addEventListener("load", () => {
    displayDetailProduct()
    displayYouLikeProducts()
})

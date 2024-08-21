const template = document.createElement('template');
template.innerHTML = `
    <link rel="stylesheet" href="/assets/styles/reset.css">
    <link rel="stylesheet" href="/assets/styles/base.css">
    <link rel="stylesheet" href="/assets/styles/grid.css">
    <link rel="stylesheet" href="../components/product/product.css">
    <div class="product">
        <img class="product__img">
        <h4 class="product__title"></h4>
        <div class="score">
            <div class="score__stars"></div>
            <p class="score__text"></p>
        </div>
        <div class="pirce">
            <h4 class="price__final"></h4>
            <h4 class="price__initial"></h4>
            <p class="price__discount"></p>
        </div>
    </div>
`

class Product extends HTMLElement {
    constructor () {
        super()

        this.attachShadow({mode:"open"})
        this.shadowRoot.appendChild(template.content.cloneNode(true))
    }
    connectedCallback() {
        let productImgElem = this.shadowRoot.querySelector(".product__img");
        let productTitleElem = this.shadowRoot.querySelector(".product__title");
        let scoreStarsElem = this.shadowRoot.querySelector(".score__stars");
        let scoreTextElem = this.shadowRoot.querySelector(".score__text");
        let productFinalPriceElm = this.shadowRoot.querySelector(".price__final");
        let productInitialPriceElem = this.shadowRoot.querySelector(".price__initial");
        let productDiscountElem = this.shadowRoot.querySelector(".price__discount");

        let imgSrc = this.getAttribute('product-img')
        productImgElem.setAttribute('src', imgSrc)

        let productTitle = this.getAttribute('product-title')
        productTitleElem.innerHTML = productTitle
        productImgElem.setAttribute('alt',productTitle)

        let productScore = Number(this.getAttribute('product-score'))
        scoreTextElem.innerHTML = productScore + '/<span>5</span>'

        for(let i = 0; i < Math.floor(productScore); i++) {
            const starContainer = document.createElement('div');
            starContainer.style.display = 'flex'
            starContainer.style.alignItems = 'center'
            starContainer.innerHTML = `<svg width="23" height="21" viewBox="0 0 23 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M11.4868 0L14.6852 6.8872L22.2237 7.80085L16.662 12.971L18.1226 20.4229L11.4868 16.731L4.85096 20.4229L6.31155 12.971L0.749813 7.80085L8.2883 6.8872L11.4868 0Z" fill="#FFC633"/>
                                    </svg>`;
            scoreStarsElem.append(starContainer)
        }
        if(!Number.isInteger(productScore)){
            const halfStarContainer = document.createElement('div');
            halfStarContainer.style.display = 'flex'
            halfStarContainer.style.alignItems = 'center'
            halfStarContainer.innerHTML = `<svg width="9" height="17" viewBox="0 0 9 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M3.56594 16.9794L8.99998 13.9561V0.255127L6.38077 5.89504L0.20752 6.64322L4.76201 10.8771L3.56594 16.9794Z" fill="#FFC633"/>
                                            </svg>`
            scoreStarsElem.append(halfStarContainer)
        }

        let finalPrice = Number(this.getAttribute('product-final-price'))
        let initialPrice = Number(this.getAttribute('product-initial-price'))

        if(initialPrice !== -1) {
            let discountPrecentage = 100 - (Math.ceil((finalPrice/initialPrice) * 100))
            productInitialPriceElem.innerHTML = '$' + initialPrice
            productDiscountElem.innerHTML = '-' + discountPrecentage + '%'
        } else {
            productInitialPriceElem.style.display = 'none'
            productDiscountElem.style.display = 'none'
        }
        

        productFinalPriceElm.innerHTML = '$' + finalPrice
        
    }
    static observedAttributes () {
        return ['product-title', 'product-img', 'product-score', 'product-final-price', 'product-initial-price']
    }

}

export {Product}
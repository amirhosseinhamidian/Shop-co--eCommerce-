const template = document.createElement('template');
template.innerHTML = `
    <link rel="stylesheet" href="/assets/styles/reset.css" />
    <link rel="stylesheet" href="/assets/styles/fonts.css" />
    <link rel="stylesheet" href="/assets/styles/base.css"/>
    <link rel="stylesheet" href="../components/cartItem/cartItem.css"/>
    <div class="cart-item">
        <img src="/assets/images/product/T-shirt1.png" alt="" class="cart-item__img">
        <div class="cart-item__info">
            <div class="cart-item__head">
                <h4 class="cart-item__title">Gradient Graphic T-shirt</h4>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" class="cart-item__delete">
                    <path d="M20.25 4.5H16.5V3.75C16.5 3.15326 16.2629 2.58097 15.841 2.15901C15.419 1.73705 14.8467 1.5 14.25 1.5H9.75C9.15326 1.5 8.58097 1.73705 8.15901 2.15901C7.73705 2.58097 7.5 3.15326 7.5 3.75V4.5H3.75C3.55109 4.5 3.36032 4.57902 3.21967 4.71967C3.07902 4.86032 3 5.05109 3 5.25C3 5.44891 3.07902 5.63968 3.21967 5.78033C3.36032 5.92098 3.55109 6 3.75 6H4.5V19.5C4.5 19.8978 4.65804 20.2794 4.93934 20.5607C5.22064 20.842 5.60218 21 6 21H18C18.3978 21 18.7794 20.842 19.0607 20.5607C19.342 20.2794 19.5 19.8978 19.5 19.5V6H20.25C20.4489 6 20.6397 5.92098 20.7803 5.78033C20.921 5.63968 21 5.44891 21 5.25C21 5.05109 20.921 4.86032 20.7803 4.71967C20.6397 4.57902 20.4489 4.5 20.25 4.5ZM10.5 15.75C10.5 15.9489 10.421 16.1397 10.2803 16.2803C10.1397 16.421 9.94891 16.5 9.75 16.5C9.55109 16.5 9.36032 16.421 9.21967 16.2803C9.07902 16.1397 9 15.9489 9 15.75V9.75C9 9.55109 9.07902 9.36032 9.21967 9.21967C9.36032 9.07902 9.55109 9 9.75 9C9.94891 9 10.1397 9.07902 10.2803 9.21967C10.421 9.36032 10.5 9.55109 10.5 9.75V15.75ZM15 15.75C15 15.9489 14.921 16.1397 14.7803 16.2803C14.6397 16.421 14.4489 16.5 14.25 16.5C14.0511 16.5 13.8603 16.421 13.7197 16.2803C13.579 16.1397 13.5 15.9489 13.5 15.75V9.75C13.5 9.55109 13.579 9.36032 13.7197 9.21967C13.8603 9.07902 14.0511 9 14.25 9C14.4489 9 14.6397 9.07902 14.7803 9.21967C14.921 9.36032 15 9.55109 15 9.75V15.75ZM15 4.5H9V3.75C9 3.55109 9.07902 3.36032 9.21967 3.21967C9.36032 3.07902 9.55109 3 9.75 3H14.25C14.4489 3 14.6397 3.07902 14.7803 3.21967C14.921 3.36032 15 3.55109 15 3.75V4.5Z" fill="#FF3333"/>
                </svg>
            </div>
            <p class="cart-item__specification" id="cart-item__size">Size: <span>Large</span></p>
            <p class="cart-item__specification" id="cart-item__color">Color: <span>White</span></p>
            <div class="cart-item__price-count">
                <h4 class="cart-item__price">$145</h4>    
                <div class="cart-item__counter btn-secondary">
                    <button class="count__decrease">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" class="count__icon">
                            <path d="M21.375 12C21.375 12.2984 21.2565 12.5845 21.0455 12.7955C20.8345 13.0065 20.5484 13.125 20.25 13.125H3.75C3.45163 13.125 3.16548 13.0065 2.9545 12.7955C2.74353 12.5845 2.625 12.2984 2.625 12C2.625 11.7016 2.74353 11.4155 2.9545 11.2045C3.16548 10.9935 3.45163 10.875 3.75 10.875H20.25C20.5484 10.875 20.8345 10.9935 21.0455 11.2045C21.2565 11.4155 21.375 11.7016 21.375 12Z" fill="black"/>
                        </svg>                                  
                    </button>
                    <input type="number" class="count__text" value="1">
                    <button class="count__increase">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" class="count__icon">
                            <path d="M21.375 12C21.375 12.2984 21.2565 12.5845 21.0455 12.7955C20.8345 13.0065 20.5484 13.125 20.25 13.125H13.125V20.25C13.125 20.5484 13.0065 20.8345 12.7955 21.0455C12.5845 21.2565 12.2984 21.375 12 21.375C11.7016 21.375 11.4155 21.2565 11.2045 21.0455C10.9935 20.8345 10.875 20.5484 10.875 20.25V13.125H3.75C3.45163 13.125 3.16548 13.0065 2.9545 12.7955C2.74353 12.5845 2.625 12.2984 2.625 12C2.625 11.7016 2.74353 11.4155 2.9545 11.2045C3.16548 10.9935 3.45163 10.875 3.75 10.875H10.875V3.75C10.875 3.45163 10.9935 3.16548 11.2045 2.9545C11.4155 2.74353 11.7016 2.625 12 2.625C12.2984 2.625 12.5845 2.74353 12.7955 2.9545C13.0065 3.16548 13.125 3.45163 13.125 3.75V10.875H20.25C20.5484 10.875 20.8345 10.9935 21.0455 11.2045C21.2565 11.4155 21.375 11.7016 21.375 12Z" fill="black"/>
                        </svg>  
                    </button>
                </div>
            </div>
        </div>
    </div>
`

class CartItem extends HTMLElement {
    constructor() {
        super()
        this.attachShadow({mode:"open"})
        this.shadowRoot.appendChild(template.content.cloneNode(true))
    }
    connectedCallback() {
        let cartItemImageElem = this.shadowRoot.querySelector(".cart-item__img");
        let cartItemTitleElem = this.shadowRoot.querySelector(".cart-item__title");
        let cartItemSizeElem = this.shadowRoot.querySelector("#cart-item__size span");
        let cartItemColorElem = this.shadowRoot.querySelector("#cart-item__color span");
        let cartItemPriceElem = this.shadowRoot.querySelector(".cart-item__price");
        let cartItemDecreaseElem = this.shadowRoot.querySelector(".count__decrease");
        let cartItemCountElem = this.shadowRoot.querySelector(".count__text");
        let cartItemIncreaseElem = this.shadowRoot.querySelector(".count__increase");
    }
    static observedAttributes () {
        return ['product-title', 'product-img']
    }
}

export { CartItem }
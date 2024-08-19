const template = document.createElement('template');
template.innerHTML = `
    <link rel="stylesheet" href="../components/Header/header.css">
    <div class="promotion">
        <p class="promotion__text">Sign up and get 20% off to your first order. <a href="#">Sign Up Now</a></p>
        <span class="promotion__close">X</span>
    </div>
`
class Header extends HTMLElement {
    constructor () {
        super()

        this.attachShadow({mode:'open'})
        this.shadowRoot.appendChild(template.content.cloneNode(true))
    }
}

export {Header}
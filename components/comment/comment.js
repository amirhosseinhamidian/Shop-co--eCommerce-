const template = document.createElement('template')
template.innerHTML = `
    <link rel="stylesheet" href="/assets/styles/reset.css">
    <link rel="stylesheet" href="/assets/styles/base.css">
    <link rel="stylesheet" href="/assets/styles/grid.css">
    <link rel="stylesheet" href="../components/comment/comment.css">
    <div class="comment__item">
      <div class="comment__head">
          <div class="score"></div>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" class="comment__menu">
              <path d="M14.625 12C14.625 12.5192 14.471 13.0267 14.1826 13.4584C13.8942 13.8901 13.4842 14.2265 13.0045 14.4252C12.5249 14.6239 11.9971 14.6758 11.4879 14.5746C10.9787 14.4733 10.511 14.2233 10.1438 13.8562C9.77673 13.489 9.52673 13.0213 9.42544 12.5121C9.32415 12.0029 9.37614 11.4751 9.57482 10.9955C9.7735 10.5158 10.11 10.1058 10.5416 9.81739C10.9733 9.52895 11.4808 9.375 12 9.375C12.6962 9.375 13.3639 9.65156 13.8562 10.1438C14.3484 10.6361 14.625 11.3038 14.625 12ZM4.5 9.375C3.98083 9.375 3.47331 9.52895 3.04163 9.81739C2.60995 10.1058 2.2735 10.5158 2.07482 10.9955C1.87614 11.4751 1.82415 12.0029 1.92544 12.5121C2.02673 13.0213 2.27673 13.489 2.64385 13.8562C3.01096 14.2233 3.47869 14.4733 3.98789 14.5746C4.49709 14.6758 5.02489 14.6239 5.50455 14.4252C5.9842 14.2265 6.39417 13.8901 6.68261 13.4584C6.97105 13.0267 7.125 12.5192 7.125 12C7.125 11.3038 6.84844 10.6361 6.35616 10.1438C5.86387 9.65156 5.19619 9.375 4.5 9.375ZM19.5 9.375C18.9808 9.375 18.4733 9.52895 18.0416 9.81739C17.61 10.1058 17.2735 10.5158 17.0748 10.9955C16.8761 11.4751 16.8242 12.0029 16.9254 12.5121C17.0267 13.0213 17.2767 13.489 17.6438 13.8562C18.011 14.2233 18.4787 14.4733 18.9879 14.5746C19.4971 14.6758 20.0249 14.6239 20.5045 14.4252C20.9842 14.2265 21.3942 13.8901 21.6826 13.4584C21.971 13.0267 22.125 12.5192 22.125 12C22.125 11.6553 22.0571 11.3139 21.9252 10.9955C21.7933 10.677 21.5999 10.3876 21.3562 10.1438C21.1124 9.90009 20.823 9.70673 20.5045 9.57482C20.1861 9.4429 19.8447 9.375 19.5 9.375Z" fill="black" fill-opacity="0.4"/>
          </svg>    
      </div>
      <div class="comment__title-wrapper">
        <h5 class="comment__title"></h5>
        <svg width="24" height="25" viewBox="0 0 24 25" fill="none">
          <path
            d="M12 2.8291C10.0716 2.8291 8.18657 3.40093 6.58319 4.47227C4.97982 5.54362 3.73013 7.06636 2.99218 8.84794C2.25422 10.6295 2.06114 12.5899 2.43735 14.4812C2.81355 16.3725 3.74215 18.1098 5.10571 19.4734C6.46928 20.837 8.20656 21.7656 10.0979 22.1418C11.9892 22.518 13.9496 22.3249 15.7312 21.5869C17.5127 20.849 19.0355 19.5993 20.1068 17.9959C21.1782 16.3925 21.75 14.5075 21.75 12.5791C21.7473 9.99408 20.7192 7.51571 18.8913 5.68783C17.0634 3.85994 14.585 2.83183 12 2.8291ZM16.2806 10.8597L11.0306 16.1097C10.961 16.1795 10.8783 16.2348 10.7872 16.2725C10.6962 16.3103 10.5986 16.3297 10.5 16.3297C10.4014 16.3297 10.3038 16.3103 10.2128 16.2725C10.1218 16.2348 10.039 16.1795 9.96938 16.1097L7.71938 13.8597C7.57865 13.719 7.49959 13.5281 7.49959 13.3291C7.49959 13.1301 7.57865 12.9392 7.71938 12.7985C7.86011 12.6577 8.05098 12.5787 8.25 12.5787C8.44903 12.5787 8.6399 12.6577 8.78063 12.7985L10.5 14.5188L15.2194 9.79848C15.2891 9.72879 15.3718 9.67352 15.4628 9.63581C15.5539 9.59809 15.6515 9.57868 15.75 9.57868C15.8486 9.57868 15.9461 9.59809 16.0372 9.63581C16.1282 9.67352 16.2109 9.72879 16.2806 9.79848C16.3503 9.86816 16.4056 9.95088 16.4433 10.0419C16.481 10.133 16.5004 10.2306 16.5004 10.3291C16.5004 10.4276 16.481 10.5252 16.4433 10.6163C16.4056 10.7073 16.3503 10.79 16.2806 10.8597Z"
            fill="#01AB31"
          />
        </svg>
      </div>
      <p class="comment__text"></p>
      <p class="comment__date"></p>
    </div>
`
class Comment extends HTMLElement {
    constructor() {
        super()
        this.attachShadow({mode:'open'})
        this.shadowRoot.appendChild(template.content.cloneNode(true))
    }
    connectedCallback () {
        const scoreElem = this.shadowRoot.querySelector(".score")
        const titleElem = this.shadowRoot.querySelector(".comment__title")
        const textElem = this.shadowRoot.querySelector(".comment__text")
        const dateElem = this.shadowRoot.querySelector(".comment__date")
        const menuElem = this.shadowRoot.querySelector(".comment__menu")

        let titleComment = this.getAttribute('comment-title')
        let textComment = this.getAttribute('comment-text')
        let dateComment = this.getAttribute('comment-date')

        titleElem.innerHTML = titleComment
        textElem.innerHTML = textComment
        if (dateComment) {
          dateElem.innerHTML = `Posted on ${dateComment}`
        } else {
          dateElem.style.display = 'none'
          menuElem.style.display = 'none'
        }

        let commentScore = Number(this.getAttribute('comment-score'))        

        for(let i = 0; i < Math.floor(commentScore); i++) {
            const starContainer = document.createElement('div');
            starContainer.style.display = 'flex'
            starContainer.style.alignItems = 'center'
            starContainer.innerHTML = `<svg width="23" height="21" viewBox="0 0 23 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M11.4868 0L14.6852 6.8872L22.2237 7.80085L16.662 12.971L18.1226 20.4229L11.4868 16.731L4.85096 20.4229L6.31155 12.971L0.749813 7.80085L8.2883 6.8872L11.4868 0Z" fill="#FFC633"/>
                                      </svg>`;
            scoreElem.append(starContainer)
        }
        if(!Number.isInteger(commentScore)){
            const halfStarContainer = document.createElement('div');
            halfStarContainer.style.display = 'flex'
            halfStarContainer.style.alignItems = 'center'
            halfStarContainer.innerHTML = `<svg width="9" height="17" viewBox="0 0 9 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M3.56594 16.9794L8.99998 13.9561V0.255127L6.38077 5.89504L0.20752 6.64322L4.76201 10.8771L3.56594 16.9794Z" fill="#FFC633"/>
                                            </svg>`
            scoreElem.append(halfStarContainer)
        }
    }

    static observedAttributes () {
        return ['comment-title', 'comment-text', 'comment-score', 'comment-date']
    }
}

export {Comment}
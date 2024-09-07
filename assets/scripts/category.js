const rangeSlider_min = 30;
const rangeSlider_max = 60;
const filterColorsList = ["#00C12B","#F50606", "#F5DD06", "#F57906", "#06CAF5", "#063AF5", "#7D06F5", "#F506A4", "#FFFFFF", "#000000"]
const filterSizesList = ["XX-Small", "X-Small", "Small", "Medium", "Large", "X-Large", "XX-Large", "3X-Large", "4X-Large"]

const colorHolder = document.querySelectorAll(".colors__holder")
const sizeHolder = document.querySelectorAll(".sizes__holder")
const productsHolder = document.querySelector(".products__holder")
const filterBtn = document.querySelector(".products__filter-icon")
const filterCloseBtn = document.querySelector(".filter__close")
const filterMobileHolder = document.querySelector(".filters-mobile")
const filterMobileContent = document.querySelector(".filters-mobile__wrapper")
const filterMobileApply = document.querySelector(".filter--mobile__apply")


function priceRangeSliderHandler() {
    document.querySelectorAll('#RangeSlider .range-slider-val-left').forEach(item => {
        item.style.width = `${rangeSlider_min + (100 - rangeSlider_max)}%`;
    })
    document.querySelectorAll('#RangeSlider .range-slider-val-right').forEach(item => {
        item.style.width = `${rangeSlider_min + (100 - rangeSlider_max)}%`;
    })
    
    document.querySelectorAll('#RangeSlider .range-slider-val-range').forEach(item =>{
        item.style.left = `${rangeSlider_min}%`;
    })
    document.querySelectorAll('#RangeSlider .range-slider-val-range').forEach(item =>{
        item.style.right = `${(100 - rangeSlider_max)}%`;
    })

    document.querySelectorAll('#RangeSlider .range-slider-handle-left').forEach(item =>{
        item.style.left = `${rangeSlider_min}%`;
    })
    document.querySelectorAll('#RangeSlider .range-slider-handle-right').forEach(item =>{
        item.style.left = `${rangeSlider_max}%`;
    })

    document.querySelectorAll('#RangeSlider .range-slider-tooltip-left').forEach(item =>{
        item.style.left = `${rangeSlider_min}%`;
    })
    document.querySelectorAll('#RangeSlider .range-slider-tooltip-right').forEach(item =>{
        item.style.left = `${rangeSlider_max}%`;
    })

    document.querySelectorAll('#RangeSlider .range-slider-tooltip-left .range-slider-tooltip-text').forEach(item =>{
        item.innerText = setRangeValue(rangeSlider_min);
    })
    document.querySelectorAll('#RangeSlider .range-slider-tooltip-right .range-slider-tooltip-text').forEach(item =>{
        item.innerText = setRangeValue(rangeSlider_max);
    })

    document.querySelectorAll('#RangeSlider .range-slider-input-left').forEach(item =>{
        item.value = rangeSlider_min;
    })
    document.querySelectorAll('#RangeSlider .range-slider-input-left').forEach(item =>{
        item.addEventListener( 'input', e => {
            e.target.value = Math.min(e.target.value, e.target.parentNode.childNodes[5].value - 1);
            var value = (100 / ( parseInt(e.target.max) - parseInt(e.target.min) )) * parseInt(e.target.value) - (100 / (parseInt(e.target.max) - parseInt(e.target.min) )) * parseInt(e.target.min);
        
            var children = e.target.parentNode.childNodes[1].childNodes;
            children[1].style.width = `${value}%`;
            children[5].style.left = `${value}%`;
            children[7].style.left = `${value}%`;
            children[11].style.left = `${value}%`;
        
            children[11].childNodes[1].innerHTML = setRangeValue(e.target.value);
        });
    })

document.querySelectorAll('#RangeSlider .range-slider-input-right').forEach(item => {
    item.value = rangeSlider_max;
})
document.querySelectorAll('#RangeSlider .range-slider-input-right').forEach(item => {
    item.addEventListener( 'input', e => {
        e.target.value = Math.max(e.target.value, e.target.parentNode.childNodes[3].value - (-1));
        var value = (100 / ( parseInt(e.target.max) - parseInt(e.target.min) )) * parseInt(e.target.value) - (100 / ( parseInt(e.target.max) - parseInt(e.target.min) )) * parseInt(e.target.min);
    
        var children = e.target.parentNode.childNodes[1].childNodes;
        children[3].style.width = `${100-value}%`;
        children[5].style.right = `${100-value}%`;
        children[9].style.left = `${value}%`;
        children[13].style.left = `${value}%`;
    
        children[13].childNodes[1].innerHTML = setRangeValue(e.target.value);
    });
})

}

function setRangeValue(percentage) {
    let value = 0
    if (percentage <= 50) {
        value = percentage
    } else if (percentage > 50 && percentage <= 90) {
        value = ((percentage - 50) * 5) + 50
    } else {
        value = ((percentage - 90) * 50) + 250
    }
    return '$' + value
}

function colorDisplayHandler() {
    filterColorsList.forEach(color => {
        const circleColorElem = document.createElement("div")
        circleColorElem.classList.add("filter__color-item")
        circleColorElem.style.backgroundColor = color
        circleColorElem.addEventListener("click", () => {
            if(document.querySelector(".filter__color-item--selected")){
                document.querySelector(".filter__color-item--selected").classList.remove("filter__color-item--selected")
                
            } 
            document.querySelectorAll(".filter__color-item").forEach((item) => {
                item.innerHTML = ''
            })        
            setSelectedColor(circleColorElem)
        })
        colorHolder.forEach(item => {
            item.append(circleColorElem)
        })
    })
}

function setSelectedColor(element) {
    element.classList.add("color__item--selected")
    element.innerHTML= `<svg width="14" height="11" viewBox="0 0 14 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M13.5306 2.03063L5.5306 10.0306C5.46092 10.1005 5.37813 10.156 5.28696 10.1939C5.1958 10.2317 5.09806 10.2512 4.99935 10.2512C4.90064 10.2512 4.8029 10.2317 4.71173 10.1939C4.62057 10.156 4.53778 10.1005 4.4681 10.0306L0.968098 6.53063C0.898333 6.46087 0.842993 6.37804 0.805236 6.28689C0.76748 6.19574 0.748047 6.09804 0.748047 5.99938C0.748047 5.90072 0.76748 5.80302 0.805236 5.71187C0.842993 5.62072 0.898333 5.53789 0.968098 5.46813C1.03786 5.39837 1.12069 5.34302 1.21184 5.30527C1.30299 5.26751 1.40069 5.24808 1.49935 5.24808C1.59801 5.24808 1.69571 5.26751 1.78686 5.30527C1.87801 5.34302 1.96083 5.39837 2.0306 5.46813L4.99997 8.4375L12.4693 0.969379C12.6102 0.828483 12.8013 0.749329 13.0006 0.749329C13.1999 0.749329 13.391 0.828483 13.5318 0.969379C13.6727 1.11028 13.7519 1.30137 13.7519 1.50063C13.7519 1.69989 13.6727 1.89098 13.5318 2.03188L13.5306 2.03063Z" fill="white"/>
                        </svg>`
}

function sizeDisplayHandler() {
    filterSizesList.forEach(size => {
        const sizeElem = document.createElement("a")
        sizeElem.classList.add("filter__size-item")
        sizeElem.classList.add("btn-secondary")
        sizeElem.innerHTML = size
        sizeElem.addEventListener("click", () => {
            if(document.querySelector(".filter__size-item--active")){
                document.querySelector(".filter__size-item--active").classList.remove("filter__size-item--active")
            }
            sizeElem.classList.add("filter__size-item--active")
            
        })
        sizeHolder.forEach(item => {
            item.append(sizeElem)
        })
    })
}

async function displayProducts(category) {
    try {
        const products = await getProducts(category); 
        for (const id in products) {
            productsHolder.append(generateProductElement(products[id]));
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

async function getProducts(category) {
    const url = `https://shop-co-18eec-default-rtdb.firebaseio.com/products.json?orderBy="category"&equalTo="${category}"`
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

function hiddenFilterBottomSheet() {
    document.body.style.overflow = 'auto';
    filterMobileContent.style.top = '100rem'
    setTimeout(()=> {
        filterMobileHolder.classList.remove('filters-mobile--active')
    }, 150)
}

window.addEventListener('load', () => {
    priceRangeSliderHandler()
    colorDisplayHandler()
    sizeDisplayHandler()
    displayProducts('casual')
})

filterBtn.addEventListener('click' , () => {
    document.body.style.overflow = 'hidden';
    filterMobileHolder.classList.add('filters-mobile--active')
    setTimeout(()=> {
        filterMobileContent.style.top = '12rem'
    }, 5)
})

filterCloseBtn.addEventListener("click", hiddenFilterBottomSheet)

filterMobileApply.addEventListener("click", hiddenFilterBottomSheet)
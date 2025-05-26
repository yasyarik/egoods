
var Shopify = Shopify || {};
Shopify.money_format = '$';
Shopify.formatMoney = function (cents, format) {
    if (typeof cents == 'string') { cents = cents.replace('.', ''); }
    var value = '';
    var placeholderRegex = /\{\{\s*(\w+)\s*\}\}/;
    var formatString = (format || this.money_format);

    function defaultOption(opt, def) {
        return (typeof opt == 'undefined' ? def : opt);
    }

    function formatWithDelimiters(number, precision, thousands, decimal) {
        precision = defaultOption(precision, 2);
        thousands = defaultOption(thousands, ',');
        decimal = defaultOption(decimal, '.');

        if (isNaN(number) || number == null) { return 0; }

        number = (number / 100.0).toFixed(precision);

        var parts = number.split('.'),
            dollars = parts[0].replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1' + thousands),
            cents = parts[1] ? (decimal + parts[1]) : '';

        return dollars + cents;
    }

    switch (formatString.match(placeholderRegex)[1]) {
        case 'amount':
            value = formatWithDelimiters(cents, 2);
            break;
        case 'amount_no_decimals':
            value = formatWithDelimiters(cents, 0); 
            break;
        case 'amount_with_comma_separator':
            value = formatWithDelimiters(cents, 2, '.', ',');
            break;
        case 'amount_no_decimals_with_comma_separator':
            value = formatWithDelimiters(cents, 0, '.', ',');
            break;
    }

    return formatString.replace(placeholderRegex, value);
};
function miniCartRefresh(openCart) 
{   
    fetch('/cart?view=minicart')
    .then(response => response.text())
        .then((response) => {
            document.querySelector(".js-minicart").innerHTML = response;
            if(openCart)
            {
                miniCart.classList.add('open');
                body.classList.add('cart-open');
            }
            const cartClose = document.querySelector('.js-cart-close');
            if(cartClose)
            {
                cartClose.addEventListener('click', (event) => {
                    event.preventDefault();
                    miniCart.classList.remove('open');
                    body.classList.remove('cart-open');
                });    
            }
            var cartRemoveButtons = document.querySelectorAll('.product__remove_button');
            if(cartRemoveButtons)
            {
                cartRemoveButtons.forEach(function (el, key) {
                    el.addEventListener('click', function (event) {
                        event.preventDefault();
                        var productKey = this.parentElement.parentElement.parentElement.getAttribute("data-key");
                        if(typeof productKey != "undefined" && productKey != null && productKey != "")
                        {
                            miniCartUpdate(productKey, 0, false);
                        }
                    });
                });
            }
            var productQuantityInput = document.querySelectorAll('.minicart__product-grid .minicart__qauntity_inner_wrapper .form-counter__output');
            if(productQuantityInput)
            {
                productQuantityInput.forEach(function (el, key) {
                    el.addEventListener('change', function (event) {
                        var productKey = this.parentElement.parentElement.parentElement.parentElement.getAttribute("data-key");
                        var inputValue = this.value;
                        if(typeof productKey != "undefined" && productKey != null && productKey != "" && typeof inputValue != "undefined")
                        {
                            miniCartUpdate(productKey, inputValue, false);
                        }
                    });
                });
            }
            var productDecrementButton = document.querySelectorAll('.minicart__product-grid .minicart__qauntity_inner_wrapper .form-counter__decrement');
            if(productDecrementButton)
            {
                productDecrementButton.forEach(function (el, key) {
                    el.addEventListener('click', function (event) {
                        event.preventDefault();
                        var quantityInput = this.parentElement.querySelector(".form-counter__output");
                        var inputValue = quantityInput.value;
                        if(typeof inputValue != "undefined")
                        {
                            var totalQuantity = parseInt(inputValue) - 1;
                            if(totalQuantity > 0)
                            {
                                quantityInput.value = totalQuantity;
                                quantityInput.dispatchEvent(new Event('change'));
                            }
                        }
                    });
                });
            }
            var productIncrementButton = document.querySelectorAll('.minicart__product-grid .minicart__qauntity_inner_wrapper .form-counter__increment');
            if(productIncrementButton)
            {
                productIncrementButton.forEach(function (el, key) {
                    el.addEventListener('click', function (event) {
                        event.preventDefault();
                        var quantityInput = this.parentElement.querySelector(".form-counter__output");
                        var inputValue = quantityInput.value;
                        if(typeof inputValue != "undefined")
                        {
                            var totalQuantity = parseInt(inputValue) + 1;
                            if(totalQuantity > 0)
                            {
                                quantityInput.value = totalQuantity;
                                quantityInput.dispatchEvent(new Event('change'));
                            }
                        }
                    });
                });
            }
            var productDecrementButton = document.querySelectorAll('.minicart_related_product-grid .minicart__qauntity_inner_wrapper .form-counter__decrement');
            if(productDecrementButton)
            {
                productDecrementButton.forEach(function (el, key) {
                    el.addEventListener('click', function (event) {
                        event.preventDefault();
                        var quantityInput = this.parentElement.querySelector(".form-counter__output");
                        var inputValue = quantityInput.value;
                        if(typeof inputValue != "undefined")
                        {
                            var totalQuantity = parseInt(inputValue) - 1;
                            if(totalQuantity > 0)
                            {
                                quantityInput.value = totalQuantity;
                            }
                        }
                    });
                });
            }
            var productIncrementButton = document.querySelectorAll('.minicart_related_product-grid .minicart__qauntity_inner_wrapper .form-counter__increment');
            if(productIncrementButton)
            {
                productIncrementButton.forEach(function (el, key) {
                    el.addEventListener('click', function (event) {
                        event.preventDefault();
                        var quantityInput = this.parentElement.querySelector(".form-counter__output");
                        var inputValue = quantityInput.value;
                        if(typeof inputValue != "undefined")
                        {
                            var totalQuantity = parseInt(inputValue) + 1;
                            if(totalQuantity > 0)
                            {
                                quantityInput.value = totalQuantity;
                            }
                        }
                    });
                });
            }
            var relatedProductAddToCart = document.querySelectorAll('.product__related_add_to_cart_wrapper a');
            if(relatedProductAddToCart) 
            {
                relatedProductAddToCart.forEach(function (el, key) {
                    el.addEventListener('click', function (event) {
                        event.preventDefault();
                        var currentId = this.getAttribute("data-variant-id");
                        var currentQuantity = this.parentElement.parentElement.querySelector(".minicart__qauntity_wrapper .form-counter__output").value;
                        if(currentId && currentQuantity)
                        {
                            customMiniCartRelatedProductAddToCart(currentId, currentQuantity, false);    
                        }
                    });
                });
            }
        })
        .catch(err => console.log(aler));
}
function customMiniCartRelatedProductAddToCart(id, quantity, openCart)
{
    let formData = new FormData();
    formData.append('id', id);
    formData.append('quantity', quantity);

    fetch("/cart/add.js",
        {
            body: formData,
            method: "post"
        })
        .then(response => response.json())
        .then((response) => {
            if(typeof response.status != "undefined" && response.status != null)
            {
                alert(response.description);
            }
            else
            {
                if(response.id != "undefined" && response.id != null && response.id != "")
                {
                    ajaxCartCall();
                    miniCartRefresh(openCart);   
                }
            }
        })
        .catch(function(error) {
          alert(error);
        });
}
function miniCartUpdate(productKey, quantity, openCart)
{
    if(typeof productKey != "undefined" && productKey != null && productKey != "" && typeof quantity != "undefined")
    {
        let formData = new FormData();
        formData.append('id', productKey);
        formData.append('quantity', quantity);
        fetch("/cart/change.js",
            {
                body: formData,
                method: "post"
            })
            .then(response => response.json())
            .then((response) => {
                if(typeof response.status != "undefined" && response.status != null)
                {
                    alert(response.description);
                }
                else
                {
                    if(response.token)
                    {
                        ajaxCartCall();
                        miniCartRefresh(openCart);
                    }
                }
            })
            .catch(function(error) {
              alert(error);
            });
    }
}
function ajaxCartCall()
{
    fetch('/cart.js')
    .then(response => response.json())
        .then((response) => {
            if(typeof response.item_count != "undefined" && response.item_count != null && response.item_count !="" && response.item_count > 0)
            {
                if(document.querySelector(".cart-link__bubble"))
                {
                    document.querySelector(".cart-link__bubble").classList.add('cart-link__bubble--visible');
                }
                if(document.querySelector(".header__cart-count"))
                {
                    document.querySelector(".header__cart-count").innerHTML = response.item_count;
                }
            }
            else
            {
                if(document.querySelector(".cart-link__bubble"))
                {
                    document.querySelector(".cart-link__bubble").classList.remove('cart-link__bubble--visible');
                }
                if(document.querySelector(".header__cart-count"))
                {
                    document.querySelector(".header__cart-count").innerHTML = response.item_count;
                }
            }
        })
        .catch(function(error) {
          console.log(error);
        });
}
function ajaxAddToMiniCart(variantId, quantity, openCart, sellingPlanValue)
{
    let formData = new FormData();
    formData.append('id', variantId);
    formData.append('quantity', quantity);
    if(typeof sellingPlanValue != "undefined" && sellingPlanValue != null && sellingPlanValue != "")
    {
        formData.append('selling_plan', sellingPlanValue);
    }
    fetch("/cart/add.js",
        {
            body: formData,
            method: "post"
        })
        .then(response => response.json())
        .then((response) => {
            if(typeof response.status != "undefined" && response.status != null)
            {
                alert(response.description);
            }
            else
            {
                if(response.id)
                {
                    ajaxCartCall();
                    if(openCart)
                    {
                        miniCartRefresh(true);
                    }
                }
            }
        })
        .catch(function(error) {
          alert(error);
        });
}
function multipleAjaxAddToMiniCart(items, openCart)
{
    fetch("/cart/add.js",
        {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify(items)
        })
        .then(response => response.json())
        .then((response) => {
            if(typeof response.status != "undefined" && response.status != null)
            {
                alert(response.description);
            }
            else
            {
                if(response.items)
                {
                    ajaxCartCall();
                    if(openCart)
                    {
                        miniCartRefresh(true);
                    }
                }
            }
        })
        .catch(function(error) {
          alert(error);
        });
}
function ajaxAddToCart(variantId, quantity, openCart, sellingPlanValue)
{
    let formData = new FormData();
    formData.append('id', variantId);
    formData.append('quantity', quantity);
    if(typeof sellingPlanValue != "undefined" && sellingPlanValue != null && sellingPlanValue != "")
    {
        formData.append('selling_plan', sellingPlanValue);
    }
    fetch("/cart/add.js",
        {
            body: formData,
            method: "post"
        })
        .then(response => response.json())
        .then((response) => {
            if(typeof response.status != "undefined" && response.status != null)
            {
                alert(response.description);
            }
            else
            {
                if(response.id)
                {
                    ajaxCartCall();
                    if(openCart)
                    {
                        window.location.href="/cart"
                    }
                }
            }
        })
        .catch(function(error) {
          alert(error);
        });
}
function multipleAjaxAddToCart(items, openCart)
{
    fetch("/cart/add.js",
        {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify(items)
        })
        .then(response => response.json())
        .then((response) => {
            if(typeof response.status != "undefined" && response.status != null)
            {
                alert(response.description);
            }
            else
            {
                if(response.items)
                {
                    ajaxCartCall();
                    if(openCart)
                    {
                        window.location.href="/cart"
                    }
                }
            }
        })
        .catch(function(error) {
          alert(error);
        });
}
function customRelatedProductAddToCart(id, quantity)
{
    let formData = new FormData();
    formData.append('id', id);
    formData.append('quantity', quantity);

    fetch("/cart/add.js",
        {
            body: formData,
            method: "post"
        })
        .then(response => response.json())
        .then((response) => {
            if(typeof response.status != "undefined" && response.status != null)
            {
                alert(response.description);
            }
            else
            {
                if(response.id != "undefined" && response.id != null && response.id != "")
                {
                    if(document.querySelector('.cart__step-2'))
                    {
                        if(document.querySelector('.cart__step-2').offsetParent === null)
                        {
                            window.location.href = "/cart";
                        }
                        else
                        {
                            window.location.href = "/cart?step=suggestions";
                        }
                    }   
                }
            }
        })
        .catch(function(error) {
          alert(error);
        });
}
function customUpdateQuantity(id, quantity)
{
    let formData = new FormData();
    formData.append('id', id);
    formData.append('quantity', quantity);

    fetch("/cart/change.js",
        {
            body: formData,
            method: "post"
        })
        .then(response => response.json())
        .then((response) => {
            if(typeof response.status != "undefined" && response.status != null)
            {
                alert(response.description);
            }
            else
            {
                if(response.token != "undefined" && response.item_count > 0 )
                {
                    if(response.token != "undefined" && response.token != null && response.token != "")
                    {
                        if(document.querySelector('.cart__step-2'))
                        {
                            if(document.querySelector('.cart__step-2').offsetParent === null)
                            {
                                window.location.href = "/cart";
                            }
                            else
                            {
                                window.location.href = "/cart?step=suggestions";
                            }
                        }
                    }    
                }
                else
                {
                    window.location.href = "/cart";
                }
            }
        })
        .catch(function(error) {
          alert(error);
        });
}
var getUrlParameter = function getUrlParameter(sParam) {
    var sPageURL = window.location.search.substring(1),
        sURLVariables = sPageURL.split('&'),
        sParameterName,
        i;

    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');

        if (sParameterName[0] === sParam) {
            return typeof sParameterName[1] === undefined ? true : decodeURIComponent(sParameterName[1]);
        }
    }
    return false;
};
/* counter start ============================== */
    var value,
    quantity = document.getElementsByClassName('form-counter');

    function createBindings(quantityContainer) {
        var quantityAmount = quantityContainer.getElementsByClassName('form-counter__output')[0];
        var increase = quantityContainer.getElementsByClassName('form-counter__increment')[0];
        var decrease = quantityContainer.getElementsByClassName('form-counter__decrement')[0];
        increase.addEventListener('click', function (e) { increaseValue(e, quantityAmount); });
        decrease.addEventListener('click', function (e) { decreaseValue(e, quantityAmount); });
    }

    function counter() {
        for (var i = 0; i < quantity.length; i++ ) {
            createBindings(quantity[i]);
        }
    };

    function increaseValue(event, quantityAmount) {
        value = parseInt(quantityAmount.value, 10);

        value = isNaN(value) ? 1 : value;
        value++;
        quantityAmount.value = value;
        quantityAmount.dispatchEvent(new Event('change'));
    }

    function decreaseValue(event, quantityAmount) {
        value = parseInt(quantityAmount.value, 10);

        value = isNaN(value) ? 1 : value;
        if (value > 1) value--;

        quantityAmount.value = value;
        quantityAmount.dispatchEvent(new Event('change'));
    }
        
    counter();

/* counter END ============================== */


/* accordion */
function initAcc(elem, option){
    document.addEventListener('click', function (e) {
        if (!e.target.matches(elem+' .accordion__header')) return;
        else
        {
            if(!e.target.parentElement.classList.contains('active'))
            {
                if(option==true)
                {
                    var elementList = e.target.parentElement.parentElement.querySelectorAll(elem+' .accordion__item');
                    Array.prototype.forEach.call(elementList, function (e) {
                        e.classList.remove('active');
                    });
                }            
                e.target.parentElement.classList.add('active');
            }
            else
            {
                e.target.parentElement.classList.remove('active');
            }
        }
    });
}

initAcc('.accordion', true);
/* Accordion END ============================== */



/* Search expand Start  ============================== */
var searchIcon = document.getElementById("js-search-icon");
var searchBox = document.getElementById("js-search-toggle");
var searchInput = document.getElementById("js-search-input");
var mainSearchBox = document.getElementById("js-search-box");

searchBox.addEventListener('click', ()=>{
    document.querySelector('body').classList.add("custom-search-open");
    searchInput.focus();
    // mainSearchBox.classList.toggle('active');
});
document.querySelector('.close-search-popup').addEventListener('click', (e)=>{
    document.querySelector('body').classList.remove("custom-search-open");
});
// searchIcon.addEventListener('click', ()=>{
//     mainSearchBox.classList.remove('active');
// });

// document.addEventListener('click', function(event) {
//     var isClickInside = searchBox.contains(event.target);
//     if (isClickInside) {
//         searchInput.focus();
//         //searchBox.classList.add('active');
//         mainSearchBox.classList.add('active');
//     } else {
//         //searchBox.classList.remove('active');
//         mainSearchBox.classList.remove('active');
//     }
// });
/* Search expand END  ============================== */

const select = document.querySelectorAll('.selectBtn');
const option = document.querySelectorAll('.option');
let indexselect = 1;

select.forEach(a => {
    a.addEventListener('click', b => {
        const next = b.target.nextElementSibling;
        next.classList.toggle('toggle');
        next.style.zIndex = indexselect++;
    })
})
option.forEach(a => {
    a.addEventListener('click', b => {
        b.target.parentElement.classList.remove('toggle');
        
        const parent = b.target.closest('.custom-select-dropdown').children[0];
        parent.setAttribute('data-type', b.target.getAttribute('data-type'));
        parent.innerText = b.target.innerText;
    })
})


/* Video modal popup Start ============================== */
var videoModal = document.querySelectorAll('.js-tingle-video-modal');
if(videoModal) {
    videoModal.forEach(function(videoModalItem) {
        videoModalItem.addEventListener('click', function (e) {
            e.preventDefault();
            var x = this.getAttribute("data-modal-id");
            var getVideoModal = document.querySelector('.'+x);
            var getVideoIframe = getVideoModal.querySelector('iframe');
            var videoUrl = getVideoIframe.getAttribute('data-src');
            getVideoIframe.setAttribute('src',videoUrl);
            var modalSurprise = new tingle.modal({
                onClose: function () {
                    modalSurprise.destroy();
                    getVideoIframe.setAttribute('src','');
                }
            });
            modalSurprise.setContent(document.querySelector('.modal--video.'+x).innerHTML); 
            modalSurprise.open();
        });
    })
}
/* Video modal popup END  ============================== */

/* footer accordion Start ============================== */
function footerAcc(element, option1){
    document.addEventListener('click', function (e) {
        if (!e.target.matches(element+' .footer__title')) return;
        else{
            if(!e.target.parentElement.classList.contains('active')){
                if(option1==true){
                    var elementList = document.querySelectorAll(element+' .footer__list');
                    Array.prototype.forEach.call(elementList, function (e) {
                        e.classList.remove('active');
                    });
                }            
                e.target.parentElement.classList.add('active');
            } else{
                e.target.parentElement.classList.remove('active');
            }
        }
    });
}

footerAcc('.footer__block', true);
/* footer accordion END  ============================== */


/* Back to top Start ================================= */

(function () {
    'use strict';

    function trackScroll() {
        var scrolled = window.pageYOffset;
        var coords = document.documentElement.clientHeight;

        if (scrolled > coords) {
            goTopBtn.classList.add('back-to-top--show');
        }
        if (scrolled < coords) {
            goTopBtn.classList.remove('back-to-top--show');
        }
    }

    function backToTop() {
        if (window.pageYOffset > 0) {
            window.scrollBy(0, -80);
            setTimeout(backToTop, 0);
        }
    }

    var goTopBtn = document.querySelector('.back-to-top');

    window.addEventListener('scroll', trackScroll);
    goTopBtn.addEventListener('click', backToTop);
})();
/* Back to top END ================================= */

/* Menu Toggle Start ============================== */
const menuToggle = document.querySelector('.js-header-toggle');
const menu = document.querySelector('.js-header-menu');
const body = document.querySelector('body');
const menuClose = document.querySelector('.js-header-close');

if(menuToggle) {
    menuToggle.addEventListener('click', () => {
        menu.classList.add('open');
        body.classList.add('menu-open');
    });
}

if(menuClose) {
    menuClose.addEventListener('click', () => {
        menu.classList.remove('open');
        body.classList.remove('menu-open');
    });
}
/* submenu first level */
document.addEventListener("DOMContentLoaded", function (event) { // <-- add this wrapper
    var allHeroSlider = document.querySelectorAll('.hero__slider');
    if(allHeroSlider)
    {
      allHeroSlider.forEach(function (el, key) {
        var homePageHeroSliderWrapper = el;
        var homePageHeroSlider = new Flickity( homePageHeroSliderWrapper, {
            cellAlign: 'left',
            contain: true,
            pageDots: false,
            prevNextButtons: false ,
            bgLazyLoad: true
        });
      });
    }
});

/* submenu first level */
document.addEventListener("DOMContentLoaded", function (event) { // <-- add this wrapper
    var element = document.querySelectorAll('.js-header-mm-level-1 > a');

    if (element) {

        element.forEach(function (el, key) {

            el.addEventListener('click', function () {


                el.parentElement.classList.toggle("mm-submenu-open");

                element.forEach(function (ell, els) {
                    if (key !== els) {
                        ell.parentElement.classList.remove('mm-submenu-open');
                    }
                });
            });
        });
    }
});

/* submenu second level */
document.addEventListener("DOMContentLoaded", function (event) { // <-- add this wrapper
    var element = document.querySelectorAll('.js-header-mm-level-2 > a');

    if (element) {

        element.forEach(function (el, key) {

            el.addEventListener('click', function () {


                el.parentElement.classList.toggle("mm-submenu-open");

                element.forEach(function (ell, els) {
                    if (key !== els) {
                        ell.parentElement.classList.remove('mm-submenu-open');
                    }
                });
            });
        });
    }
});

/* close cart outside click */
document.addEventListener('mouseup', function(e) {
    if(menuToggle && menu) {
        if ((!menuToggle.contains(e.target)) && (!menu.contains(e.target))) {
            menu.classList.remove('open');
            body.classList.remove('menu-open');
        }
    }
});
/* Menu Toggle END ============================== */


/* Cart Toggle Start ============================== */
const miniCart = document.querySelector('.js-minicart');
const cartClose = document.querySelector('.js-cart-close');

if(document.querySelector('.js-cart-toggle'))
{
    const cartButton = document.querySelector('.js-cart-toggle');
    cartButton.addEventListener('click', (event) => {
        event.preventDefault();
        miniCartRefresh(true);
    });    
}


if(cartClose)
{
    cartClose.addEventListener('click', (event) => {
        event.preventDefault();
        miniCart.classList.remove('open');
        body.classList.remove('cart-open');
    });    
}

/* close cart outside click */
document.addEventListener('mouseup', function(e) {
    if(document.querySelector('.js-cart-toggle'))
    {
        const cartButton = document.querySelector('.js-cart-toggle');
        if ((!miniCart.contains(e.target)) && (!cartButton.contains(e.target))) {
            miniCart.classList.remove('open');
            body.classList.remove('cart-open');
        }
    }
});
/* Cart Toggle END ============================== */






/* filter sidebar toggle start ======================= */
if(document.querySelector('.js-filter-toggle')) {
    document.querySelector('.js-filter-toggle').onclick = function() {
        document.querySelector('.js-filter-sidebar').classList.toggle('active');
    }
}
/* outside click of filter sidebar hide */
if(document.querySelector('.js-filter-sidebar')) {
    document.addEventListener('mouseup', function(e) {
        if ((!document.querySelector('.js-filter-sidebar').contains(e.target)) && (!document.querySelector('.js-filter-toggle').contains(e.target))) {
            document.querySelector('.js-filter-sidebar').classList.remove('active');
        }
    });
}
/* filter sidebar toggle END ======================= */

/* Range Slider Start =========================== */
if(document.querySelector('#js-range-slider')) {
    const myRangeSlider = ionRangeSlider('#js-range-slider', {
        type: "double",
        min: 0,
        max: 1000,
        from: 200,
        to: 500,
        prefix: "£"
    });
}
/* Range Slider END =========================== */

/* Tabs start ================================= */
var tabTriggerBtns = document.querySelectorAll('.tab li button');

if(document.querySelector('.tab__list')) {
    tabTriggerBtns.forEach(function(tabTriggerBtn, index){
        tabTriggerBtn.addEventListener('click', function(){
            var currentTabData = document.querySelector('.tab__content[data-tab-content="' + this.dataset.tabTrigger + '"]');

            // remove classess
            this.parentElement.parentElement.parentElement.querySelector('.tab__content.active').classList.remove('active');
            this.parentElement.parentElement.parentElement.querySelector('.tab li button.active').classList.remove('active');
            // add classes
            currentTabData.classList.add('active');
            this.classList.add('active');
        });
    });
}
/* Tabs END =================================== */

/* progree bar add width =================================== */
if(document.querySelector('.progress__value')) {
var progressVal = document.querySelectorAll('.progress__value');
    document.addEventListener("DOMContentLoaded", function (event) {
        if(progressVal)
        {
            progressVal.forEach(function(element, index){
                var progressValData = element.getAttribute('data-progress');
                if(progressValData <= 100) {
                    element.style.width = progressValData + '%';
                }
                else 
                {
                    return false();
                }
            });
        }
    });
}
/* progree bar add width END =================================== */


/* Product slider start =================================== */
var singleProductList = document.querySelectorAll('.product__main');
var productMainslider = "";
var productNavslider = "";
if(singleProductList) {
    singleProductList.forEach(function (el, key) {
        var productnav = el.parentElement.parentElement.querySelector('.product__nav');
        var productmain = el;
        var productId = el.parentElement.parentElement.getAttribute('id');

        productMainslider = new Flickity( productmain, {
            cellAlign: 'left',
            contain: true,
            pageDots: false,
            lazyLoad: 1 ,
            cellAlign: "left",
            draggable: false
        });

        productNavslider = new Flickity( productnav, {
            asNavFor: "#"+productId+" .product__main",
            contain: true,
            pageDots: false,
            lazyLoad: 5,
            cellAlign: "left"
        });
    });
}
if (Shopify.designMode) {
    var singleProductListDesignMode = document.querySelectorAll('.product__main');
    if(singleProductListDesignMode) {
        singleProductListDesignMode.forEach(function (el, key) {
            var productnav = el.parentElement.parentElement.querySelector('.product__nav');
            var productmain = el;
            var productId = el.parentElement.parentElement.getAttribute('id');
            productMainslider = new Flickity( productmain, {
                cellAlign: 'left',
                contain: true,
                pageDots: false,
                lazyLoad: 1 ,
                cellAlign: "left",
                draggable: false
            });

            productNavslider = new Flickity( productnav, {
                asNavFor: "#"+productId+" .product__main",
                contain: true,
                pageDots: false,
                lazyLoad: 5,
                cellAlign: "left"
            });
        });
    }
}
/* Product slider END =================================== */

/* custom select box Start =================================== */
const customSelectbox = document.querySelectorAll('.js-select-toggle');
const customSelectboxoption = document.querySelectorAll('.form-select-list__option');
let index = 1;

if(document.querySelector('.js-select-toggle')) {
    customSelectbox.forEach(a => {
        a.addEventListener('click', b => {
            const next = b.target.nextElementSibling;
            next.classList.toggle('active');
            next.parentElement.classList.toggle('active');
        })
    })
    customSelectboxoption.forEach(a => {
        a.addEventListener('click', function (b) {
            b.target.parentElement.classList.remove('active');
            b.target.parentElement.parentElement.classList.remove('active');
            // if(b.target.dataset.type == "red") {
            //     productMainslider.next();
            //     productMainslider.select(4);
            //     productNavslider.next();
            //     productNavslider.select(4); 
            // }
            const parent = b.target.closest('.js-product-color').children[0];
            parent.setAttribute('data-type', b.target.getAttribute('data-type'));
            parent.innerHTML  = b.target.innerHTML;
            var parentRow = b.target.closest('.js-product-color').parentElement.parentElement;
            var productForm = b.target.closest('.js-product-color').parentElement.parentElement.parentElement;
            var productOptionsLists = parentRow.querySelectorAll('.product__options');
            var selectedValue = "";
            if (productOptionsLists) 
            {
                productOptionsLists.forEach(function (el, key) {
                    var hasSelect = el.querySelector('select');
                    var currentValue = "";
                    if(hasSelect)
                    {   
                        currentValue = hasSelect.value;
                    }
                    var customSelectBox = el.querySelector('.form-select--custom');
                    if(customSelectBox)
                    {   
                        currentValue = customSelectBox.querySelector('.js-select-toggle').innerText;
                        
                    }
                    if(currentValue)
                    {
                        if(el.nextElementSibling.classList.contains('product__options'))
                        {
                            selectedValue += currentValue+" / ";
                        }
                        else
                        {
                            selectedValue += currentValue;
                        }
                    }
                });
                if(selectedValue)
                {
                    var productvariantsLists = productForm.querySelector('.product-form__variants');
                    if(productvariantsLists)
                    {
                        for (var option of productvariantsLists.options) {
                            option.removeAttribute("selected");
                        }
                        for (var option of productvariantsLists.options) {
                            var matchAttribute = option.getAttribute("data-match");
                            if(matchAttribute == selectedValue)
                            {
                                var matchAttributeValue = option.getAttribute("value");
                                productvariantsLists.value = matchAttributeValue;
                                option.setAttribute("selected", "selected");
                                productvariantsLists.dispatchEvent(new Event('change'));
                            }
                        }
                    }
                }
            }
        })
    })
    document.addEventListener('mouseup', function(e) {
        if ((!document.querySelector('.js-select-toggle').contains(e.target)) && (!document.querySelector('.product__color-select').contains(e.target))) {
            document.querySelector('.product__color-select').classList.remove('active');
            document.querySelector('.js-product-color').classList.remove('active');
        }
    });
}
/* custom select box END =================================== */

/* Scroll to target Start =================================== */
if(document.querySelector('.js-select-toggle')) {
    document.querySelectorAll('.scrollto').forEach(trigger => {
        trigger.onclick = function(e) {
            e.preventDefault();
            let hash = this.getAttribute('href');
            let target = document.querySelector(hash);
            let headerOffset = 100;
            let elementPosition = target.offsetTop;
            let offsetPosition = elementPosition - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: "smooth"
            });
        };
    });
}
if(document.querySelector('.customScrollTo')) {
    document.querySelectorAll('.customScrollTo').forEach(trigger => {
        trigger.onclick = function(e) {
            e.preventDefault();
            let hash = this.getAttribute('href');
            hash = hash.replace("/", "");
            if(document.querySelector(hash))
            {
                let target = document.querySelector(hash);
                let headerOffset = 100;
                let elementPosition = target.offsetTop;
                let offsetPosition = elementPosition - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });    
            }
            else
            {
                window.location.href=hash;
            }
            
        };
    });
}
/* Scroll to target END ===================================== */


/* Countdown Start =================================== */
if(document.querySelector('.countdown')) {
    var extraMinutes = document.querySelector('.countdown').getAttribute("data-minutes");
    if(extraMinutes)
    {
        var minutesToAdd = parseInt(extraMinutes);
        var currentDate = new Date();
        var futureDate = new Date(currentDate.getTime() + minutesToAdd*60000);
        var tarTime = futureDate.getHours() + ":" + futureDate.getMinutes();
        document.querySelector('.countdown').setAttribute("data-time", tarTime);
        const new_countdown = new countdown({
            target: '.countdown',
            dayWord: 'Days',
            hourWord: 'Hours',
            minWord: ' Minutes',
            secWord: 'Seconds'
        });    
    }
    
}
/* Countdown END ===================================== */

/* Wizard steps start ===================================== */
let stepIndex = 0;
const stepElements = document.getElementsByClassName("cart__step");
const breadcrumbsItems = document.getElementsByClassName("cart__breadcrumb-button");
const form = document.getElementById("formCart");

if(breadcrumbsItems) {
    Array.from(breadcrumbsItems).forEach(function (element, index) {
        document.querySelector('.cart__breadcrumb-button').onclick = function(el) {
            var currentTab = document.querySelector('.cart__step[data-tab-content="' + this.dataset.tabTrigger + '"]');

            document.querySelector('.cart__step.active').classList.remove('active');
            document.querySelector('.cart__breadcrumb-button.active').classList.remove('active');
            // add classes
            currentTab.classList.add('active');
            this.classList.add('active');
        }
    });
}
if(document.querySelector('.js-go-to-next')) {
    document.querySelector('.js-go-to-next').onclick = function(el) {
        this.closest('.cart__step').classList.toggle("active");
        this.closest('.cart__step').nextElementSibling.classList.toggle("active");
        var currentTab = this.closest('.cart__step').nextElementSibling.getAttribute('data-tab-content');
        var currentTrigger = document.querySelector('.cart__breadcrumb-button[data-tab-trigger="' + currentTab  + '"]');

        document.querySelector('.cart__breadcrumb-button.active').classList.remove('active');
        currentTrigger.classList.add('active');
    }
}
/* Wizard steps END ===================================== */

/* Contact Validation Start ===================================== */
if(document.getElementById("contactForm")) {
    var pristine;
    window.onload = function () {

        var form = document.getElementById("contactForm");

        pristine = new Pristine(form);

        form.addEventListener('submit', function (e) {
            var valid = pristine.validate();
            e.preventDefault();
        });
    };
}
/* Contact Validation END ===================================== */

/* Login Validation Start ===================================== */
if(document.getElementById("login")) {
    var pristine;
    window.onload = function () {

        var form = document.getElementById("login");

        pristine = new Pristine(form);

        form.addEventListener('submit', function (e) {
            var valid = pristine.validate();
            e.preventDefault();
        });
    };
}
/* login Validation END ===================================== */

/* register Validation Start ===================================== */
if(document.getElementById("register")) {
    var pristine;
    window.onload = function () {

        var form = document.getElementById("register");

        pristine = new Pristine(form);

        form.addEventListener('submit', function (e) {
            var valid = pristine.validate();
            e.preventDefault();
        });
    };
}
/* register Validation END ===================================== */

/* activate account Validation Start ===================================== */
if(document.getElementById("activate_account")) {
    var pristine;
    window.onload = function () {

        var form = document.getElementById("activate_account");

        pristine = new Pristine(form);

        form.addEventListener('submit', function (e) {
            var valid = pristine.validate();
            e.preventDefault();
        });
    };
}
/* activate account Validation END ===================================== */
document.addEventListener('DOMContentLoaded', function() {
    // if(document.querySelector('.expand-add-new-address')) 
    // {
    //     document.querySelector('.expand-add-new-address').addEventListener('click', function (event) {
    //         event.preventDefault();
    //         if(document.querySelector('.AddAddressWrapper')) 
    //         {
    //             if(document.querySelector('.AddAddressWrapper').offsetParent === null)
    //             {
    //                 document.querySelector('.AddAddressWrapper').classList.add("active");
    //             }
    //             else
    //             {
    //                 document.querySelector('.AddAddressWrapper').classList.remove("active");
    //             }
    //         }
    //     });
    // }
    // if(document.querySelector('.reset-address-button')) 
    // {
    //     var element = document.querySelectorAll('.reset-address-button');
    //         element.forEach(function (el, key) {
    //             el.addEventListener('click', function (event) {
    //                 this.closest(".AddAddressWrapper").classList.remove("active");
    //             });
    //         });
    // }
    if(document.querySelector('.page__cart .cart_related_product_item')) 
    {
        if(document.querySelector('.page__cart .cart_related_product_item .related-product-add-to-cart')) 
        {
            var element = document.querySelectorAll('.page__cart .cart_related_product_item .related-product-add-to-cart');
            element.forEach(function (el, key) {
                el.addEventListener('click', function (event) {
                    event.preventDefault();
                    var currentId = this.getAttribute("data-variant-id");
                    var currentQuantity = this.closest('.cart_related_product_item').querySelector('.form-counter__output').value;
                    if(currentId && currentQuantity)
                    {
                        customRelatedProductAddToCart(currentId, currentQuantity);    
                    }
                });
            });
        }
    }
    if(document.querySelector('.page__cart .cart__item')) 
    {
        if(document.querySelector('.page__cart .cart__item .cart__item-remove')) 
        {
            var element = document.querySelectorAll('.page__cart .cart__item-remove');
            element.forEach(function (el, key) {
                el.addEventListener('click', function (event) {
                    event.preventDefault();
                    var currentId = this.closest('.cart__item').getAttribute("data-id");
                    if(currentId)
                    {
                        var currentQuantity = 0;
                        customUpdateQuantity(currentId, currentQuantity);    
                    }
                });
            });
        }
        if(document.querySelector('.page__cart .cart__item .form-counter .quantity__input')) 
        {
            var element = document.querySelectorAll('.page__cart .cart__item .form-counter .quantity__input');
            element.forEach(function (el, key) {
                el.addEventListener('change', function (event) {
                    event.preventDefault();
                    var currentId = this.closest('.cart__item').getAttribute("data-id");
                    if(currentId)
                    {
                        var currentQuantity = this.value;
                        customUpdateQuantity(currentId, currentQuantity);    
                    }
                });
            });
        }
        var openCartSecondStep = getUrlParameter('step');
        if(typeof openCartSecondStep != "undefined" && openCartSecondStep != null && openCartSecondStep != "" && openCartSecondStep == "suggestions")
        {
           document.querySelector(".cart__step-1").classList.remove('active');
           document.querySelector(".cart__step-2").classList.add('active');
           if(document.querySelector(".cart__breadcrumb-button"))
           {
            var element = document.querySelectorAll('.cart__breadcrumb-button');
            element.forEach(function (el, key) {
                el.classList.remove('active');
                var getStepName = el.getAttribute("data-tab-trigger");
                if(getStepName != "undefined" && getStepName != null && getStepName != "" && getStepName == "suggestions")
                {
                    el.classList.add('active');
                }
            });
           }
           document.querySelector(".cart__breadcrumb-button").classList.remove('active');
        }
    }
    if(document.querySelector('.js-cart-toggle')) 
    {
        var allAddToCartButtons = document.querySelectorAll('.product-form .product_atc_button');
        if(allAddToCartButtons)
        {
            allAddToCartButtons.forEach(function (topel, topkey) {
                topel.addEventListener('click', function(event) {
                    event.preventDefault();
                    var productForm = this.parentElement.parentElement.parentElement;
                    var variantId = "";
                    if(productForm.querySelector(".product-form__variants"))
                    {
                        variantId = productForm.querySelector(".product-form__variants").value;
                    }
                    else
                    {
                        variantId = productForm.querySelector(".single_variant_id").value;
                    }
                    var quantity = productForm.querySelector(".product__counter .form-counter__output").value;
                    var OpenCart = true;
                    if(variantId && quantity)
                    {
                        var isMultiple = false;
                        var addOnsElements = productForm.querySelectorAll('.product__add-on');
                        if (addOnsElements) 
                        {
                            addOnsElements.forEach(function (el, key) {
                                if(el.classList.contains('product__add-on--accepted'))
                                {
                                    isMultiple = true;
                                }
                            });
                        }
                        if(isMultiple)
                        {
                            var custom_single_items = {items:[]};
                            if(productForm.querySelector("select[name='selling_plan']"))
                            {
                                var sellingPlanValue = productForm.querySelector("select[name='selling_plan']").value;
                                var single_element = {
                                  id: variantId,
                                  quantity: quantity,
                                  'selling_plan': sellingPlanValue,
                                }
                            }
                            else if(productForm.querySelector("input[name='selling_plan']"))
                            {
                                var sellingPlanValue = productForm.querySelector("select[name='selling_plan']").value;
                                var single_element = {
                                  id: variantId,
                                  quantity: quantity,
                                  'selling_plan': sellingPlanValue,
                                }
                            }
                            else
                            {
                                var single_element = {
                                  id: variantId,
                                  quantity: quantity
                                }
                            }
                            
                            custom_single_items.items.push(single_element);
                            addOnsElements.forEach(function (el, key) {
                                if(el.classList.contains('product__add-on--accepted'))
                                {
                                    var addOnVarianId = el.getAttribute('data-add-on-id');
                                    var addOnVariantQuantity = el.querySelector('.product_add_on_counter input').value;
                                    if(typeof addOnVarianId != "undefined" && addOnVarianId != null && addOnVarianId != "")
                                    {
                                        var single_add_on = {
                                          id: addOnVarianId,
                                          quantity: addOnVariantQuantity
                                        }
                                        custom_single_items.items.push(single_add_on);
                                    }
                                }
                            });
                            multipleAjaxAddToMiniCart(custom_single_items, OpenCart);
                        }
                        else
                        {
                            var sellingPlanValue = "";
                            if(productForm.querySelector("select[name='selling_plan']"))
                            {
                                sellingPlanValue = productForm.querySelector("select[name='selling_plan']").value;
                            }
                            else if(productForm.querySelector("input[name='selling_plan']"))
                            {
                                sellingPlanValue = productForm.querySelector("select[name='selling_plan']").value;
                            }
                            ajaxAddToMiniCart(variantId, quantity, OpenCart, sellingPlanValue);    
                        }
                    }
                });
            });
        }
    }
    else
    {
        var allAddToCartButtons = document.querySelectorAll('.product-form .product_atc_button');
        if(allAddToCartButtons)
        {
            allAddToCartButtons.forEach(function (topel, topkey) {
                topel.addEventListener('click', function(event) {
                    event.preventDefault();
                    var productForm = this.parentElement.parentElement.parentElement;
                    var variantId = "";
                    if(productForm.querySelector(".product-form__variants"))
                    {
                        variantId = productForm.querySelector(".product-form__variants").value;
                    }
                    else
                    {
                        variantId = productForm.querySelector(".single_variant_id").value;
                    }
                    var quantity = productForm.querySelector(".product__counter .form-counter__output").value;
                    var OpenCart = true;
                    if(variantId && quantity)
                    {
                        var isMultiple = false;
                        var addOnsElements = productForm.querySelectorAll('.product__add-on');
                        if (addOnsElements) 
                        {
                            addOnsElements.forEach(function (el, key) {
                                if(el.classList.contains('product__add-on--accepted'))
                                {
                                    isMultiple = true;
                                }
                            });
                        }
                        if(isMultiple)
                        {
                            var custom_single_items = {items:[]};
                            if(productForm.querySelector("select[name='selling_plan']"))
                            {
                                var sellingPlanValue = productForm.querySelector("select[name='selling_plan']").value;
                                var single_element = {
                                  id: variantId,
                                  quantity: quantity,
                                  'selling_plan': sellingPlanValue,
                                }
                            }
                            else if(productForm.querySelector("input[name='selling_plan']"))
                            {
                                var sellingPlanValue = productForm.querySelector("select[name='selling_plan']").value;
                                var single_element = {
                                  id: variantId,
                                  quantity: quantity,
                                  'selling_plan': sellingPlanValue,
                                }
                            }
                            else
                            {
                                var single_element = {
                                  id: variantId,
                                  quantity: quantity
                                }
                            }
                            custom_single_items.items.push(single_element);
                            addOnsElements.forEach(function (el, key) {
                                if(el.classList.contains('product__add-on--accepted'))
                                {
                                    var addOnVarianId = el.getAttribute('data-add-on-id');
                                    var addOnVariantQuantity = el.querySelector('.product_add_on_counter input').value;
                                    if(typeof addOnVarianId != "undefined" && addOnVarianId != null && addOnVarianId != "")
                                    {
                                        var single_add_on = {
                                          id: addOnVarianId,
                                          quantity: addOnVariantQuantity
                                        }
                                        custom_single_items.items.push(single_add_on);
                                    }
                                }
                            });
                            multipleAjaxAddToCart(custom_single_items, OpenCart);
                        }
                        else
                        {
                            var sellingPlanValue = "";
                            if(productForm.querySelector("select[name='selling_plan']"))
                            {
                                sellingPlanValue = productForm.querySelector("select[name='selling_plan']").value;
                            }
                            else if(productForm.querySelector("input[name='selling_plan']"))
                            {
                                sellingPlanValue = productForm.querySelector("select[name='selling_plan']").value;
                            }
                            ajaxAddToCart(variantId, quantity, OpenCart, sellingPlanValue);    
                        }
                    }
                });
            });
        }
    }
    var openCart = getUrlParameter('open_cart');
    if(typeof openCart != "undefined" && openCart != null && openCart != "" && openCart == "true")
    {
        miniCartRefresh(true);
    }
    var productVariantSelect = document.querySelectorAll('.product-form .product-form__variants');
    if(productVariantSelect)
    {
        productVariantSelect.forEach(function (topel, topkey) {
            topel.addEventListener('change', function(event) {
                var current = this;
                if(current.parentElement.parentElement.parentElement.classList.contains('product__detail')) // collection and home page product lists
                {
                    var variantAvailable = this.options[this.selectedIndex].getAttribute('data-available');
                    var variantIsSalePrice = this.options[this.selectedIndex].getAttribute('data-is-sale-price');
                    var variantSalePrice = this.options[this.selectedIndex].getAttribute('data-old-price');
                    var variantOriginalPrice = this.options[this.selectedIndex].getAttribute('data-sale-price');
                    var variantId = this.options[this.selectedIndex].getAttribute("value");
                    var variantOriginalImage = this.options[this.selectedIndex].getAttribute('data-original-image');
                    var productFullBoxWrapper = this.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement;
                    var productBoxWrapper = this.parentElement.parentElement.parentElement.parentElement;
                    var productFormWrapper = this.parentElement.parentElement;
                    var priceHtml = '';
                    if(productFormWrapper.classList.contains('gift-card__form'))
                    {
                        var fromText = productBoxWrapper.querySelector(".product__meta").getAttribute("data-from-text");
                        priceHtml += '<div class="gift-card__price">';
                        if(fromText != "undefined" && fromText != null && fromText != "")
                        {
                            priceHtml += fromText+' ';
                        }
                        priceHtml += '<span class="product__price-original"><b>'+ Shopify.formatMoney(variantOriginalPrice, theme.settings.moneyFormat) +'</b></span>';
                        if(variantIsSalePrice == "true")
                        {
                            priceHtml += '<span class="product__price-sale">'+ Shopify.formatMoney(variantSalePrice, theme.settings.moneyFormat) +'</span>';
                        }
                        priceHtml += '</div>';
                    }
                    else
                    {
                        priceHtml += '<div class="product__price">';
                        if(variantIsSalePrice == "true")
                        {
                            priceHtml += '<span class="product__price-sale">'+ Shopify.formatMoney(variantSalePrice, theme.settings.moneyFormat) +'</span>';
                        }
                        priceHtml += '<span class="product__price-original">'+ Shopify.formatMoney(variantOriginalPrice, theme.settings.moneyFormat) +'</span>';
                        priceHtml += '</div>';
                        if(variantIsSalePrice == "true")
                        {
                            var totalPer = parseInt(variantSalePrice) - parseInt(variantOriginalPrice);
                                totalPer = parseInt(totalPer) * 100;
                                totalPer = parseInt(totalPer) / parseInt(variantSalePrice);
                                totalPer = parseInt(totalPer) * 100;
                                totalPer = totalPer.toFixed(2);
                                totalPer = totalPer.replace(".00", "");
                                totalPer = parseInt(totalPer) / 100;
                            priceHtml += '<span class="badge">Save '+totalPer+'%</span>';
                        }
                    }
                    productBoxWrapper.querySelector(".product__meta").innerHTML = priceHtml;
                    var productUrl = productBoxWrapper.querySelector(".product__image-container a").getAttribute('data-replace-url');
                    var newProducturl = productUrl + '?variant=' + variantId;
                    productBoxWrapper.querySelector(".product__image-container a").setAttribute("href", newProducturl);
                    productBoxWrapper.querySelector(".product__detail a.product__title").setAttribute("href", newProducturl);
                    if(typeof variantOriginalImage != "undefined" && variantOriginalImage != null && variantOriginalImage != "")
                    {
                        productBoxWrapper.querySelector(".product__image-container a img.original-image").setAttribute("src", variantOriginalImage);
                    }
                }
                else
                {
                    var variantAvailable = this.options[this.selectedIndex].getAttribute('data-available');
                    var variantIsSalePrice = this.options[this.selectedIndex].getAttribute('data-is-sale-price');
                    var variantSalePrice = this.options[this.selectedIndex].getAttribute('data-old-price');
                    var variantOriginalPrice = this.options[this.selectedIndex].getAttribute('data-sale-price');
                    var variantImageName = this.options[this.selectedIndex].getAttribute("data-image-name");
                    var variantId = this.options[this.selectedIndex].getAttribute("value");
                    var variantInventory = this.options[this.selectedIndex].getAttribute("data-inventory");
                    var variantInventoryManagement = this.options[this.selectedIndex].getAttribute("data-inventory-management");
                    var productFullBoxWrapper = this.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement;
                    var productBoxWrapper = this.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement;
                    var productFormWrapper = this.parentElement.parentElement.parentElement;
                    var thresoldQuantity = 0;
                    const pickUpAvailability = document.querySelector('pickup-availability');
                    variantInventory = parseInt(variantInventory) + 0;
                    if(productBoxWrapper.querySelector(".product__progress.in-stock"))
                    {
                        thresoldQuantity = productBoxWrapper.querySelector(".product__progress.in-stock").getAttribute("data-low-stock-thresold");
                        var dataOnlyText = productBoxWrapper.querySelector(".product__progress.in-stock").getAttribute("data-only-text");
                        var leftInStockText = productBoxWrapper.querySelector(".product__progress.in-stock").getAttribute("data-left-in-stock-text");
                        var comingSoonText = productBoxWrapper.querySelector(".product__progress.in-stock").getAttribute("data-coming-soon-text");
                    }
                    
                    if(variantAvailable == "true")
                    {
                        if(typeof thresoldQuantity != "undefined" && thresoldQuantity != null && thresoldQuantity != "" && thresoldQuantity != 0)
                        {
                            thresoldQuantity = parseInt(thresoldQuantity) + 0;
                            if(variantInventory <= thresoldQuantity)
                            {
                                if(productFullBoxWrapper.querySelector(".progress__available"))
                                {
                                    productFullBoxWrapper.querySelectorAll(".progress__available").forEach(function (el, key) {
                                        el.classList.add('d-none');    
                                    });
                                    // productBoxWrapper.querySelector(".progress__available").classList.add('d-none');    
                                }
                                if(productFullBoxWrapper.querySelector(".progress__low_stock"))
                                {
                                    productFullBoxWrapper.querySelectorAll(".progress__low_stock").forEach(function (el, key) {
                                        el.classList.remove('d-none');    
                                    });
                                    // productBoxWrapper.querySelector(".progress__low_stock").classList.remove('d-none');    
                                }
                                if(productFullBoxWrapper.querySelector(".progress__out_of_stock"))
                                {
                                    productFullBoxWrapper.querySelectorAll(".progress__out_of_stock").forEach(function (el, key) {
                                        el.classList.add('d-none');
                                    });
                                    // productBoxWrapper.querySelector(".progress__out_of_stock").classList.add('d-none');
                                }
                                if(productFullBoxWrapper.querySelector(".progress__bar"))
                                {
                                    productFullBoxWrapper.querySelectorAll(".progress__bar").forEach(function (el, key) {
                                        el.classList.remove('progress__available');
                                        el.classList.add('progress__low_stock');
                                        el.classList.remove('progress__out_of_stock');
                                        el.classList.remove('d-none');
                                    });
                                    // productBoxWrapper.querySelector(".progress__bar").classList.remove('progress__available');
                                    // productBoxWrapper.querySelector(".progress__bar").classList.add('progress__low_stock');
                                    // productBoxWrapper.querySelector(".progress__bar").classList.remove('progress__out_of_stock');
                                }
                                productFullBoxWrapper.querySelectorAll(".progress__info.progress__low_stock .progress__stock-limit").forEach(function (el, key) {
                                    el.innerHTML = dataOnlyText+" <b>"+variantInventory+"</b> "+leftInStockText;
                                });
                                // productBoxWrapper.querySelector(".progress__info.progress__low_stock .progress__stock-limit").innerHTML = dataOnlyText+" "+variantInventory+" "+leftInStockText;
                            }
                            else
                            {
                                if(productFullBoxWrapper.querySelector(".progress__available"))
                                {
                                    productFullBoxWrapper.querySelectorAll(".progress__available").forEach(function (el, key) {
                                        el.classList.remove('d-none');
                                    });
                                    // productBoxWrapper.querySelector(".progress__available").classList.remove('d-none');    
                                }
                                if(productFullBoxWrapper.querySelector(".progress__low_stock"))
                                {
                                    productFullBoxWrapper.querySelectorAll(".progress__low_stock").forEach(function (el, key) {
                                        el.classList.add('d-none');
                                    });
                                    // productBoxWrapper.querySelector(".progress__low_stock").classList.add('d-none');    
                                }
                                if(productFullBoxWrapper.querySelector(".progress__out_of_stock"))
                                {
                                    productFullBoxWrapper.querySelectorAll(".progress__out_of_stock").forEach(function (el, key) {
                                        el.classList.add('d-none');
                                    });
                                    // productBoxWrapper.querySelector(".progress__out_of_stock").classList.add('d-none');
                                }
                                if(productFullBoxWrapper.querySelector(".progress__bar"))
                                {
                                    productFullBoxWrapper.querySelectorAll(".progress__bar").forEach(function (el, key) {
                                        el.classList.add('progress__available');
                                        el.classList.remove('progress__low_stock');
                                        el.classList.remove('progress__out_of_stock');
                                        el.classList.remove('d-none');
                                    });
                                    // productBoxWrapper.querySelector(".progress__bar").classList.add('progress__available');
                                    // productBoxWrapper.querySelector(".progress__bar").classList.remove('progress__low_stock');
                                    // productBoxWrapper.querySelector(".progress__bar").classList.remove('progress__out_of_stock');
                                }
                                productFullBoxWrapper.querySelectorAll(".progress__info.progress__available .progress__stock-limit").forEach(function (el, key) {
                                    el.innerHTML = dataOnlyText+" <b>"+variantInventory+"</b> "+leftInStockText;
                                });
                                // productBoxWrapper.querySelector(".progress__info.progress__available .progress__stock-limit").innerHTML = dataOnlyText+" "+variantInventory+" "+leftInStockText;
                            }
                        }
                        else
                        {
                            if(productFullBoxWrapper.querySelector(".progress__available"))
                            {
                                productFullBoxWrapper.querySelectorAll(".progress__available").forEach(function (el, key) {
                                    el.classList.remove('d-none');    
                                });
                                // productBoxWrapper.querySelector(".progress__available").classList.remove('d-none');    
                            }
                            if(productFullBoxWrapper.querySelector(".progress__low_stock"))
                            {
                                productFullBoxWrapper.querySelectorAll(".progress__low_stock").forEach(function (el, key) {
                                    el.classList.add('d-none');    
                                });
                                // productBoxWrapper.querySelector(".progress__low_stock").classList.add('d-none');    
                            }
                            if(productFullBoxWrapper.querySelector(".progress__out_of_stock"))
                            {
                                productFullBoxWrapper.querySelectorAll(".progress__out_of_stock").forEach(function (el, key) {
                                    el.classList.add('d-none');
                                });
                                // productBoxWrapper.querySelector(".progress__out_of_stock").classList.add('d-none');
                            }
                            if(productFullBoxWrapper.querySelector(".progress__bar"))
                            {
                                productFullBoxWrapper.querySelectorAll(".progress__bar").forEach(function (el, key) {
                                    el.classList.add('progress__available');
                                    el.classList.remove('progress__low_stock');
                                    el.classList.remove('progress__out_of_stock');
                                    el.classList.remove('d-none');
                                });
                                // productBoxWrapper.querySelector(".progress__bar").classList.add('progress__available');
                                // productBoxWrapper.querySelector(".progress__bar").classList.remove('progress__low_stock');
                                // productBoxWrapper.querySelector(".progress__bar").classList.remove('progress__out_of_stock');
                            }
                            productFullBoxWrapper.querySelectorAll(".progress__info.progress__out_of_stock .progress__stock-limit").forEach(function (el, key) {
                                el.innerHTML = comingSoonText;
                            });
                            // productBoxWrapper.querySelector(".progress__info.progress__out_of_stock .progress__stock-limit").innerHTML = comingSoonText;
                        }
                        
                        productBoxWrapper.querySelector(".product_atc_button").removeAttribute("disabled", "disabled");
                        var buttonText = productBoxWrapper.querySelector(".product_atc_button").getAttribute("data-atc-text");
                        productBoxWrapper.querySelector(".product_atc_button").innerHTML = buttonText;
                        if(pickUpAvailability)
                        {
                            pickUpAvailability.fetchAvailability(variantId);
                        }
                    }
                    else
                    {
                        if(productFullBoxWrapper.querySelector(".progress__available"))
                        {
                            productFullBoxWrapper.querySelectorAll(".progress__available").forEach(function (el, key) {
                                el.classList.add('d-none');
                            });
                            // productBoxWrapper.querySelector(".progress__available").classList.add('d-none');
                        }
                        if(productFullBoxWrapper.querySelector(".progress__low_stock"))
                        {
                            productFullBoxWrapper.querySelectorAll(".progress__low_stock").forEach(function (el, key) {
                                el.classList.add('d-none');  
                            });
                            // productBoxWrapper.querySelector(".progress__low_stock").classList.add('d-none');    
                        }
                        if(productFullBoxWrapper.querySelector(".progress__out_of_stock"))
                        {
                            productFullBoxWrapper.querySelectorAll(".progress__out_of_stock").forEach(function (el, key) {
                                el.classList.remove('d-none');
                            });
                            // productBoxWrapper.querySelector(".progress__out_of_stock").classList.remove('d-none');
                        }
                        if(productFullBoxWrapper.querySelector(".progress__bar"))
                        {
                            productFullBoxWrapper.querySelectorAll(".progress__bar").forEach(function (el, key) {
                                el.classList.remove('progress__available');
                                el.classList.remove('progress__low_stock');
                                el.classList.add('progress__out_of_stock');
                            });
                            // productBoxWrapper.querySelector(".progress__bar").classList.remove('progress__available');
                            // productBoxWrapper.querySelector(".progress__bar").classList.remove('progress__low_stock');
                            // productBoxWrapper.querySelector(".progress__bar").classList.add('progress__out_of_stock');
                        }
                        productBoxWrapper.querySelector(".product_atc_button").setAttribute("disabled", "disabled");
                        var buttonText = productBoxWrapper.querySelector(".product_atc_button").getAttribute("data-oos-text");
                        productBoxWrapper.querySelector(".product_atc_button").innerHTML = buttonText;
                        if(pickUpAvailability)
                        {
                            pickUpAvailability.removeAttribute('available');
                            pickUpAvailability.innerHTML = ''; 
                        }
                    }
                    if(productFullBoxWrapper.querySelector(".product__progress"))
                    {
                        if(variantInventoryManagement == "continue")
                        {
                            productFullBoxWrapper.querySelectorAll(".product__progress").forEach(function (el, key) {
                                el.classList.remove('d-block');
                                el.classList.add('d-none');
                            });
                            var buttonText = productBoxWrapper.querySelector(".product_atc_button").getAttribute("data-pre-order-text");
                            productBoxWrapper.querySelector(".product_atc_button").innerHTML = buttonText;
                            // productBoxWrapper.querySelector(".product__progress").classList.remove('d-block');
                            // productBoxWrapper.querySelector(".product__progress").classList.add('d-none');
                        }
                        else
                        {
                            productFullBoxWrapper.querySelectorAll(".product__progress").forEach(function (el, key) {
                                el.classList.add('d-block');
                                el.classList.remove('d-none');
                             });
                            // productBoxWrapper.querySelector(".product__progress").classList.add('d-block');
                            // productBoxWrapper.querySelector(".product__progress").classList.remove('d-none');

                        }
                    }
                    var priceHtml = '';
                    if(productFormWrapper.classList.contains('gift-card__form'))
                    {
                        var fromText = productBoxWrapper.querySelector(".product__meta").getAttribute("data-from-text");
                        priceHtml += '<div class="gift-card__price">';
                        if(fromText != "undefined" && fromText != null && fromText != "")
                        {
                            priceHtml += fromText+' ';
                        }
                        priceHtml += '<span class="product__price-original"><b>'+ Shopify.formatMoney(variantOriginalPrice, theme.settings.moneyFormat) +'</b></span>';
                        if(variantIsSalePrice == "true")
                        {
                            priceHtml += '<span class="product__price-sale">'+ Shopify.formatMoney(variantSalePrice, theme.settings.moneyFormat) +'</span>';
                        }
                        priceHtml += '</div>';
                    }
                    else
                    {
                        priceHtml += '<div class="product__price">';
                        if(variantIsSalePrice == "true")
                        {
                            priceHtml += '<span class="product__price-sale">'+ Shopify.formatMoney(variantSalePrice, theme.settings.moneyFormat) +'</span>';
                        }
                        priceHtml += '<span class="product__price-original">'+ Shopify.formatMoney(variantOriginalPrice, theme.settings.moneyFormat) +'</span>';
                        priceHtml += '</div>';
                        if(variantIsSalePrice == "true")
                        {
                            var totalPer = parseInt(variantSalePrice) - parseInt(variantOriginalPrice);
                                totalPer = parseInt(totalPer) * 100;
                                totalPer = parseInt(totalPer) / parseInt(variantSalePrice);
                                totalPer = parseInt(totalPer) * 100;
                                totalPer = totalPer.toFixed(2);
                                totalPer = totalPer.replace(".00", "");
                                totalPer = parseInt(totalPer) / 100;
                            priceHtml += '<span class="badge badge--large">Save '+totalPer+'%</span>';
                        }
                    }
                    productFullBoxWrapper.querySelectorAll(".product__meta").forEach(function (el, key) {
                        el.innerHTML = priceHtml;
                    });
                    // productBoxWrapper.querySelector(".product__meta").innerHTML = priceHtml;
                    if(productFullBoxWrapper.classList.contains('product-page'))
                    {
                        var newurl = window.location.protocol + '//' + window.location.host + window.location.pathname + '?variant=' + variantId;
                        window.history.replaceState({path: newurl}, '', newurl);
                        var productImagesCheck = document.querySelectorAll('.product__main-wrapper .product__main .pure-u-1');
                        if(productImagesCheck)
                        {
                            var imageCounter = 0;
                            productImagesCheck.forEach(function (el, key) {
                                var getImageName = el.getAttribute("data-image-name");
                                if(getImageName == variantImageName)
                                {
                                    // productMainslider.next();   
                                    productMainslider.select(imageCounter);
                                    // productNavslider.next();   
                                    productNavslider.select(imageCounter);
                                }
                                imageCounter = parseInt(imageCounter) + 1;
                            });
                        }
                    }
                }
            });    
        });
    }
    var productOptionWrapper = document.querySelectorAll('.product-form .product__options .custom-radio');
    if(productOptionWrapper)
    {   
        if(document.querySelector('.product-form .product__options .custom-radio input'))
        {
            var productOptionRadioWrapper = document.querySelectorAll('.product-form .product__options .custom-radio');
            productOptionRadioWrapper.forEach(function (topel, topkey) {
                var radioSelection = topel.querySelector('input');
                radioSelection.addEventListener('change', function(event) {
                    var current = this;
                    setTimeout(function(){
                        var parentRow = current.parentElement.parentElement.parentElement.parentElement;
                        if(current.parentElement.parentElement.parentElement.parentElement.parentElement.classList.contains('product__detail')) // collection and home page product lists
                        {
                            var productForm = current.parentElement.parentElement.parentElement.parentElement;
                        }
                        else
                        {
                          var productForm = current.parentElement.parentElement.parentElement.parentElement.parentElement;  
                        }
                        var productOptionsLists = parentRow.querySelectorAll('.product__options');
                        
                        var selectedValue = "";
                        if (productOptionsLists) {
                            productOptionsLists.forEach(function (el, key) {
                                var currentValue = "";
                                var radioWrapper = el.querySelectorAll('.custom-radio');
                                radioWrapper.forEach(function (newel, newkey) {
                                    var hasRadio = newel.querySelector('input');
                                    if(hasRadio && hasRadio.checked)
                                    {
                                        currentValue = hasRadio.value;
                                    }
                                });
                                if(currentValue)
                                {
                                    if(el.nextElementSibling.classList.contains('product__options'))
                                    {
                                        selectedValue += currentValue+" / ";
                                    }
                                    else
                                    {
                                        selectedValue += currentValue;
                                    }
                                }
                            });
                            if(selectedValue)
                            {
                                var productvariantsLists = productForm.querySelector('.product-form__variants');
                                if(productvariantsLists)
                                {
                                    var isvariantMatched = false;
                                    for (var option of productvariantsLists.options) {
                                        option.removeAttribute("selected");
                                    }
                                    for (var option of productvariantsLists.options) {
                                        var matchAttribute = option.getAttribute("data-match");
                                        if(matchAttribute == selectedValue)
                                        {
                                            var matchAttributeValue = option.getAttribute("value");
                                            productvariantsLists.value = matchAttributeValue;
                                            if(document.querySelector('.shopify-payment-terms'))
                                            {
                                              document.querySelector('.shopify-payment-terms').setAttribute("variant-id", matchAttributeValue);
                                            }
                                            option.setAttribute("selected", "selected");
                                            isvariantMatched = true;
                                            productvariantsLists.dispatchEvent(new Event('change'));
                                        }
                                    }
                                    if(!isvariantMatched)
                                    {
                                        productForm.querySelector(".product_atc_button").setAttribute("disabled", "disabled");
                                        var buttonText = productForm.querySelector(".product_atc_button").getAttribute("data-oos-text");
                                        productForm.querySelector(".product_atc_button").innerHTML = buttonText;
                                    }
                                }
                            }
                        }
                    }, 500);
                });
            });
        }
    }
    // collection and home page product lists
    if(document.querySelectorAll('.product__grid .pure-u-1-2'))
    {   
        if(document.querySelectorAll('.product__grid .pure-u-1-2 .product-form .product__options .custom-radio'))
        {
            var collectionProductWrapper = document.querySelectorAll('.product__grid .pure-u-1-2');
            collectionProductWrapper.forEach(function (singleProduct, productkey) {
                var productOptionRadioWrapper = singleProduct.querySelectorAll('.product-form .product__options .custom-radio');
                productOptionRadioWrapper.forEach(function (topel, topkey) {
                    var radioSelection = topel.querySelector('input');
                    if(radioSelection)
                    {
                        radioSelection.addEventListener('change', function(event) {
                            var current = this;
                            setTimeout(function(){
                                var productForm = current.parentElement.parentElement.parentElement.parentElement;
                                var productOptionsLists = productForm.querySelectorAll('.product__options');
                                var selectedValue = "";
                                if (productOptionsLists) {
                                    productOptionsLists.forEach(function (el, key) {
                                        var currentValue = "";
                                        var radioWrapper = el.querySelectorAll('.custom-radio');
                                        radioWrapper.forEach(function (newel, newkey) {
                                            var hasRadio = newel.querySelector('input');
                                            if(hasRadio && hasRadio.checked)
                                            {
                                                currentValue = hasRadio.value;
                                            }
                                        });
                                        if(currentValue)
                                        {
                                            if(el.nextElementSibling.classList.contains('product__options'))
                                            {
                                                selectedValue += currentValue+" / ";
                                            }
                                            else
                                            {
                                                selectedValue += currentValue;
                                            }
                                        }
                                    });
                                    if(selectedValue)
                                    {
                                        var productvariantsLists = productForm.querySelector('.product-form__variants');
                                        if(productvariantsLists)
                                        {
                                            for (var option of productvariantsLists.options) {
                                                option.removeAttribute("selected");
                                            }
                                            for (var option of productvariantsLists.options) {
                                                var matchAttribute = option.getAttribute("data-match");
                                                if(matchAttribute == selectedValue)
                                                {
                                                    var matchAttributeValue = option.getAttribute("value");
                                                    productvariantsLists.value = matchAttributeValue;
                                                    option.setAttribute("selected", "selected");
                                                    isvariantMatched = true;
                                                    productvariantsLists.dispatchEvent(new Event('change'));
                                                }
                                            }
                                        }
                                    }
                                }
                            }, 500);
                        });
                    }
                    
                });
            });
        }
    }
    var addOnProductVariantSelect = document.querySelectorAll('.product-form .product-add-on-form__variants');
    if(addOnProductVariantSelect)
    {
        if(document.querySelector('.product-form .product-add-on-form__variants'))
        {
            var addOnProductVariantSelectAll = document.querySelectorAll('.product-form .product-add-on-form__variants');
            addOnProductVariantSelectAll.forEach(function (topel, topkey) {
                topel.addEventListener('change', function(event) {
                    var current = this;
                    var variantAvailable = this.options[this.selectedIndex].getAttribute('data-available');
                    var variantIsSalePrice = this.options[this.selectedIndex].getAttribute('data-is-sale-price');
                    var variantSalePrice = this.options[this.selectedIndex].getAttribute('data-old-price');
                    var variantOriginalPrice = this.options[this.selectedIndex].getAttribute('data-sale-price');
                    var variantImageName = this.options[this.selectedIndex].getAttribute("data-image-name");
                    var variantId = this.options[this.selectedIndex].getAttribute("value");
                    var variantInventory = this.options[this.selectedIndex].getAttribute("data-inventory");
                    var variantInventoryManagement = this.options[this.selectedIndex].getAttribute("data-inventory-management");
                    var productBoxWrapper = this.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement;
                    if(variantAvailable == "true")
                    {
                        productBoxWrapper.querySelector(".product_add_on_error_wrapper").innerHTML = "";
                        productBoxWrapper.parentElement.classList.remove("product__add-on--sold-out");
                    }
                    else
                    {
                        var buttonText = document.querySelector(".product_atc_button").getAttribute("data-oos-text");
                        productBoxWrapper.querySelector(".product_add_on_error_wrapper").innerHTML = "<p>"+buttonText+"</p>";
                        productBoxWrapper.parentElement.classList.remove("product__add-on--accepted");
                        productBoxWrapper.parentElement.classList.add("product__add-on--sold-out");
                    }
                    var priceHtml = '';
                    if(variantIsSalePrice == "true")
                    {
                        priceHtml += '<span class="product__price-sale">'+ Shopify.formatMoney(variantSalePrice, theme.settings.moneyFormat) +'</span>';
                    }
                    priceHtml += '<span class="product__price-original">'+ Shopify.formatMoney(variantOriginalPrice, theme.settings.moneyFormat) +'</span>';
                    priceHtml += '</div>';
                    productBoxWrapper.querySelector(".product__add-on__price").innerHTML = priceHtml;
                    productBoxWrapper.setAttribute("data-add-on-id", variantId);
                });
            });    
        }
    }
    var addOnProductOptionWrapper = document.querySelectorAll('.product-form .product_add_on_variant_wrapper .custom-radio');
    if(addOnProductOptionWrapper)
    {   
        if(document.querySelector('.product-form .product_add_on_variant_wrapper .custom-radio input'))
        {
            var addOnProductOptionRadioWrapper = document.querySelectorAll('.product-form .product_add_on_variant_wrapper .custom-radio');
            addOnProductOptionRadioWrapper.forEach(function (topel, topkey) {
                var radioSelection = topel.querySelector('input');
                radioSelection.addEventListener('change', function(event) {
                    var current = this;
                    setTimeout(function(){
                        var parentRow = current.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement;
                        var productOptionsLists = parentRow.querySelectorAll('.product_add_on_options');
                        
                        var selectedValue = "";
                        if (productOptionsLists) {
                            productOptionsLists.forEach(function (el, key) {
                                var currentValue = "";
                                var radioWrapper = el.querySelectorAll('.custom-radio');
                                radioWrapper.forEach(function (newel, newkey) {
                                    var hasRadio = newel.querySelector('input');
                                    if(hasRadio && hasRadio.checked)
                                    {
                                        currentValue = hasRadio.value;
                                    }
                                });
                                if(currentValue)
                                {
                                    if(el.nextElementSibling.classList.contains('product_add_on_options'))
                                    {
                                        selectedValue += currentValue+" / ";
                                    }
                                    else
                                    {
                                        selectedValue += currentValue;
                                    }
                                }
                            });
                            if(selectedValue)
                            {
                                var productvariantsLists = parentRow.querySelector('.product-add-on-form__variants');
                                if(productvariantsLists)
                                {
                                    var isvariantMatched = false;
                                    for (var option of productvariantsLists.options) {
                                        option.removeAttribute("selected");
                                    }
                                    for (var option of productvariantsLists.options) {
                                        var matchAttribute = option.getAttribute("data-match");
                                        if(matchAttribute == selectedValue)
                                        {
                                            var matchAttributeValue = option.getAttribute("value");
                                            productvariantsLists.value = matchAttributeValue;
                                            option.setAttribute("selected", "selected");
                                            isvariantMatched = true;
                                            productvariantsLists.dispatchEvent(new Event('change'));
                                        }
                                    }
                                    if(!isvariantMatched)
                                    {
                                        var buttonText = document.querySelector(".product_atc_button").getAttribute("data-oos-text");
                                        parentRow.querySelector(".product_add_on_error_wrapper").innerHTML = "<p>"+buttonText+"</p>";
                                        parentRow.classList.remove("product__add-on--accepted");
                                    }
                                }
                            }
                        }
                    }, 500);
                });
            });
        }
    }
});
document.addEventListener("DOMContentLoaded", function (event) {
    if (navigator.userAgent.indexOf('Safari') != -1 && navigator.userAgent.indexOf('Chrome') == -1) 
    {
        document.querySelector('body').classList.add("safari");
    }
    var element = document.querySelectorAll('.scrollTo');
    if (element) 
    {
        element.forEach(function (el, key) {
            el.addEventListener('click', function (event) {
                event.preventDefault();
                var currentElement = this ;
                var currentElementHref = currentElement.getAttribute('href');
                if(document.querySelector(currentElementHref))
                {
                    var offsetTop = document.querySelector(currentElementHref).offsetTop;
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }
    if(document.querySelector('.product-sticky-bar'))
    {
        var headerElement = document.querySelector('header.header');
        var headerElementHeight = headerElement.offsetHeight;
        document.querySelector(".product-sticky-bar").style.top = headerElementHeight+"px";
        var mainProductElement = document.querySelector('.main-product-wrapper');
        var mainProductElementHeight = mainProductElement.offsetHeight;
        var totalHeight = parseInt(headerElementHeight) + parseInt(mainProductElementHeight);
        var viewportWidth = window.innerWidth || document.documentElement.clientWidth;
        if(viewportWidth < 1024)
        {
            document.querySelector('body').style.paddingBottom = "80px";
        }
        document.addEventListener("scroll", function (event) {
            var currentScroll = document.documentElement.scrollTop;
            if(currentScroll > totalHeight)
            {
                document.querySelector(".product-sticky-bar").classList.add('show');
            }
            else
            {
                document.querySelector(".product-sticky-bar").classList.remove('show');
            }
        });
    }
    if(document.querySelector('.blog-post .sidebar'))
    {
        var headerElement = document.querySelector('header.header');
        var headerElementHeight = headerElement.offsetHeight;
        document.querySelector(".blog-post .sidebar").style.top = headerElementHeight+"px";
    }
    if (Shopify.designMode) {
        document.addEventListener("shopify:section:load", function(event) {
            if(document.querySelector('.hero__slider') && document.querySelector('.hero'))
            {
                var heroElement = document.querySelector('.hero');
                var heroHeight = heroElement.getAttribute('data-height');
                var splitHeight = JSON.parse(heroHeight.replace(/'/g, '"').replace(";", ""));
                // replace "data-name" with your data attribute name

                var viewportWidth = window.innerWidth || document.documentElement.clientWidth;
                if (viewportWidth < 576) {
                    heroElement.style.height = (splitHeight[4]);
                }
                else if (viewportWidth > 575 && viewportWidth < 768) {
                    heroElement.style.height = (splitHeight[3]);
                }
                else if (viewportWidth > 767 && viewportWidth < 992) {
                    heroElement.style.height = (splitHeight[2]);
                }
                else if (viewportWidth > 991 && viewportWidth < 1200) {
                    heroElement.style.height = (splitHeight[1]);
                }
                else if (viewportWidth > 1199) {
                    heroElement.style.height = (splitHeight[0]);
                }
                var homePageHeroSliderWrapper = document.querySelector('.hero__slider');
                var homePageHeroSlider = new Flickity( homePageHeroSliderWrapper, {
                    cellAlign: 'left',
                    contain: true,
                    pageDots: false,
                    prevNextButtons: false ,
                    bgLazyLoad: true
                });
            }
        });
    }
    var addOnsElements = document.querySelectorAll('.product__add-on-overlay');
    if (addOnsElements) 
    {
        addOnsElements.forEach(function (el, key) {
            el.addEventListener('click', function (event) {
                event.preventDefault();
                if(event.target.parentElement.classList.contains('product__add-on--sold-out'))
                {
                }
                else
                {
                    if(event.target.parentElement.classList.contains('product__add-on--accepted'))
                    {
                        event.target.parentElement.classList.remove('product__add-on--accepted');
                    }
                    else
                    {
                        event.target.parentElement.classList.add('product__add-on--accepted');
                    }
                }
                
            });
        });
    }
    if(document.querySelectorAll('#product-grid .product'))
    {
        var allProductList = document.querySelectorAll('#product-grid .pure-u-1-2');
        allProductList.forEach(function (el, key) {
            el.querySelector(".product__image").addEventListener('mouseover', function (event) {
                if(this.querySelector(".hover-secondary-image"))
                {
                    this.classList.add("show-second-image");
                }
            });
            el.querySelector(".product__image").addEventListener('mouseout', function (event) {
                if(this.querySelector(".hover-secondary-image"))
                {
                    this.classList.remove("show-second-image");
                }
            });
        });
    }
    var mobileMenuAccordian = document.querySelectorAll('.custom-mobile-menu-single-tab-menu-details-title');
    if(mobileMenuAccordian)
    {
        mobileMenuAccordian.forEach(function (el, key) {
            el.addEventListener('click', function (event) {
                event.preventDefault();
                if(this.parentElement.classList.contains('active'))
                {
                    this.parentElement.classList.remove('active');
                }
                else
                {
                    var allClickable = this.parentElement.parentElement.querySelectorAll(".custom-mobile-menu-single-tab-menu-details");
                    allClickable.forEach(function (innerEl, innerKey) {
                        innerEl.classList.remove('active');
                    });
                    this.parentElement.classList.add('active');
                }
            });
        });
    }
    var mobileMenuTab = document.querySelectorAll('.custom-mobile-menu-tab-title-listings ul li');
    if(mobileMenuTab)
    {
        mobileMenuTab.forEach(function (el, key) {
            el.querySelector('a').addEventListener('click', function (event) {
                event.preventDefault();
                if(this.parentElement.classList.contains('active'))
                {
                    
                }
                else
                {
                    var getTabContentClass = this.getAttribute("href");
                    mobileMenuTab.forEach(function (innerEl, innerKey) {
                        innerEl.classList.remove("active");
                    });
                    event.target.parentElement.classList.add("active");
                    var mobileMenuImages = document.querySelectorAll('.custom-mobile-menu-images-wrapper .custom-mobile-menu-single-image');
                    if(mobileMenuImages)
                    {
                        mobileMenuImages.forEach(function (mobileImagesEl, mobileImagesKey) {
                            mobileImagesEl.classList.remove("active");
                        });
                    }
                    var mobileMenuTabs = document.querySelectorAll('.custom-mobile-menu-tab-content-listings .custom-mobile-menu-single-tab-content');
                    if(mobileMenuTabs)
                    {
                        mobileMenuTabs.forEach(function (mobileImagesEl, mobileImagesKey) {
                            mobileImagesEl.classList.remove("active");
                        });
                    }
                    var getRelatedElement = document.querySelectorAll('.'+getTabContentClass);
                    if(getRelatedElement)
                    {
                        getRelatedElement.forEach(function (relatedEl, relatedKey) {
                            relatedEl.classList.add("active");
                        });
                    }
                }
            });
        });
    }
    var productReviews = document.querySelectorAll('.product__info .spr-summary-starrating .spr-stars');
    if(productReviews) {
        productReviews.forEach(function (el, key) {
            el.addEventListener('click', function (event) {
                event.preventDefault();
                let hash = "#shopify-product-reviews";
                let target = document.querySelector(hash);
                let headerOffset = 100;
                let elementPosition = target.offsetTop;
                let offsetPosition = elementPosition - headerOffset - 100;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });
            });
        });
    }
    var productStickyReviews = document.querySelectorAll('.product-sticky-bar-left .spr-summary-starrating .spr-stars');
    if(productStickyReviews) {
        productStickyReviews.forEach(function (el, key) {
            el.addEventListener('click', function (event) {
                event.preventDefault();
                let hash = "#shopify-product-reviews";
                let target = document.querySelector(hash);
                let headerOffset = 100;
                let elementPosition = target.offsetTop;
                let offsetPosition = elementPosition - headerOffset - 100;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });
            });
        });
    }
    var testimonials = document.querySelectorAll('.testimonial__slider.arrow__rounded .testimonial__slider-item');
    if(testimonials)
    {
        var heightsArray = []; 
        testimonials.forEach(function (el, key) {
            if(el.querySelector(".testimonial__slider-body .testimonial__info"))
            {
                el.querySelector(".testimonial__slider-body .testimonial__info").removeAttribute("style");
                var getElementHeight = el.querySelector(".testimonial__slider-body .testimonial__info").offsetHeight;
                heightsArray.push(getElementHeight);
            }
        });
        if(heightsArray.length > 0)
        {
            var getHighestValue = Math.max(...heightsArray);
            setTimeout(function(){
                testimonials.forEach(function (el, key) {
                    if(el.querySelector(".testimonial__slider-body .testimonial__info"))
                    {
                        el.querySelector(".testimonial__slider-body .testimonial__info").style.height = getHighestValue+"px";
                    }
                });
            },500); 
        }
        var heightsTitleHeightArray = []; 
        testimonials.forEach(function (el, key) {
            if(el.querySelector(".testimonial__slider-body h4"))
            {
                el.querySelector(".testimonial__slider-body h4").removeAttribute("style");
                var getElementHeight = el.querySelector(".testimonial__slider-body h4").offsetHeight;
                heightsTitleHeightArray.push(getElementHeight);
            }
        });
        if(heightsTitleHeightArray.length > 0)
        {
            var getTitleHighestValue = Math.max(...heightsTitleHeightArray);
            setTimeout(function(){
                testimonials.forEach(function (el, key) {
                    if(el.querySelector(".testimonial__slider-body h4"))
                    {
                        el.querySelector(".testimonial__slider-body h4").style.height = getTitleHighestValue+"px";
                    }
                });
            },800); 
        }
    }
    if(document.querySelector('.header__action-region-selector .region-selector'))
    {
        document.querySelector('.header__action-region-selector .region-selector').addEventListener('change', function (event) {
            this.parentElement.submit();
        });
    }
    if(document.querySelector('.header__action-region-selector .language-selector'))
    {
        document.querySelector('.header__action-region-selector .language-selector').addEventListener('change', function (event) {
            this.parentElement.submit();
        });
    }
    if(document.querySelector('.custom-mobile-region-selector .mobile-region-selector'))
    {
        document.querySelector('.custom-mobile-region-selector .mobile-region-selector').addEventListener('change', function (event) {
            this.parentElement.submit();
        });
    }
    if(document.querySelector('.custom-mobile-language-selector .mobile-language-selector'))
    {
        document.querySelector('.custom-mobile-language-selector .mobile-language-selector').addEventListener('change', function (event) {
            this.parentElement.submit();
        });
    }
    var paymentIcons = document.querySelectorAll('ul.list__payment');
    if (paymentIcons) 
    {
        paymentIcons.forEach(function (el, key) {
            var allPaymentLi = el.querySelectorAll("li");
            if(allPaymentLi)
            {
                allPaymentLi.forEach(function (innerEl, key) {
                    if(innerEl.querySelector("svg title"))
                    {
                        innerEl.querySelector("svg title").removeAttribute("id");
                    }    
                });
            }
        });
    }
});
window.addEventListener('resize', function(event) {
    var testimonials = document.querySelectorAll('.testimonial__slider.arrow__rounded .testimonial__slider-item');
    if(testimonials)
    {
        var heightsArray = []; 
        testimonials.forEach(function (el, key) {
            if(el.querySelector(".testimonial__slider-body .testimonial__info"))
            {
                el.querySelector(".testimonial__slider-body .testimonial__info").removeAttribute("style");
                var getElementHeight = el.querySelector(".testimonial__slider-body .testimonial__info").offsetHeight;
                heightsArray.push(getElementHeight);
            }
        });
        if(heightsArray.length > 0)
        {
            var getHighestValue = Math.max(...heightsArray);
            setTimeout(function(){
                testimonials.forEach(function (el, key) {
                    if(el.querySelector(".testimonial__slider-body .testimonial__info"))
                    {
                        el.querySelector(".testimonial__slider-body .testimonial__info").style.height = getHighestValue+"px";
                    }
                });
            },500); 
        }
        var heightsTitleHeightArray = []; 
        testimonials.forEach(function (el, key) {
            if(el.querySelector(".testimonial__slider-body h4"))
            {
                el.querySelector(".testimonial__slider-body h4").removeAttribute("style");
                var getElementHeight = el.querySelector(".testimonial__slider-body h4").offsetHeight;
                heightsTitleHeightArray.push(getElementHeight);
            }
        });
        if(heightsTitleHeightArray.length > 0)
        {
            var getTitleHighestValue = Math.max(...heightsTitleHeightArray);
            setTimeout(function(){
                testimonials.forEach(function (el, key) {
                    if(el.querySelector(".testimonial__slider-body h4"))
                    {
                        el.querySelector(".testimonial__slider-body h4").style.height = getTitleHighestValue+"px";
                    }
                });
            },800); 
        }
    }
}, false);


/* 03-11-2022 collection sidebar */
// document.addEventListener('click', function (event) { 
//     if (!event.target.classList.contains('accordion-toggle')) return;  
//     var content = document.querySelector(event.target.hash);
//     if (!content) return;    
//     event.preventDefault();    
//     if (content.classList.contains('active')) {
//       content.classList.remove('active');
//       return;
//     }    
//     var accordions = document.querySelectorAll('.accordion-content.active');
//     for (var i = 0; i < accordions.length; i++) {
//       accordions[i].classList.add('active');
//     } 
//     content.classList.toggle('active');
// });

const accordionItemHeaders = document.querySelectorAll(".accordion-head");

accordionItemHeaders.forEach(accordionItemHeader => {
   accordionItemHeader.addEventListener("click", event => {

     accordionItemHeader.classList.toggle("active");
     const accordionItemBody = accordionItemHeader.nextElementSibling;
     if(accordionItemHeader.classList.contains("active")) {
      accordionItemBody.style.maxHeight = accordionItemBody.scrollHeight + "px";
     }
     else {
       accordionItemBody.style.maxHeight = 0;
     }
    
   });
});
document.addEventListener("DOMContentLoaded", function (event) {
    var customDropDowmBtn = document.querySelectorAll('.custom-image-dropdown button.selector-button');
    if(customDropDowmBtn)
    {
        customDropDowmBtn.forEach(function (el, key) {
            el.addEventListener('click', function (event) {
                event.preventDefault();
                if(this.parentElement.querySelector("ul"))
                {
                    if(this.parentElement.querySelector("ul").classList.contains('active'))
                    {
                        this.parentElement.querySelector("ul").classList.remove('active');
                    }
                    else
                    {
                        var customDropDowm = document.querySelectorAll('.custom-image-dropdown ul');
                        if(customDropDowm)
                        {
                            customDropDowm.forEach(function (el, key) {
                                el.classList.remove('active');
                            });
                        }
                        this.parentElement.querySelector("ul").classList.add('active');
                    }
                }
            });
        });
        document.addEventListener('click', function(event) {
            if(event.target.classList.contains('selector-button') || event.target.classList.contains('dropdown-arrow-image') || event.target.classList.contains('button-image-wrapper') || event.target.classList.contains('button-text-wrapper'))
            {
                
            }
            else
            {
                var customDropDownWrapper = document.querySelectorAll('.custom-image-dropdown');
                if(customDropDownWrapper)
                {
                    customDropDownWrapper.forEach(function (el, key) {
                        el.querySelector("ul").classList.remove('active');
                    });
                }
            }
        });
    }
    var customDropDowmList = document.querySelectorAll('.custom-image-dropdown ul li');
    if(customDropDowmList)
    {
        customDropDowmList.forEach(function (el, key) {
            el.querySelector("a").addEventListener('click', function (event) {
                event.preventDefault();
                var getDropDownValue = this.getAttribute("data-value");
                // console.log(getDropDownValue);
                if(typeof getDropDownValue != "undefined" && getDropDownValue != null && getDropDownValue != "")
                {
                    this.parentElement.parentElement.parentElement.parentElement.querySelector(".custom-image-dropdown-input").value = getDropDownValue;
                    this.parentElement.parentElement.parentElement.parentElement.submit();
                }
            });
        });
    }
    var desktopDropdownMenu = document.querySelectorAll('.header__list li.has-childrens');
    if(desktopDropdownMenu)
    {
        var viewportWidth = window.innerWidth || document.documentElement.clientWidth;
        if(viewportWidth > 1023)
        {
            desktopDropdownMenu.forEach(function (el, key) {
                el.querySelector("a").addEventListener('click', function (event) {
                    event.preventDefault();
                    if(this.parentElement.classList.contains('active'))
                    {
                        this.parentElement.classList.remove("active");
                    }
                    else
                    {
                        if(this.parentElement.querySelector("ul.child-lists"))
                        {
                            var allDropdownLists = document.querySelectorAll('.header__list .custom-ul-class');
                            if(allDropdownLists)
                            {
                                allDropdownLists.forEach(function (newEl, newKey) {
                                    if(newEl.parentElement.classList.contains('active'))
                                    {
                                        newEl.parentElement.classList.remove("active");
                                    }
                                });
                            }
                            this.parentElement.classList.add("active");
                        }
                        else
                        {
                            if(this.parentElement.querySelector("ul.sub-child-lists"))
                            {
                                this.parentElement.parentElement.parentElement.classList.remove("active");
                                this.parentElement.parentElement.parentElement.classList.add("show-sub-child");
                                this.parentElement.classList.add("active");
                            }
                        }
                    }
                });
            });
        }
    }
    var closeDropdown = document.querySelectorAll('.header__list li.sub-menu-title');
    if(closeDropdown)
    {
        var viewportWidth = window.innerWidth || document.documentElement.clientWidth;
        if(viewportWidth > 1023)
        {
            closeDropdown.forEach(function (el, key) {
                if(el.querySelector("a"))
                {
                    el.querySelector("a").addEventListener('click', function (event) {
                        event.preventDefault();
                        this.parentElement.parentElement.parentElement.classList.remove("active");
                        this.parentElement.parentElement.parentElement.parentElement.parentElement.classList.remove("show-sub-child");
                        this.parentElement.parentElement.parentElement.parentElement.parentElement.classList.add("active");
                    });
                }
                if(el.querySelector(".js-back-to-parent"))
                {
                    el.querySelector(".js-back-to-parent").addEventListener('click', function (event) {
                        event.preventDefault();
                        this.parentElement.parentElement.parentElement.classList.remove("active");
                        this.parentElement.parentElement.parentElement.parentElement.parentElement.classList.remove("show-sub-child");
                        this.parentElement.parentElement.parentElement.parentElement.parentElement.classList.add("active");
                    });
                }
            });
        }
    }
    var megaMenuDropDown = document.querySelectorAll('.header__list .header__has-submenu');
    if(megaMenuDropDown)
    {
        var viewportWidth = window.innerWidth || document.documentElement.clientWidth;
        if(viewportWidth > 1023)
        {
            megaMenuDropDown.forEach(function (el, key) {
                if(el.querySelector("a"))
                {
                    el.querySelector("a").addEventListener('click', function (event) {
                        event.preventDefault();
                        if(this.parentElement.classList.contains('active'))
                        {
                            this.parentElement.classList.remove("active");
                        }
                        else
                        {
                            var allDropdownLists = document.querySelectorAll('.header__list .custom-ul-class');
                            if(allDropdownLists)
                            {
                                allDropdownLists.forEach(function (newEl, newKey) {
                                    if(newEl.parentElement.classList.contains('active'))
                                    {
                                        newEl.parentElement.classList.remove("active");
                                    }
                                });
                            }
                            this.parentElement.classList.add("active");
                        }
                    });
                }
            });
        }
    }
});
var rangeInput = document.querySelectorAll(".range-input input");
var priceInput = document.querySelectorAll(".price-input input");
if(rangeInput && priceInput)
{
    var range = document.querySelector(".slider .progress");
    let priceGap = 10;
    priceInput.forEach((input) => {
        let minPrice = parseInt(priceInput[0].value),
        maxPrice = parseInt(priceInput[1].value);

        if (maxPrice - minPrice >= priceGap && maxPrice <= rangeInput[1].max) {
            if (input.className === "input-min") {
                rangeInput[0].value = minPrice;
                range.style.left = (minPrice / rangeInput[0].max) * 10 + "%";
            } else {
                rangeInput[1].value = maxPrice;
                range.style.right = 100 - (maxPrice / rangeInput[1].max) * 10 + "%";
            }
        }
    });
    rangeInput.forEach((input) => {
        let minVal = parseInt(rangeInput[0].value),
        maxVal = parseInt(rangeInput[1].value);

        if (maxVal - minVal < priceGap) {
            if (input.className === "range-min") {
                rangeInput[0].value = maxVal - priceGap;
            } else {
                rangeInput[1].value = minVal + priceGap;
            }
        } else {
            // priceInput[0].value = minVal;
            // priceInput[1].value = maxVal;
            range.style.left = (minVal / rangeInput[0].max) * 100 + "%";
            range.style.right = 100 - (maxVal / rangeInput[1].max) * 100 + "%";
        }
    });
}
function btnOpenSidebar() {
    document.body.classList.add('show-sidebar');
}
function btnCloseSidebar(){
    document.body.classList.remove('show-sidebar');
}
function btnSortBy(){
    document.body.classList.add('show-filter-sidebar');
}
function btnCloseSortBySidebar(){
    document.body.classList.remove('show-filter-sidebar');
}
var filterLoadMore = document.querySelectorAll(".btn-load-more");
if(filterLoadMore)
{
    filterLoadMore.forEach(function (el, key) {
        el.addEventListener('click', function (event) {
            event.preventDefault();
            this.parentElement.querySelectorAll(".item").forEach(function (newEl, newKey) {
                newEl.classList.remove("hiddenStyle");
            });
            el.style.display = "none";
        });
    });
}
document.addEventListener("DOMContentLoaded", function() {
  var lazyBackgrounds = [].slice.call(document.querySelectorAll(".lazy-background"));

  if ("IntersectionObserver" in window) {
    let lazyBackgroundObserver = new IntersectionObserver(function(entries, observer) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          lazyBackgroundObserver.unobserve(entry.target);
        }
      });
    });

    lazyBackgrounds.forEach(function(lazyBackground) {
      lazyBackgroundObserver.observe(lazyBackground);
    });
  }    
});


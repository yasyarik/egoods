var Shopify = Shopify || {};
Shopify.money_format = '${{amount}}';
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
        })
        .catch(err => console.log(aler));
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
function ajaxAddToCart(variantId, quantity, openCart)
{
    let formData = new FormData();
    formData.append('id', variantId);
    formData.append('quantity', quantity);

    fetch("/cart/add.js",
        {
            body: formData,
            method: "post"
        })
        .then(response => response.json())
        .then((response) => {
            if(response.status == "bad_request")
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
            if(response.status == "bad_request")
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
            if(response.status == "bad_request")
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
        else{
            if(!e.target.parentElement.classList.contains('active')){
                if(option==true){
                    var elementList = document.querySelectorAll(elem+' .accordion__item');
                    Array.prototype.forEach.call(elementList, function (e) {
                        e.classList.remove('active');
                    });
                }            
                e.target.parentElement.classList.add('active');
            }else{
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

document.addEventListener('click', function(event) {
    var isClickInside = searchBox.contains(event.target);
    if (isClickInside) {
        searchInput.focus();
        searchBox.classList.add('active');
    } else {
        searchBox.classList.remove('active');
    }
});
/* Search expand END  ============================== */


/* Video modal popup Start ============================== */
var videoModal = document.querySelector('.js-tingle-video-modal');
if(videoModal) {
    videoModal.addEventListener('click', function () {
        var x = this.getAttribute("data-modal-id");
        var modalSurprise = new tingle.modal({
            onClose: function () {
                modalSurprise.destroy();
            }
        });
        modalSurprise.setContent(document.querySelector('.modal--video.'+x).innerHTML);
        modalSurprise.open();
    });
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
    var element = document.querySelectorAll('.header__has-submenu > a');

    if (element) {

        element.forEach(function (el, key) {

            el.addEventListener('click', function () {


                el.parentElement.classList.toggle("submenu-open");

                element.forEach(function (ell, els) {
                    if (key !== els) {
                        ell.parentElement.classList.remove('active');
                    }
                });
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


/* Hero dynamic Start ============================== */
if(document.querySelector('.hero')) {
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
}

window.addEventListener('resize', function () {
    viewportWidth = window.innerWidth || document.documentElement.clientWidth;
    if(document.querySelector('.hero')) {
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
    }
}, false);

/* Hero dynamic END ============================== */

/* Banner dynamic Start ============================== */
if(document.querySelector('.banner')) {
    var bannerElement = document.querySelector('.banner');
    var bannerHeight = bannerElement.getAttribute('data-height');
    var splitHeight = JSON.parse(bannerHeight.replace(/'/g, '"').replace(";", ""));
    // replace "data-name" with your data attribute name

    var viewportWidth = window.innerWidth || document.documentElement.clientWidth;
    if (viewportWidth < 576) {
        bannerElement.style.height = (splitHeight[4]);
    }
    else if (viewportWidth > 575 && viewportWidth < 768) {
        bannerElement.style.height = (splitHeight[3]);
    }
    else if (viewportWidth > 767 && viewportWidth < 992) {
        bannerElement.style.height = (splitHeight[2]);
    }
    else if (viewportWidth > 991 && viewportWidth < 1200) {
        bannerElement.style.height = (splitHeight[1]);
    }
    else if (viewportWidth > 1199) {
        bannerElement.style.height = (splitHeight[0]);
    }
}

window.addEventListener('resize', function () {
    viewportWidth = window.innerWidth || document.documentElement.clientWidth;
    if(document.querySelector('.banner')) {
        if (viewportWidth < 576) {
            bannerElement.style.height = (splitHeight[4]);
        }
        else if (viewportWidth > 575 && viewportWidth < 768) {
            bannerElement.style.height = (splitHeight[3]);
        }
        else if (viewportWidth > 767 && viewportWidth < 992) {
            bannerElement.style.height = (splitHeight[2]);
        }
        else if (viewportWidth > 991 && viewportWidth < 1200) {
            bannerElement.style.height = (splitHeight[1]);
        }
        else if (viewportWidth > 1199) {
            bannerElement.style.height = (splitHeight[0]);
        }
    }
}, false);

/* Banner dynamic END ============================== */

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
            document.querySelector('.tab__content.active').classList.remove('active');
            document.querySelector('.tab li button.active').classList.remove('active');
            // add classes
            currentTabData.classList.add('active');
            this.classList.add('active');
        });
    });
}
/* Tabs END =================================== */

/* progree bar add width =================================== */
if(document.querySelector('.progress__value')) {
var progressVal = document.querySelector('.progress__value');
var progressValData = progressVal.getAttribute('data-progress');

    document.addEventListener("DOMContentLoaded", function (event) {
        if(progressValData <= 100) {
            progressVal.style.width = progressValData + '%';
        }
        else {
            return false();
        }
    })
}
/* progree bar add width END =================================== */


/* Product slider start =================================== */
if(document.querySelector('.product__main')) {
    var productnav = document.querySelector('.product__nav');
    var productmain = document.querySelector('.product__main');

    var productMainslider = new Flickity( productmain, {
        cellAlign: 'left',
        contain: true,
        pageDots: false,
        lazyLoad: 1 ,
        cellAlign: "left"
    });

    var productNavslider = new Flickity( productnav, {
        asNavFor: ".product__main",
        contain: true,
        pageDots: false,
        lazyLoad: 5,
        cellAlign: "left"
    });
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
        document.querySelector('.product-form .product_atc_button').addEventListener('click', function(event) {
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
            var quantity = productForm.querySelector(".form-counter__output").value;
            var OpenCart = true;
            if(variantId && quantity)
            {
                ajaxAddToCart(variantId, quantity, OpenCart);    
            }
        });
    }
    var openCart = getUrlParameter('open_cart');
    if(typeof openCart != "undefined" && openCart != null && openCart != "" && openCart == "true")
    {
        miniCartRefresh(true);
    }
    var productVariantSelect = document.querySelectorAll('.product-form .product-form__variants');
    if(productVariantSelect)
    {
        if(document.querySelector('.product-form .product-form__variants'))
        {
            document.querySelector('.product-form .product-form__variants').addEventListener('change', function(event) {
                var variantAvailable = this.options[this.selectedIndex].getAttribute('data-available');
                var variantIsSalePrice = this.options[this.selectedIndex].getAttribute('data-is-sale-price');
                var variantSalePrice = this.options[this.selectedIndex].getAttribute('data-old-price');
                var variantOriginalPrice = this.options[this.selectedIndex].getAttribute('data-sale-price');
                var variantImageName = this.options[this.selectedIndex].getAttribute("data-image-name");
                var variantId = this.options[this.selectedIndex].getAttribute("value");
                var productBoxWrapper = this.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement;
                var productFormWrapper = this.parentElement.parentElement.parentElement;
                if(variantAvailable == "true")
                {
                    if(productBoxWrapper.querySelector(".progress__available"))
                    {
                        productBoxWrapper.querySelector(".progress__available").classList.remove('d-none');    
                    }
                    if(productBoxWrapper.querySelector(".progress__out_of_stock"))
                    {
                        productBoxWrapper.querySelector(".progress__out_of_stock").classList.add('d-none');
                    }
                    productBoxWrapper.querySelector(".product_atc_button").removeAttribute("disabled", "disabled");
                    var buttonText = productBoxWrapper.querySelector(".product_atc_button").getAttribute("data-atc-text");
                    productBoxWrapper.querySelector(".product_atc_button").innerHTML = buttonText;
                }
                else
                {
                    if(productBoxWrapper.querySelector(".progress__available"))
                    {
                        productBoxWrapper.querySelector(".progress__available").classList.add('d-none');
                    }
                    if(productBoxWrapper.querySelector(".progress__out_of_stock"))
                    {
                        productBoxWrapper.querySelector(".progress__out_of_stock").classList.remove('d-none');
                    }
                    productBoxWrapper.querySelector(".product_atc_button").setAttribute("disabled", "disabled");
                    var buttonText = productBoxWrapper.querySelector(".product_atc_button").getAttribute("data-oos-text");
                    productBoxWrapper.querySelector(".product_atc_button").innerHTML = buttonText;
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
                
                productBoxWrapper.querySelector(".product__meta").innerHTML = priceHtml;
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
            });    
        }
        
    }
    var productOptionWrapper = document.querySelectorAll('.product-form .form-row .product__options');
    if(productOptionWrapper)
    {   
        if(document.querySelector('.product-form .form-row .product__options select'))
        {
            document.querySelector('.product-form .form-row .product__options select').addEventListener('change', function(event) {
              var parentRow = this.parentElement.parentElement;
              var productForm = this.parentElement.parentElement.parentElement;
              var productOptionsLists = parentRow.querySelectorAll('.product__options');
              var selectedValue = "";
                if (productOptionsLists) {
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
            });
        }
    }
    if(document.querySelectorAll('.product-detail__box .product__info .spr-stars')) {
        document.querySelectorAll('.product-detail__box .product__info .spr-stars').forEach(trigger => {
            trigger.onclick = function(e) {
                e.preventDefault();
                let hash = "#shopify-product-reviews";
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
});
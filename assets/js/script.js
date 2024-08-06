import ProductCard from "./ProductCard.js";
import TrendingCard from "./TrendingCard.js";


const navBar = document.querySelector(".header"),
    navBtn = document.querySelector(".header__btn"),
    sections = document.querySelectorAll("section[id]"),
    newContent = document.querySelector(".new__products"),
    shopContent = document.querySelector(".shop__products"),
    trendingContent = document.querySelector(".trending__products"),
    shopCategories = document.querySelectorAll(".shop__category"),
    circleBtn = document.querySelector(".go-down-btn"),
    scrollUpBtn = document.querySelector(".scroll-up"),
    body = document.querySelector("body");

const API_URL = "../assets/apis/products.json";

// initialize Scroll Reveal
const sr = ScrollReveal({ origin: "top", distance: "100px", duration: 2000, delay: 300 });

/* ============== Header ============== */

navBtn.addEventListener("click", () => document.body.classList.toggle("menu-toggled"));

function changeHeaderBg() {
    const scrollY = window.scrollY;
    if (scrollY > 100) {
        navBar.style.backgroundColor = "var(--white-100-opcty-212)";
    } else {
        navBar.style.backgroundColor = "transparent";
    }
}

/* ============== Home Section ============== */

/* Swiper JS */

const homeSwiper = new Swiper(".home__content", {
    loop: true,
    effect: "fade",
    speed: 2000,
    allowTouchMove: false,
    autoplay: {
        delay: 6000,
        disableOnInteraction: false,
    },
});

homeSwiper.on("slideChange", () => {
    const activeSlide = homeSwiper.slides[homeSwiper.activeIndex];
    activeSlide.classList.add("reveal");
});

homeSwiper.on("slideChangeTransitionEnd", () => {
    const prevSlide = homeSwiper.slides[homeSwiper.previousIndex];
    prevSlide.classList.remove("reveal");
});

/* Circle Btn */

let circleText = circleBtn.querySelector(".circle-text");
circleText.innerHTML = circleText.textContent
    .split("")
    .map((char, index) => `<span style="transform: rotate(${index * 28.3}deg)">${char}</span>`)
    .join("");

/* ============== New Section ============== */

async function renderNewProducts() {
    const respone = await fetch(API_URL);
    const data = await respone.json();
    data.map((product) => {
        if (product.isNew) {
            newContent.innerHTML += ProductCard(product);
        }
    });
    const productCards = newContent.querySelectorAll(".product-card");
    productCards.forEach((product) => {
        product.classList.add("new__product");
        const image = product.querySelector("img");
        product.addEventListener("mouseover", () => {
            if (product.dataset.image2 != "undefined") {
                image.src = product.dataset.image2;
            }
        });
        product.addEventListener("mouseleave", () => {
            image.src = product.dataset.image1;
        });
    });
    /* Swiper JS */
    const newSwiper = new Swiper(".new__content", {
        slidesPerView: 4,
        spaceBetween: 20,
        loop: true,
        grabCursor: true,
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
        },
        breakpoints: {
            0: {
                slidesPerView: 1,
            },
            768: {
                slidesPerView: 2,
            },
            992: {
                slidesPerView: 3,
            },
            1200: {
                slidesPerView: 4,
            },
        },
    });

    /* ScrollReveal JS */
    sr.reveal(newContent);
}

/* ============== Shop Section ============== */

async function renderShopProducts() {
    const respone = await fetch(API_URL);
    const data = await respone.json();
    data.map((product) => {
        shopContent.innerHTML += ProductCard(product);
    });
    const productCards = shopContent.querySelectorAll(".product-card");
    productCards.forEach((product) => {
        product.classList.add("shop__product");
        const image = product.querySelector("img");
        product.addEventListener("mouseover", () => {
            if (product.dataset.image2 != "undefined") {
                image.src = product.dataset.image2;
            }
        });
        product.addEventListener("mouseleave", () => {
            image.src = product.dataset.image1;
        });
    });

    /* ScrollReveal JS */
    sr.reveal(".shop__product", { interval: 100 });
}

/* Shop categories */
shopCategories.forEach((category) => {
    category.addEventListener("click", () => {
        shopCategories.forEach((category) => category.classList.remove("selected"));
        category.classList.add("selected");
        let categoryType = category.dataset.category;
        const shopProducts = document.querySelectorAll(".shop__product");
        shopProducts.forEach((product) => {
            product.classList.add("hide");
            if (product.dataset.category === categoryType || categoryType === "all") {
                product.classList.remove("hide");
            }
        });
    });
});

/* ============== Trending Section ============== */

async function renderTrendingProducts() {
    const respone = await fetch(API_URL);
    const data = await respone.json();
    data.map((product) => {
        if (product.isTrending) {
            trendingContent.innerHTML += TrendingCard(product);
        }
    });
    /* Swiper JS */
    const trendingSectionSwiper = new Swiper(".trending__content", {
        loop: true,
        effect: "fade",
        speed: 600,
        allowTouchMove: false,
        autoplay: {
            delay: 6000,
        },
    });
    /* ScrollReveal JS */
    sr.reveal(trendingContent);
}

/* ============== Brands Section ============== */

/* ScrollReveal JS */
sr.reveal(".brands__logo", { interval: 100 });

/* ============== Footer ============== */

/* ScrollReveal JS */
sr.reveal(".footer__col", { interval: 100 });


/* ============== Active Scroll ============== */

function activeScroll() {
    const scrollY = window.scrollY;
    sections.forEach((section) => {
        const sectionTop = section.offsetTop - 16,
            sectionHeight = section.offsetHeight,
            link = document.querySelector(`.header__link a[href='#${section.id}'`);
        if (scrollY >= sectionTop && scrollY <= sectionHeight + sectionTop) {
            link.classList.add("active");
        } else {
            link.classList.remove("active");
        }
    });
}

/* ============== Scroll Up ============== */

function showScrollUpBtn() {
    if (window.scrollY > 300) {
        scrollUpBtn.classList.add("show");
    } else {
        scrollUpBtn.classList.remove("show");
    }
    
}

scrollUpBtn.addEventListener("click", () => window.scrollTo({ behavior: "smooth", top: 0, left: 0 }));

/* ============== Call functions ============== */

window.addEventListener("scroll", () => {
    activeScroll();
    changeHeaderBg();
    showScrollUpBtn();
});

window.addEventListener("load", () => {
    activeScroll();
    renderNewProducts();
    renderShopProducts();
    renderTrendingProducts();
    document.querySelector(".home__slide").classList.add("reveal");
});

// notification toast variables
const notificationToast = document.querySelector('[data-toast]');
const toastCloseBtn = document.querySelector('[data-toast-close]');

// notification toast eventListener
toastCloseBtn.addEventListener('click', function () {
  notificationToast.classList.add('closed');
});



let iconCart = document.querySelector("#cart-icon");
let cart = document.querySelector(".cart");
let close = document.querySelector(".close");






iconCart.addEventListener('click', function(){
    if(cart.style.left == '-100%'){
        cart.style.left = '0';
        container.style.transform = 'translateX(-400px)';
    }else{
        cart.style.left = '-100%';
        container.style.transform = 'translateX(0)';
    }
})

close.addEventListener('click', function (){
    cart.style.left = '-100%';
    container.style.transform = 'translateX(0)';
})






































// //show datas product in list 
// function addDataToHTML(){
//     // remove datas default from HTML
//     let listProductHTML = document.querySelector('.listProduct');
//     listProductHTML.innerHTML = '';

//     // add new datas
//     if(products != null) // if has data
//     {
//         products.forEach(product => {
//             let newProduct = document.createElement('div');
//             newProduct.classList.add('item');
//             newProduct.innerHTML = 
//             `<img src="${product.image}" alt="">
//             <h2>${product.name}</h2>
//             <div class="price">$${product.price}</div>
//             <button onclick="addCart(${product.id})">Add To Cart</button>`;

//             listProductHTML.appendChild(newProduct);

//         });
//     }
// }

// let listCart = [];
// function checkCart(){
//     var cookieValue = document.cookie
//     .split('; ')
//     .find(row => row.startsWith('listCart='));
//     if(cookieValue){
//         listCart = JSON.parse(cookieValue.split('=')[1]);
//     }else{
//         listCart = [];
//     }
// }
// checkCart();
// function addCart($idProduct){
//     let productsCopy = JSON.parse(JSON.stringify(products));
//     //// If this product is not in the cart
//     if(!listCart[$idProduct]) 
//     {
//         listCart[$idProduct] = productsCopy.filter(product => product.id == $idProduct)[0];
//         listCart[$idProduct].quantity = 1;
//     }else{
//         //If this product is already in the cart.
//         //I just increased the quantity
//         listCart[$idProduct].quantity++;
//     }
//     document.cookie = "listCart=" + JSON.stringify(listCart) + "; expires=Thu, 31 Dec 2025 23:59:59 UTC; path=/;";

//     addCartToHTML();
// }
// addCartToHTML();
// function addCartToHTML(){
//     // clear data default
//     let listCartHTML = document.querySelector('.listCart');
//     listCartHTML.innerHTML = '';

//     let totalHTML = document.querySelector('.totalQuantity');
//     let totalQuantity = 0;
//     // if has product in Cart
//     if(listCart){
//         listCart.forEach(product => {
//             if(product){
//                 let newCart = document.createElement('div');
//                 newCart.classList.add('item');
//                 newCart.innerHTML = 
//                     `<img src="${product.image}">
//                     <div class="content">
//                         <div class="name">${product.name}</div>
//                         <div class="price">$${product.price} / 1 product</div>
//                     </div>
//                     <div class="quantity">
//                         <button onclick="changeQuantity(${product.id}, '-')">-</button>
//                         <span class="value">${product.quantity}</span>
//                         <button onclick="changeQuantity(${product.id}, '+')">+</button>
//                     </div>`;
//                 listCartHTML.appendChild(newCart);
//                 totalQuantity = totalQuantity + product.quantity;
//             }
//         })
//     }
//     totalHTML.innerText = totalQuantity;
// }
// function changeQuantity($idProduct, $type){
//     switch ($type) {
//         case '+':
//             listCart[$idProduct].quantity++;
//             break;
//         case '-':
//             listCart[$idProduct].quantity--;

//             // if quantity <= 0 then remove product in cart
//             if(listCart[$idProduct].quantity <= 0){
//                 delete listCart[$idProduct];
//             }
//             break;
    
//         default:
//             break;
//     }
//     // save new data in cookie
//     document.cookie = "listCart=" + JSON.stringify(listCart) + "; expires=Thu, 31 Dec 2025 23:59:59 UTC; path=/;";
//     // reload html view cart
//     addCartToHTML();
// }


// // Vérification si le DOM est chargé avant d'exécuter les fonctions
// if (document.readyState === "loading") {
//     document.addEventListener("DOMContentLoaded", ready);
// } else {
//     ready();
// }

// // Fonction principale appelée lorsque le DOM est prêt
// function ready() {
//     // Ajout des événements pour supprimer un article du panier
//     var removeCartButtons = document.getElementsByClassName("cart-remove");
//     for (var i = 0; i < removeCartButtons.length; i++) {
//         var button = removeCartButtons[i];
//         button.addEventListener("click", removeCartItem);
//     }

//     // Ajout des événements pour changer la quantité
//     var quantityInputs = document.getElementsByClassName("cart-quantity");
//     for (var i = 0; i < quantityInputs.length; i++) {
//         var input = quantityInputs[i];
//         input.addEventListener("change", quantityChanged);
//     }

//     // Ajout des événements pour ajouter au panier
//     var addCartButtons = document.getElementsByClassName("add-cart");
//     for (var i = 0; i < addCartButtons.length; i++) {
//         var button = addCartButtons[i];
//         button.addEventListener("click", addCartClicked);
//     }
// }

// // Fonction pour supprimer un article du panier
// function removeCartItem(event) {
//     var buttonClicked = event.target;
//     buttonClicked.parentElement.parentElement.remove(); // Pour supprimer tout le conteneur du produit
//     updatetotal();
// }

// // Fonction pour changer la quantité
// function quantityChanged(event) {
//     var input = event.target;
//     if (isNaN(input.value) || input.value <= 0) {
//         input.value = 1;
//     }
//     updatetotal();
// }

// // Fonction pour ajouter au panier
// function addCartClicked(event) {
//     var button = event.target;
//     var shopProduct = button.parentElement.parentElement;
//     var title = shopProduct.querySelector(".product-card__title").innerText;
//     var price = shopProduct.querySelector(".product-card__price").innerText;
//     var productImg = shopProduct.querySelector(".product-card__image").src;
//     addProductToCart(title, price, productImg);
//     updatetotal();
// }

// // Fonction pour ajouter un produit au panier (hypothétique)
// function addProductToCart(title, price, productImg) {
//     // À implémenter selon votre besoin réel
//     // Peut-être ajouter un nouvel élément au DOM pour représenter le produit ajouté au panier
// }

// // Fonction pour mettre à jour le total du panier
// function updatetotal() {
//     var cartBoxes = document.querySelectorAll(".cart-box");
//     var total = 0;
//     cartBoxes.forEach(function(cartBox) {
//         var priceElement = cartBox.querySelector(".cart-price");
//         var quantityElement = cartBox.querySelector(".cart-quantity");
//         var price = parseFloat(priceElement.innerText.replace("CFA", ""));
//         var quantity = quantityElement.value;
//         total += price * quantity;
//     });
//     total = Math.round(total * 100) / 100;
//     document.querySelector(".total-price").innerText = total + " CFA";
// }

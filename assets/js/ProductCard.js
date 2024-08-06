function ProductCard({ id, title, price, image, image2, category }) {
    return `<div class="swiper-slide product-card" data-id="${id}" data-category="${category}" data-image1="${image}" data-image2="${image2}">
                <div class="product-card__image">
                    <img src="${image}" alt="${title}" />
                </div>
                <div class="product-card__description">
                    <div class="row">
                        <div class="product-card__title">${title}</div>
                      
                    </div>
                    <div class="row">
                        <div class="product-card__price">${price} CFA</div>
                   
                       <button onclick="addCart(${id})"> <i class="bx bx-shopping-bag" ></i> Ajouter au panier </button>
                    </div>
                    <span class="border-animation"></span>
                    <span class="border-animation"></span>
                    <span class="border-animation"></span>
                    <div> <Breadcrum product={product} />  </div>
                </div>
            </div>`;
}

export default ProductCard;
//<i class="bx bx-shopping-bag add-cart"> Panier </i>
// {/* <a href="https://api.whatsapp.com/send/?phone=221773885765"> 
// <button class="explore-more btn"> <img src="./assets/images/whatsapp.png" alt="home1" >
// <span class="material-symbols-rounded">trending_flat</span>
// </button>
// </a> */}
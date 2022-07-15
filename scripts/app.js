"use strict";
let productsData = [];
let productCards = document.querySelectorAll('.products-list-item');
let addToCartButtons = document.querySelectorAll('.products-item-btn');
let cartItems = [];
let cartItemsCount = document.querySelector('.cart-items-count');
let cartTotal = document.querySelector('.basket-total-value');
let basket = document.querySelector('.basket');
let cartEl = document.querySelector('.cart-link');

cartEl.addEventListener('click', event => {
    event.preventDefault();
    basket.classList.toggle('hidden');
});

productCards.forEach(productCard => {
    let title = productCard.querySelector('.products-item-title').innerText;
    let desc = productCard.querySelector('.products-item-txt').innerText;
    let price = +productCard.querySelector('.products-item-price-value').innerText;
    let id = +productCard.querySelector('.products-item-btn').dataset.id;

    productsData.push({
        id,
        title,
        desc,
        price
    });
});

addToCartButtons.forEach(button => {
    button.addEventListener('click', event => {
        let id = event.currentTarget.dataset.id;
        let product = productsData.find(product => product.id == id);
        let title = product.title;
        let price = product.price;
        let quantity = 1;
        let total = 0;

        let addProductToCart = () => {
            if (cartItems.find(item => item.id == id)) {
                cartItems.find(item => item.id == id).quantity++;
            } else {
                cartItems.push({
                    id,
                    title,
                    price,
                    quantity
                });
            };
        };

        let renderBasket = () => {
            let itemsList = basket.querySelector('.basket-items');

            itemsList.innerHTML = '';
            cartItems.forEach(item => {
                itemsList.insertAdjacentHTML('afterbegin', `
                    <div class="basket-row" data-id="${item.id}">
                        <div>${item.title}</div>
                        <div>${item.quantity}шт.</div>
                        <div>$${item.price}</div>
                        <div>$${item.quantity * item.price}</div>
                    </div>
                `);
                total += item.quantity * item.price;
                cartTotal.innerText = total;
            });
        };

        addProductToCart();
        renderBasket();
        cartItemsCount.innerText++;
    });
});
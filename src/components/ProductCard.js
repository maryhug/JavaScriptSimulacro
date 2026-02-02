// ============================================
// COMPONENTE DE TARJETA DE PRODUCTO - MEJORADO
// ============================================

import { STORAGE_KEYS } from '../utils/constants.js';
import { formatPrice, showNotification } from '../utils/helpers.js';

class ProductCard {
    create(product) {
        // Descripción por defecto
        const descriptions = {
            'Pizzas': 'Delicious pizza with fresh ingredients',
            'Hamburguesas': 'Juicy burger with premium beef',
            'Ensaladas': 'Fresh and healthy salad',
            'Pastas': 'Homemade pasta with authentic sauce',
            'Sushi': 'Fresh sushi with premium fish',
            'Mexicana': 'Authentic Mexican flavors',
            'Sopas': 'Warm and comforting soup',
            'Postres': 'Sweet and delicious dessert',
            'Bebidas': 'Refreshing beverage'
        };

        const description = descriptions[product.category] || 'Delicious food item';

        return `
            <div class="product-card" data-product-id="${product.id}">
                <div class="product-image">
                    <span class="product-badge">${product.category}</span>
                </div>
                
                <div class="product-content">
                    <h3 class="product-name">${product.name}</h3>
                    <p class="product-description">${description}</p>
                    
                    <div class="product-footer">
                        <span class="product-price">${formatPrice(product.price)}</span>
                        <button class="btn-add" data-product-id="${product.id}">
                            Add to order
                        </button>
                    </div>
                </div>
            </div>
        `;
    }

    attachEventListeners() {
        const addButtons = document.querySelectorAll('.btn-add');

        addButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                const productId = parseInt(e.target.dataset.productId);
                this.addToCart(productId);
            });
        });
    }

    addToCart(productId) {
        const productCard = document.querySelector(`[data-product-id="${productId}"]`);

        if (!productCard) return;

        const product = {
            id: productId,
            name: productCard.querySelector('.product-name').textContent,
            category: productCard.querySelector('.product-badge').textContent,
            price: parseFloat(productCard.querySelector('.product-price').textContent.replace('$', ''))
        };

        const cartJson = sessionStorage.getItem(STORAGE_KEYS.CART);
        const cart = cartJson ? JSON.parse(cartJson) : [];

        cart.push(product);
        sessionStorage.setItem(STORAGE_KEYS.CART, JSON.stringify(cart));

        showNotification(`${product.name} agregado al pedido`, 'success');
        window.dispatchEvent(new CustomEvent('cartUpdated'));
    }
}

export default new ProductCard();

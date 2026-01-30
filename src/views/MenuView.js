// ============================================
// VISTA DE MENÚ
// ============================================

import { showLoading } from '../utils/helpers.js';
import MenuService from '../services/MenuService.js';
import ProductCard from '../components/ProductCard.js';
import OrderForm from '../components/OrderForm.js';

class MenuView {
    constructor() {
        this.currentCategory = 'all';
        this.allProducts = [];
    }

    async render() {
        const mainContent = document.getElementById('main-content');

        mainContent.innerHTML = `
            <div>
                <h1 style="margin-bottom: 2rem;">🍽️ Menú del Restaurante</h1>
                
                <div class="filters-container">
                    <div class="filter-group">
                        <label class="form-label">Categoría</label>
                        <select id="category-filter" class="form-select">
                            <option value="all">Todas las categorías</option>
                        </select>
                    </div>
                </div>
                
                <div class="menu-container" id="products-grid"></div>
                <div id="cart-container"></div>
            </div>
        `;

        // Mostrar loading
        showLoading('products-grid');

        // Cargar productos desde API
        this.allProducts = await MenuService.getAllProducts();

        // Cargar categorías
        this.loadCategories();

        // Renderizar productos
        this.renderProducts();

        // Renderizar carrito
        OrderForm.render();

        // Event listeners
        document.getElementById('category-filter')
            .addEventListener('change', (e) => this.filterByCategory(e.target.value));

        window.addEventListener('cartUpdated', () => OrderForm.render());
    }

    loadCategories() {
        const categories = MenuService.getCategories(this.allProducts);
        const categoryFilter = document.getElementById('category-filter');

        categoryFilter.innerHTML = categories.map(cat => `
            <option value="${cat}">
                ${cat === 'all' ? 'Todas las categorías' : cat}
            </option>
        `).join('');
    }

    renderProducts() {
        const productsGrid = document.getElementById('products-grid');
        const products = MenuService.filterByCategory(this.allProducts, this.currentCategory);

        if (products.length === 0) {
            productsGrid.innerHTML = `
                <div class="empty-state">
                    <p>No hay productos disponibles</p>
                </div>
            `;
            return;
        }

        productsGrid.innerHTML = products
            .map(product => ProductCard.create(product))
            .join('');

        ProductCard.attachEventListeners();
    }

    filterByCategory(category) {
        this.currentCategory = category;
        this.renderProducts();
    }
}

export default new MenuView();

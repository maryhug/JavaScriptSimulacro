// ============================================
// VISTA DE MENÚ - CON CARRITO AL LADO
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
            <h1 class="page-title">Our Menu</h1>
            
            <div class="search-filters-container">
                <div class="search-bar">
                    <input 
                        type="text" 
                        class="search-input" 
                        placeholder="Search food..."
                        id="search-input"
                    >
                </div>
                
                <div class="filters-container" id="category-filters">
                    <!-- Categorías se cargarán aquí -->
                </div>
            </div>
            
            <!-- LAYOUT 2 COLUMNAS: Menú a la izquierda, Carrito a la derecha -->
            <div class="menu-layout">
                <div class="menu-container" id="products-grid">
                    <!-- Productos aquí -->
                </div>
                
                <div id="cart-container">
                    <!-- Carrito aquí (NO FLOTANTE) -->
                </div>
            </div>
        `;

        showLoading('products-grid');

        this.allProducts = await MenuService.getAllProducts();
        this.loadCategories();
        this.renderProducts();
        OrderForm.render();

        // Event listeners
        document.getElementById('search-input')
            .addEventListener('input', (e) => this.searchProducts(e.target.value));

        window.addEventListener('cartUpdated', () => OrderForm.render());
    }

    loadCategories() {
        const categories = MenuService.getCategories(this.allProducts);
        const filtersContainer = document.getElementById('category-filters');

        const categoryIcons = {
            'all': '🍽️',
            'Pizzas': '🍕',
            'Hamburguesas': '🍔',
            'Ensaladas': '🥗',
            'Pastas': '🍝',
            'Sushi': '🍱',
            'Mexicana': '🌮',
            'Sopas': '🍲',
            'Postres': '🍰',
            'Bebidas': '🥤'
        };

        filtersContainer.innerHTML = categories.map(cat => `
            <button 
                class="filter-btn ${cat === 'all' ? 'active' : ''}" 
                data-category="${cat}"
            >
                ${categoryIcons[cat] || '🍴'} 
                ${cat === 'all' ? 'All' : cat}
            </button>
        `).join('');

        // Agregar event listeners a los botones
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                // Remover active de todos
                document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
                // Agregar active al clickeado
                e.target.classList.add('active');
                // Filtrar
                this.filterByCategory(e.target.dataset.category);
            });
        });
    }

    renderProducts() {
        const productsGrid = document.getElementById('products-grid');
        const products = MenuService.filterByCategory(this.allProducts, this.currentCategory);

        if (products.length === 0) {
            productsGrid.innerHTML = `
                <div class="empty-state">
                    <div class="empty-state-icon">🍽️</div>
                    <p class="empty-state-title">No products found</p>
                    <p class="empty-state-text">Try another category or search</p>
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

    searchProducts(term) {
        if (!term.trim()) {
            this.renderProducts();
            return;
        }

        const productsGrid = document.getElementById('products-grid');
        const results = MenuService.searchProducts(this.allProducts, term);

        productsGrid.innerHTML = results
            .map(product => ProductCard.create(product))
            .join('');

        ProductCard.attachEventListeners();
    }
}

export default new MenuView();

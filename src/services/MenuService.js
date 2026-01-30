// ============================================
// SERVICIO DE MENÚ
// ============================================

import { API_ENDPOINTS } from '../services/api.js';
import ApiClient from '../services/api.js';
import { showNotification } from '../utils/helpers.js';

class MenuService {
    /**
     * Obtiene todos los productos del menú
     */
    async getAllProducts() {
        try {
            const products = await ApiClient.get(API_ENDPOINTS.MENU);
            return products;
        } catch (error) {
            console.error('Error obteniendo menú:', error);
            showNotification('Error al cargar el menú', 'error');
            return [];
        }
    }

    /**
     * Obtiene un producto por su ID
     */
    async getProductById(id) {
        try {
            const product = await ApiClient.get(`${API_ENDPOINTS.MENU}/${id}`);
            return product;
        } catch (error) {
            console.error('Error obteniendo producto:', error);
            return null;
        }
    }

    /**
     * Filtra productos por categoría
     */
    filterByCategory(products, category) {
        if (!category || category === 'all') {
            return products;
        }
        return products.filter(p => p.category === category);
    }

    /**
     * Obtiene todas las categorías disponibles
     */
    getCategories(products) {
        const categories = products.map(p => p.category);
        return ['all', ...new Set(categories)];
    }

    /**
     * Busca productos por nombre
     */
    searchProducts(products, searchTerm) {
        const term = searchTerm.toLowerCase();
        return products.filter(p =>
            p.name.toLowerCase().includes(term) ||
            p.category.toLowerCase().includes(term)
        );
    }
}

export default new MenuService();

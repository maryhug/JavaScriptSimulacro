// ============================================
// CONFIGURACIÓN DE LA API
// Configuración central para todas las peticiones HTTP
// ============================================

/**
 * URL base de la API (JSON Server)
 */
export const API_BASE_URL = 'http://localhost:3000';

/**
 * Endpoints de la API
 */
export const API_ENDPOINTS = {
    USERS: `${API_BASE_URL}/users`,
    MENU: `${API_BASE_URL}/menu`,
    ORDERS: `${API_BASE_URL}/orders`
};

/**
 * Configuración por defecto para fetch
 */
export const DEFAULT_HEADERS = {
    'Content-Type': 'application/json'
};

/**
 * Clase para manejar peticiones HTTP
 */
class ApiClient {
    /**
     * Realiza una petición GET
     * @param {string} url - URL del endpoint
     * @returns {Promise<any>} Datos de la respuesta
     */
    async get(url) {
        try {
            const response = await fetch(url, {
                method: 'GET',
                headers: DEFAULT_HEADERS
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            return await response.json();
        } catch (error) {
            console.error('Error en GET:', error);
            throw error;
        }
    }

    /**
     * Realiza una petición POST
     * @param {string} url - URL del endpoint
     * @param {Object} data - Datos a enviar
     * @returns {Promise<any>} Datos de la respuesta
     */
    async post(url, data) {
        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: DEFAULT_HEADERS,
                body: JSON.stringify(data)
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            return await response.json();
        } catch (error) {
            console.error('Error en POST:', error);
            throw error;
        }
    }

    /**
     * Realiza una petición PUT
     * @param {string} url - URL del endpoint
     * @param {Object} data - Datos a actualizar
     * @returns {Promise<any>} Datos de la respuesta
     */
    async put(url, data) {
        try {
            const response = await fetch(url, {
                method: 'PUT',
                headers: DEFAULT_HEADERS,
                body: JSON.stringify(data)
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            return await response.json();
        } catch (error) {
            console.error('Error en PUT:', error);
            throw error;
        }
    }

    /**
     * Realiza una petición PATCH
     * @param {string} url - URL del endpoint
     * @param {Object} data - Datos parciales a actualizar
     * @returns {Promise<any>} Datos de la respuesta
     */
    async patch(url, data) {
        try {
            const response = await fetch(url, {
                method: 'PATCH',
                headers: DEFAULT_HEADERS,
                body: JSON.stringify(data)
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            return await response.json();
        } catch (error) {
            console.error('Error en PATCH:', error);
            throw error;
        }
    }

    /**
     * Realiza una petición DELETE
     * @param {string} url - URL del endpoint
     * @returns {Promise<any>} Datos de la respuesta
     */
    async delete(url) {
        try {
            const response = await fetch(url, {
                method: 'DELETE',
                headers: DEFAULT_HEADERS
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            return await response.json();
        } catch (error) {
            console.error('Error en DELETE:', error);
            throw error;
        }
    }
}

// Exportar instancia única
export default new ApiClient();

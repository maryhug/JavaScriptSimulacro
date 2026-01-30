// ============================================
// SERVICIO DE AUTENTICACIÓN
// ============================================

import { API_ENDPOINTS } from '../services/api.js';
import ApiClient from '../services/api.js';
import { STORAGE_KEYS, USER_ROLES, ROUTES } from '../utils/constants.js';
import { showNotification } from '../utils/helpers.js';

class AuthService {
    /**
     * Intenta autenticar a un usuario
     */
    async login(email, password) {
        try {
            // Obtener todos los usuarios
            const users = await ApiClient.get(API_ENDPOINTS.USERS);

            // Buscar usuario con credenciales correctas usando find
            const user = users.find(u => u.email === email && u.password === password);

            if (user) {
                // Guardar usuario sin la contraseña en sessionStorage
                const safeUser = { ...user };
                delete safeUser.password;

                sessionStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(safeUser));
                showNotification(`¡Bienvenido ${user.name}!`, 'success');
                return safeUser;
            }

            showNotification('Credenciales incorrectas', 'error');
            return null;
        } catch (error) {
            console.error('Error en login:', error);
            showNotification('Error al iniciar sesión', 'error');
            return null;
        }
    }

    /**
     * Cierra la sesión del usuario actual
     */
    logout() {
        sessionStorage.removeItem(STORAGE_KEYS.CURRENT_USER);
        sessionStorage.removeItem(STORAGE_KEYS.CART);
        showNotification('Sesión cerrada', 'info');
        window.location.hash = ROUTES.LOGIN;
    }

    /**
     * Obtiene el usuario actualmente autenticado
     */
    getCurrentUser() {
        const userJson = sessionStorage.getItem(STORAGE_KEYS.CURRENT_USER);
        return userJson ? JSON.parse(userJson) : null;
    }

    /**
     * Verifica si hay un usuario autenticado
     */
    isAuthenticated() {
        return this.getCurrentUser() !== null;
    }

    /**
     * Verifica si el usuario actual es administrador
     */
    isAdmin() {
        const user = this.getCurrentUser();
        return user && user.role === USER_ROLES.ADMIN;
    }
}

export default new AuthService();

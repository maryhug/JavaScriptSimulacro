// ============================================
// CONSTANTES DE LA APLICACIÓN
// ============================================

// Estados posibles de un pedido
export const ORDER_STATUS = {
    PENDIENTE: 'pendiente',
    PREPARANDO: 'preparando',
    LISTO: 'listo',
    ENTREGADO: 'entregado'
};

// Roles de usuario
export const USER_ROLES = {
    ADMIN: 'admin',
    USER: 'user'
};

// Claves para sessionStorage (sesión actual)
export const STORAGE_KEYS = {
    CURRENT_USER: 'restaurapp_current_user',
    CART: 'restaurapp_cart'
};

// Rutas de la aplicación
export const ROUTES = {
    LOGIN: '#/login',
    MENU: '#/menu',
    ORDERS: '#/orders',
    PROFILE: '#/profile',
    ADMIN: '#/admin'
};

import {ORDER_STATUS} from "./constants.js"

// ============================================
// FUNCIONES AUXILIARES
// ============================================

/**
 * Formatea un precio a formato de moneda
 */
export function formatPrice(price) {
    return `$${price.toFixed(2)}`;
}

/**
 * Formatea una fecha a formato legible
 */
export function formatDate(dateString) {
    const date = new Date(dateString);
    const options = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    };
    return date.toLocaleDateString('es-ES', options);
}

/**
 * Valida un email
 */
export function validateEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

/**
 * Calcula el total de un array de items
 */
export function calculateTotal(items) {
    return items.reduce((total, item) => total + item.price, 0);
}

/**
 * Obtiene el siguiente estado de un pedido
 */
export function getNextStatus(currentStatus) {
    const statusFlow = {
        [ORDER_STATUS.PENDIENTE]: ORDER_STATUS.PREPARANDO,
        [ORDER_STATUS.PREPARANDO]: ORDER_STATUS.LISTO,
        [ORDER_STATUS.LISTO]: ORDER_STATUS.ENTREGADO,
        [ORDER_STATUS.ENTREGADO]: ORDER_STATUS.ENTREGADO
    };
    return statusFlow[currentStatus];
}

/**
 * Limpia el contenido HTML de un elemento
 */
export function clearElement(elementId) {
    const element = document.getElementById(elementId);
    if (element) {
        element.innerHTML = '';
    }
}

/**
 * Muestra un mensaje de notificación temporal
 */
export function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 1rem 1.5rem;
        background-color: ${type === 'success' ? '#51cf66' : type === 'error' ? '#ff6b6b' : '#4ecdc4'};
        color: white;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.2);
        z-index: 1000;
        animation: slideIn 0.3s ease;
    `;

    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

/**
 * Muestra un indicador de carga
 */
export function showLoading(elementId) {
    const element = document.getElementById(elementId);
    if (element) {
        element.innerHTML = '<div class="loading">⏳ Cargando...</div>';
    }
}

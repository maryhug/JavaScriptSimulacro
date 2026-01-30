// ============================================
// SERVICIO DE PEDIDOS - CORREGIDO
// ============================================

import { API_ENDPOINTS } from '../services/api.js';
import ApiClient from '../services/api.js';
import { STORAGE_KEYS, ORDER_STATUS } from '../utils/constants.js';
import { calculateTotal, getNextStatus, showNotification } from '../utils/helpers.js';

class OrderService {
    async createOrder(userId, items) {
        try {
            const newOrder = {
                userId,
                items,
                total: calculateTotal(items),
                status: ORDER_STATUS.PENDIENTE,
                createdAt: new Date().toISOString()
            };

            const createdOrder = await ApiClient.post(API_ENDPOINTS.ORDERS, newOrder);
            sessionStorage.removeItem(STORAGE_KEYS.CART);

            showNotification('Pedido realizado con éxito', 'success');
            return createdOrder;
        } catch (error) {
            console.error('Error creando pedido:', error);
            showNotification('Error al crear el pedido', 'error');
            return null;
        }
    }

    async getAllOrders() {
        try {
            const orders = await ApiClient.get(API_ENDPOINTS.ORDERS);
            return orders;
        } catch (error) {
            console.error('Error obteniendo pedidos:', error);
            showNotification('Error al cargar pedidos', 'error');
            return [];
        }
    }

    async getUserOrders(userId) {
        try {
            const orders = await ApiClient.get(`${API_ENDPOINTS.ORDERS}?userId=${userId}`);
            return orders;
        } catch (error) {
            console.error('Error obteniendo pedidos del usuario:', error);
            return [];
        }
    }

    async getOrderById(orderId) {
        try {
            const order = await ApiClient.get(`${API_ENDPOINTS.ORDERS}/${orderId}`);
            return order;
        } catch (error) {
            console.error('Error obteniendo pedido:', error);
            return null;
        }
    }

    async updateOrderStatus(orderId, newStatus) {
        try {
            const updatedOrder = await ApiClient.patch(
                `${API_ENDPOINTS.ORDERS}/${orderId}`,
                {
                    status: newStatus,
                    updatedAt: new Date().toISOString()
                }
            );

            showNotification('Estado actualizado correctamente', 'success');
            return updatedOrder;
        } catch (error) {
            console.error('Error actualizando pedido:', error);
            showNotification('Error al actualizar estado', 'error');
            return null;
        }
    }

    // CORRECCIÓN: Método simplificado que no requiere obtener el pedido primero
    async advanceOrderStatus(orderId, currentStatus) {
        try {
            const nextStatus = getNextStatus(currentStatus);

            const updatedOrder = await ApiClient.patch(
                `${API_ENDPOINTS.ORDERS}/${orderId}`,
                {
                    status: nextStatus,
                    updatedAt: new Date().toISOString()
                }
            );

            showNotification('Estado avanzado correctamente', 'success');
            return updatedOrder;
        } catch (error) {
            console.error('Error avanzando estado:', error);
            showNotification('Error al avanzar estado', 'error');
            return null;
        }
    }

    filterByStatus(orders, status) {
        if (!status || status === 'all') {
            return orders;
        }
        return orders.filter(o => o.status === status);
    }

    async deleteOrder(orderId) {
        try {
            await ApiClient.delete(`${API_ENDPOINTS.ORDERS}/${orderId}`);
            showNotification('Pedido eliminado', 'info');
            return true;
        } catch (error) {
            console.error('Error eliminando pedido:', error);
            showNotification('Error al eliminar pedido', 'error');
            return false;
        }
    }

    getUserStats(orders) {
        return {
            totalOrders: orders.length,
            totalSpent: orders.reduce((sum, order) => sum + order.total, 0),
            pendingOrders: orders.filter(o => o.status === ORDER_STATUS.PENDIENTE).length
        };
    }
}

export default new OrderService();

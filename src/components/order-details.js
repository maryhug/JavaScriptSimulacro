<!-- ===================================
     COMPONENTE: Order Details Card
     Detalles de orden específica
     =================================== -->

export function orderDetails() {
    return `
<div class="order-details-card">
    <div class="order-details-header">
        <h3 class="order-details-title">ORDER DETAILS</h3>
        <span class="order-status-tag">Preparing</span>
    </div>

    <div class="order-number">
        <span class="order-number-label">#</span>
        <span class="order-number-value">1024</span>
    </div>

    <!-- Información del cliente -->
    <div class="customer-info">
        <div class="customer-avatar">
            <img src="https://via.placeholder.com/48" alt="Customer">
        </div>
        <div class="customer-details">
            <div class="customer-name">Alice Smith</div>
            <div class="customer-email">alice@example.com</div>
            <div class="customer-phone">+1 (555) 123-4567</div>
        </div>
    </div>

    <!-- Lista de items -->
    <div class="order-items">
        <h4 class="order-items-title">Items</h4>
        <div class="order-item">
            <div class="item-quantity">1x</div>
            <div class="item-details">
                <div class="item-name">Burger Classics</div>
                <div class="item-notes">Extra Pickles, No onions</div>
            </div>
            <div class="item-price">$24.00</div>
        </div>
        <div class="order-item">
            <div class="item-quantity">1x</div>
            <div class="item-details">
                <div class="item-name">Truffle Fries</div>
            </div>
            <div class="item-price">$8.00</div>
        </div>
        <div class="order-item">
            <div class="item-quantity">1x</div>
            <div class="item-details">
                <div class="item-name">Vanilla Shake</div>
            </div>
            <div class="item-price">$5.00</div>
        </div>
        <div class="order-item">
            <div class="item-quantity">1x</div>
            <div class="item-details">
                <div class="item-name">Chocolate Cake</div>
            </div>
            <div class="item-price">$8.00</div>
        </div>
    </div>

    <!-- Totales -->
    <div class="order-summary">
        <div class="summary-row">
            <span class="summary-label">Subtotal</span>
            <span class="summary-value">$45.00</span>
        </div>
        <div class="summary-row">
            <span class="summary-label">Tax (8%)</span>
            <span class="summary-value">$3.60</span>
        </div>
        <div class="summary-row total">
            <span class="summary-label">Total</span>
            <span class="summary-value">$48.60</span>
        </div>
    </div>

    <!-- Actualizar estado -->
    <div class="order-actions">
        <label class="form-label">UPDATE STATUS</label>
        <select class="form-select">
            <option>Preparing</option>
            <option>Ready</option>
            <option>Delivered</option>
            <option>Cancelled</option>
        </select>
        <button class="btn btn-primary btn-full">Update</button>
    </div>
</div>
    
    `
}
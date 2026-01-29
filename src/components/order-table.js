<!-- ===================================
     COMPONENTE: Order Table
     Tabla de órdenes recientes
     =================================== -->

export function orderTable() {
    return `
    <div class="order-table-container">
    <div class="table-header">
        <h2 class="table-title">Recent Orders</h2>
        <div class="table-actions">
            <button class="btn btn-secondary">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <line x1="4" y1="6" x2="20" y2="6" stroke-width="2"/>
                    <line x1="4" y1="12" x2="20" y2="12" stroke-width="2"/>
                    <line x1="4" y1="18" x2="20" y2="18" stroke-width="2"/>
                </svg>
                Filter
            </button>
            <button class="btn btn-secondary">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3" stroke-width="2"/>
                </svg>
                Export
            </button>
        </div>
    </div>

    <table class="order-table">
        <thead>
        <tr>
            <th>ID</th>
            <th>User</th>
            <th>Date</th>
            <th>Status</th>
            <th>Total</th>
        </tr>
        </thead>
        <tbody>
        <tr class="order-row">
            <td class="order-id">#1024</td>
            <td class="order-user">Alice Smith</td>
            <td class="order-date">Oct 27, 14:30</td>
            <td><span class="status-badge status-processing">Processing</span></td>
            <td class="order-total">$45.00</td>
        </tr>
        <tr class="order-row">
            <td class="order-id">#1023</td>
            <td class="order-user">Bob Jones</td>
            <td class="order-date">Oct 27, 14:15</td>
            <td><span class="status-badge status-pending">Pending</span></td>
            <td class="order-total">$12.50</td>
        </tr>
        <tr class="order-row">
            <td class="order-id">#1022</td>
            <td class="order-user">Charlie Day</td>
            <td class="order-date">Oct 27, 13:50</td>
            <td><span class="status-badge status-delivered">Delivered</span></td>
            <td class="order-total">$32.00</td>
        </tr>
        <tr class="order-row">
            <td class="order-id">#1021</td>
            <td class="order-user">Diana Prince</td>
            <td class="order-date">Oct 27, 13:45</td>
            <td><span class="status-badge status-delivered">Delivered</span></td>
            <td class="order-total">$56.00</td>
        </tr>
        <tr class="order-row">
            <td class="order-id">#1020</td>
            <td class="order-user">Evan Wright</td>
            <td class="order-date">Oct 27, 13:30</td>
            <td><span class="status-badge status-ready">Ready</span></td>
            <td class="order-total">$22.00</td>
        </tr>
        </tbody>
    </table>

    <!-- Paginación -->
    <div class="table-pagination">
        <button class="pagination-btn">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M15 19l-7-7 7-7" stroke-width="2"/>
            </svg>
        </button>
        <button class="pagination-btn active">1</button>
        <button class="pagination-btn">2</button>
        <button class="pagination-btn">3</button>
        <span class="pagination-dots">...</span>
        <button class="pagination-btn">12</button>
        <button class="pagination-btn">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M9 5l7 7-7 7" stroke-width="2"/>
            </svg>
        </button>
    </div>
</div>
    `
}
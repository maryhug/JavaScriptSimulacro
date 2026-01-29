/* ===================================
     VISTA: Dashboard Admin
     Panel de administración principal
=================================== */

import {navbar} from "../components/navbar";

export function adminDashboard() {
    const app = document.getElementById('app');
    app.innerHTML = `
    
<!-- Navbar -->
${navbar()}

<!-- Main Content -->
<main class="dashboard-main">
    <div class="dashboard-container">
        <!-- Stats Grid -->
        <div class="stats-grid">
            <div class="stats-card">
                <div class="stats-icon" data-color="green">
                    📦
                </div>
                <div class="stats-content">
                    <div class="stats-label">Total Orders</div>
                    <div class="stats-value">1,245</div>
                </div>
            </div>

            <div class="stats-card">
                <div class="stats-icon" data-color="yellow">
                    ⏳
                </div>
                <div class="stats-content">
                    <div class="stats-label">Pending Orders</div>
                    <div class="stats-value">15</div>
                </div>
            </div>

            <div class="stats-card">
                <div class="stats-icon" data-color="blue">
                    💰
                </div>
                <div class="stats-content">
                    <div class="stats-label">Today's Revenue</div>
                    <div class="stats-value">$3,450</div>
                </div>
            </div>
        </div>

        <!-- Content Grid -->
        <div class="content-grid">
            <!-- Order Table -->
            <div class="content-main">
                <div class="order-table-container">
                    <div class="table-header">
                        <h2 class="table-title">Recent Orders</h2>
                        <div class="table-actions">
                            <button class="btn btn-secondary">
                                🔍 Filter
                            </button>
                            <button class="btn btn-secondary">
                                📥 Export
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

                    <div class="table-pagination">
                        <button class="pagination-btn">‹</button>
                        <button class="pagination-btn active">1</button>
                        <button class="pagination-btn">2</button>
                        <button class="pagination-btn">3</button>
                        <span class="pagination-dots">...</span>
                        <button class="pagination-btn">12</button>
                        <button class="pagination-btn">›</button>
                    </div>
                </div>
            </div>

            <!-- Order Details Sidebar -->
            <aside class="content-sidebar">
                <div class="order-details-card">
                    <div class="order-details-header">
                        <h3 class="order-details-title">ORDER DETAILS</h3>
                        <span class="order-status-tag">Preparing</span>
                    </div>

                    <div class="order-number">
                        <span class="order-number-label">#</span>
                        <span class="order-number-value">1024</span>
                    </div>

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
            </aside>
        </div>
    </div>
</main>
    `
}
<!-- ===================================
     VISTA: User Profile
     Página de perfil de usuario
     =================================== -->


export function userProfile() {
    const app = document.getElementById('app');
    app.innerHTML = `
    
<!-- Navbar simplificado -->
<nav class="navbar">
    <div class="navbar-container">
        <div class="navbar-brand">
            <div class="navbar-logo">🍔</div>
            <span class="navbar-title">RestorApp</span>
        </div>
        <div class="navbar-actions">
            <button class="btn-logout">Log Out</button>
        </div>
    </div>
</nav>

<main class="profile-main">
    <div class="profile-container">
        <!-- Sidebar -->
        <aside class="profile-sidebar">
            <h2 class="sidebar-title">Recent Orders</h2>
            <a href="#orders" class="view-all-link">View All</a>

            <div class="order-list">
                <div class="order-card">
                    <div class="order-icon">📦</div>
                    <div class="order-info">
                        <div class="order-card-id">#ORD-4402</div>
                        <div class="order-card-date">Oct 24, 2022 • 3 items</div>
                    </div>
                    <div class="order-card-price">$45.50</div>
                    <span class="status-badge status-delivered">Delivered</span>
                </div>

                <div class="order-actions-group">
                    <button class="btn btn-secondary btn-small">View Receipt</button>
                    <button class="btn btn-primary btn-small">Reorder</button>
                </div>

                <div class="order-card">
                    <div class="order-icon">📦</div>
                    <div class="order-info">
                        <div class="order-card-id">#ORD-4401</div>
                        <div class="order-card-date">Oct 23, 2022 • 1 item</div>
                    </div>
                    <div class="order-card-price">$12.00</div>
                    <span class="status-badge status-pending">Preparing</span>
                </div>

                <div class="order-card">
                    <div class="order-icon">📦</div>
                    <div class="order-info">
                        <div class="order-card-id">#ORD-4399</div>
                        <div class="order-card-date">Oct 19, 2022 • 4 items</div>
                    </div>
                    <div class="order-card-price">$85.20</div>
                    <span class="status-badge status-cancelled">Cancelled</span>
                </div>

                <div class="order-card">
                    <div class="order-icon">📦</div>
                    <div class="order-info">
                        <div class="order-card-id">#ORD-4382</div>
                        <div class="order-card-date">Sep 16, 2022 • 1 item</div>
                    </div>
                    <div class="order-card-price">$14.50</div>
                    <span class="status-badge status-delivered">Delivered</span>
                </div>
            </div>
        </aside>

        <!-- Main Content -->
        <div class="profile-content">
            <h1 class="profile-heading">Account Details</h1>

            <!-- User Card -->
            <div class="user-card">
                <div class="user-avatar-large">
                    <img src="https://via.placeholder.com/120" alt="User">
                </div>
                <h2 class="user-name">Alex Student</h2>
                <p class="user-email">alex.student@study.com</p>
                <span class="user-role-badge">Customer</span>
            </div>

            <!-- Stats Cards -->
            <div class="user-stats">
                <div class="stat-card">
                    <div class="stat-label">TOTAL ORDERS</div>
                    <div class="stat-value">12</div>
                </div>
                <div class="stat-card">
                    <div class="stat-label">LOYALTY PTS</div>
                    <div class="stat-value">450</div>
                </div>
            </div>

            <!-- Menu Options -->
            <div class="menu-options">
                <a href="#payment" class="menu-option">
                    <span class="menu-option-icon">💳</span>
                    <span class="menu-option-text">Payment Methods</span>
                    <span class="menu-option-arrow">›</span>
                </a>
                <a href="#addresses" class="menu-option">
                    <span class="menu-option-icon">📍</span>
                    <span class="menu-option-text">Saved Addresses</span>
                    <span class="menu-option-arrow">›</span>
                </a>
                <a href="#preferences" class="menu-option">
                    <span class="menu-option-icon">⚙️</span>
                    <span class="menu-option-text">Preferences</span>
                    <span class="menu-option-arrow">›</span>
                </a>
            </div>

            <div class="simulation-notice">
                Riwistory Academic Simulation v1.2<br>
                Performance monitoring active
            </div>
        </div>
    </div>
</main>
`
}
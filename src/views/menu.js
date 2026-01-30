/*
===================================
     VISTA: Menu
     Página de menú de comidas
===================================
*/

export function menu() {

return`
    
    <!-- Navbar -->

<nav class="navbar">
    <div class="navbar-container">
        <div class="navbar-brand">
            <div class="navbar-logo">🍔</div>
            <span class="navbar-title">RestorApp</span>
        </div>
        <div class="navbar-menu">
            <a href="#menu" class="navbar-link">Menu</a>
            <a href="#orders" class="navbar-link">My Orders</a>
            <a href="#profile" class="navbar-link">Profile</a>
        </div>
        <div class="navbar-actions">
            <button class="navbar-user">
                <img src="https://via.placeholder.com/40" alt="User" class="user-avatar">
            </button>
        </div>
    </div>
</nav>



<main class="menu-main">
    <div class="menu-container">
        <!-- Header -->
        <div class="menu-header">
            <h1 class="menu-title">Our Menu</h1>
            <div class="search-bar">
                <span class="search-icon">🔍</span>
                <input type="text" class="search-input" placeholder="Search food...">
            </div>
        </div>

        <!-- Cart Sidebar -->
        <aside class="cart-sidebar">
            <div class="cart-header">
                <h3 class="cart-title">Your Order</h3>
                <span class="cart-badge">3</span>
            </div>
            <button class="btn-clear">Clear all</button>

            <div class="cart-items">
                <div class="cart-item">
                    <img src="https://via.placeholder.com/60" alt="Product" class="cart-item-image">
                    <div class="cart-item-info">
                        <div class="cart-item-name">Classic Beef Burger</div>
                        <div class="cart-item-price">$8.99</div>
                    </div>
                    <button class="btn-remove">✕</button>
                </div>

                <div class="cart-item">
                    <img src="https://via.placeholder.com/60" alt="Product" class="cart-item-image">
                    <div class="cart-item-info">
                        <div class="cart-item-name">Golden Fries</div>
                        <div class="cart-item-price">$3.99</div>
                        <div class="cart-item-note">Extra Salt</div>
                    </div>
                    <button class="btn-remove">✕</button>
                </div>
            </div>

            <div class="cart-summary">
                <div class="summary-row">
                    <span>Subtotal</span>
                    <span>$12.98</span>
                </div>
                <div class="summary-row">
                    <span>Tax (8%)</span>
                    <span>$1.04</span>
                </div>
                <div class="summary-row total">
                    <span>Total</span>
                    <span>$14.02</span>
                </div>
            </div>

            <button class="btn btn-primary btn-full">Confirm Order →</button>
        </aside>

        <!-- Content -->
        <div class="menu-content">
            <!-- Categories -->
            <div class="category-tabs">
                <button class="category-tab active">
                    <span class="tab-icon">🍔</span>
                    <span class="tab-label">All</span>
                </button>
                <button class="category-tab">
                    <span class="tab-icon">🍔</span>
                    <span class="tab-label">Burgers</span>
                </button>
                <button class="category-tab">
                    <span class="tab-icon">🍟</span>
                    <span class="tab-label">Sides</span>
                </button>
                <button class="category-tab">
                    <span class="tab-icon">🥤</span>
                    <span class="tab-label">Drinks</span>
                </button>
            </div>

            <!-- Products Grid -->
            <div class="products-grid">
                <!-- Product Card 1 -->
                <div class="product-card">
                    <div class="product-badge">BURGERS</div>
                    <img src="https://via.placeholder.com/300x200" alt="Classic Beef Burger" class="product-image">
                    <div class="product-info">
                        <h3 class="product-name">Classic Beef Burger</h3>
                        <p class="product-price">$8.99</p>
                        <p class="product-description">Premium beef patty with lettuce, tomato, onions, pickles and...</p>
                        <button class="btn-add-to-order">
                            <span class="add-icon">🛒</span>
                            Add to order
                        </button>
                    </div>
                </div>

                <!-- Product Card 2 -->
                <div class="product-card">
                    <div class="product-badge">BURGERS</div>
                    <img src="https://via.placeholder.com/300x200" alt="Double Bacon Melt" class="product-image">
                    <div class="product-info">
                        <h3 class="product-name">Double Bacon Melt</h3>
                        <p class="product-price">$12.99</p>
                        <p class="product-description">Two beef patties, crispy bacon, melted swiss cheese, and...</p>
                        <button class="btn-add-to-order">
                            <span class="add-icon">🛒</span>
                            Add to order
                        </button>
                    </div>
                </div>

                <!-- Product Card 3 -->
                <div class="product-card">
                    <div class="product-badge">SIDES</div>
                    <img src="https://via.placeholder.com/300x200" alt="Golden Fries" class="product-image">
                    <div class="product-info">
                        <h3 class="product-name">Golden Fries</h3>
                        <p class="product-price">$3.99</p>
                        <p class="product-description">Crispy golden fries with sea salt</p>
                        <button class="btn-add-to-order">
                            <span class="add-icon">🛒</span>
                            Add to order
                        </button>
                    </div>
                </div>

                <!-- Product Card 4 -->
                <div class="product-card">
                    <div class="product-badge">DRINKS</div>
                    <img src="https://via.placeholder.com/300x200" alt="Cola Zero" class="product-image">
                    <div class="product-info">
                        <h3 class="product-name">Cola Zero</h3>
                        <p class="product-price">$2.50</p>
                        <p class="product-description">Chilled zero sugar cola with ice and a slice of lemon</p>
                        <button class="btn-add-to-order">
                            <span class="add-icon">🛒</span>
                            Add to order
                        </button>
                    </div>
                </div>

                <!-- Product Card 5 -->
                <div class="product-card">
                    <div class="product-badge">DESSERTS</div>
                    <img src="https://via.placeholder.com/300x200" alt="Donut Box" class="product-image">
                    <div class="product-info">
                        <h3 class="product-name">Donut Box</h3>
                        <p class="product-price">$6.00</p>
                        <p class="product-description">Assorted glazed and frosted donuts</p>
                        <button class="btn-add-to-order">
                            <span class="add-icon">🛒</span>
                            Add to order
                        </button>
                    </div>
                </div>

                <!-- Product Card 6 -->
                <div class="product-card">
                    <div class="product-badge">PIZZA</div>
                    <img src="https://via.placeholder.com/300x200" alt="Pepperoni Slice" class="product-image">
                    <div class="product-info">
                        <h3 class="product-name">Pepperoni Slice</h3>
                        <p class="product-price">$4.50</p>
                        <p class="product-description">Large NY style pizza with double pepperoni</p>
                        <button class="btn-add-to-order">
                            <span class="add-icon">🛒</span>
                            Add to order
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</main>

`
}
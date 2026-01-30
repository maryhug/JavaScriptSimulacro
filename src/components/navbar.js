/*
===================================
     COMPONENTE: Navbar
     Barra de navegación principal
===================================
*/

export function navbar(){
    return `
    
    <nav class="navbar">
    <div class="navbar-container">
        <!-- Logo y nombre de la app -->
        <div class="navbar-brand">
            <div class="navbar-logo">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M12 2L2 7L12 12L22 7L12 2Z" fill="currentColor"/>
                    <path d="M2 17L12 22L22 17" stroke="currentColor" stroke-width="2"/>
                    <path d="M2 12L12 17L22 12" stroke="currentColor" stroke-width="2"/>
                </svg>
            </div>
            <span class="navbar-title">RestorApp</span>
        </div>

        <!-- Navegación central -->
        <div class="navbar-menu">
            <a href="#dashboard" class="navbar-link active">Dashboard</a>
            <a href="#menu" class="navbar-link">Menu</a>
            <a href="#profile" class="navbar-link">Users</a>
        </div>

        <!-- Usuario y acciones -->
        <div class="navbar-actions">
            <button class="navbar-user">
                <img src="https://via.placeholder.com/40" alt="User" class="user-avatar">
            </button>
            <button class="btn-logout">Log Out</button>
        </div>
    </div>
</nav>
    
    `
}
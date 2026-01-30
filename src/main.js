// ============================================
// MAIN.JS - PUNTO DE ENTRADA
// ============================================

import Router from './router/Router.js';

function initializeApp() {
    const app = document.getElementById('app');

    app.innerHTML = `
        <nav id="navbar"></nav>
        <main id="main-content"></main>
    `;
}

document.addEventListener('DOMContentLoaded', () => {
    console.log('🍽️ RestorApp iniciando...');

    initializeApp();
    Router.init();

    console.log(`
    ╔══════════════════════════════════╗
    ║     RestorApp v1.0               ║
    ║     Con JSON Server              ║
    ╚══════════════════════════════════╝
    
    📝 Usuarios de prueba:
    👤 Usuario: user@restaurapp.com / user123
    ⚙️  Admin: admin@restaurapp.com / admin123
    
    🔌 API: http://localhost:3000
    `);
});

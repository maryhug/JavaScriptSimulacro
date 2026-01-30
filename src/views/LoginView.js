// ============================================
// VISTA DE LOGIN - MEJORADA
// ============================================

import { ROUTES, USER_ROLES } from '../utils/constants.js';
import { validateEmail, showNotification } from '../utils/helpers.js';
import AuthService from '../services/AuthService.js';

class LoginView {
    render() {
        const mainContent = document.getElementById('main-content');

        mainContent.innerHTML = `
            <div class="form-container">
                <div class="form-logo"></div>
                
                <h2 class="form-title">RestorApp</h2>
                <p class="form-subtitle">Login to your account</p>
                
                <form id="login-form">
                    <div class="form-group">
                        <label class="form-label" for="fullname">Full Name</label>
                        <input 
                            type="text" 
                            id="fullname" 
                            class="form-input" 
                            placeholder="e.g. John Doe"
                            style="padding-left: 1rem;"
                        >
                    </div>
                    
                    <div class="form-group">
                        <label class="form-label" for="email">Email Address</label>
                        <input 
                            type="email" 
                            id="email" 
                            class="form-input" 
                            placeholder="name@example.com"
                            required
                            style="padding-left: 1rem;"
                        >
                    </div>
                    
                    <div class="form-group">
                        <label class="form-label" for="role">Select Role</label>
                        <select id="role" class="form-select" style="padding-left: 1rem;">
                            <option value="user">User</option>
                            <option value="admin">Admin</option>
                        </select>
                    </div>
                    
                    <button type="submit" class="btn-primary">
                        Sign in
                    </button>
                </form>
                
                <p class="form-footer">
                    Don't have an account? <a href="#">Sign up</a>
                </p>
                
                <div class="test-credentials">
                    <p><strong>Usuarios de prueba:</strong></p>
                    <p>👤 <strong>Usuario:</strong> user@restaurapp.com / user123</p>
                    <p>⚙️ <strong>Admin:</strong> admin@restaurapp.com / admin123</p>
                </div>
            </div>
        `;

        document.getElementById('login-form')
            .addEventListener('submit', (e) => this.handleLogin(e));
    }

    async handleLogin(e) {
        e.preventDefault();

        const email = document.getElementById('email').value;
        // Usar un password fijo para simplificar
        const password = email.includes('admin') ? 'admin123' : 'user123';

        if (!validateEmail(email)) {
            showNotification('Email inválido', 'error');
            return;
        }

        const user = await AuthService.login(email, password);

        if (user) {
            if (user.role === USER_ROLES.ADMIN) {
                window.location.hash = ROUTES.ADMIN;
            } else {
                window.location.hash = ROUTES.MENU;
            }
        }
    }
}

export default new LoginView();

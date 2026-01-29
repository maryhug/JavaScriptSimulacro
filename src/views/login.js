/* ===================================
     VISTA: Login
     Página de inicio de sesión
=================================== */

export function login(){

return `

<div class="login-page">
    <div class="login-container">
        <div class="login-card">
            <!-- Logo -->
            <div class="login-logo">
                <div class="logo-icon">🍴</div>
            </div>

            <!-- Título -->
            <h1 class="login-title">RestorApp</h1>
            <p class="login-subtitle">Login to your account</p>

            <!-- Formulario -->
            <form class="login-form">
                <div class="form-group">
                    <label class="form-label">Full Name</label>
                    <div class="input-wrapper">
                        <span class="input-icon">👤</span>
                        <input type="text" class="form-input" placeholder="e.g. John Doe">
                    </div>
                </div>

                <div class="form-group">
                    <label class="form-label">Email Address</label>
                    <div class="input-wrapper">
                        <span class="input-icon">✉️</span>
                        <input type="email" class="form-input" placeholder="name@example.com">
                    </div>
                </div>

                <div class="form-group">
                    <label class="form-label">Select Role</label>
                    <div class="input-wrapper">
                        <span class="input-icon">👔</span>
                        <select class="form-select">
                            <option value="">User</option>
                            <option value="admin">Admin</option>
                            <option value="chef">Chef</option>
                        </select>
                    </div>
                </div>

                <button type="submit" class="btn btn-primary btn-full">Sign In</button>
            </form>

            <!-- Footer -->
            <div class="login-footer">
                <p>Don't have an account? <a href="#" class="link-primary">Sign up</a></p>
            </div>

            <div class="login-credits">
                Riwistory Academic Simulation
            </div>
        </div>
    </div>
</div>

`
}
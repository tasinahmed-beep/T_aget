import { loginWithGoogle, logout, onUserChange } from '../auth';

export const Header = () => `
  <header>
    <div class="nav-container">
      <a href="/" class="logo-text">⚡ QuickTools</a>
      
      <div style="display: flex; align-items: center; gap: 2rem;">
        <nav>
          <a href="/">Home</a>
          <a href="/about">About</a>
          <a href="/contact">Contact</a>
        </nav>

        <div id="auth-container">
          <button id="login-btn">Login</button>
          <div id="user-profile" style="display: none;">
            <img id="user-photo" src="" alt="Profile" />
            <span id="user-name"></span>
            <button id="logout-btn" class="secondary" style="padding: 0.4em 0.8em; font-size: 0.8em;">Logout</button>
          </div>
        </div>
      </div>
    </div>
  </header>
`;

export const Footer = () => `
  <footer>
    <div style="margin-bottom: 1rem;">
      <a href="/privacy">Privacy Policy</a>
      <a href="/about">About Us</a>
      <a href="/contact">Contact</a>
    </div>
    <div>&copy; ${new Date().getFullYear()} QuickTools. All rights reserved.</div>
  </footer>
`;

export function initAuthListeners() {
    const loginBtn = document.getElementById('login-btn');
    const logoutBtn = document.getElementById('logout-btn');
    const userProfile = document.getElementById('user-profile') as HTMLDivElement;
    const userPhoto = document.getElementById('user-photo') as HTMLImageElement;
    const userName = document.getElementById('user-name') as HTMLSpanElement;

    if (loginBtn) {
        loginBtn.addEventListener('click', async () => {
            try {
                await loginWithGoogle();
            } catch (error) {
                alert('Failed to login');
            }
        });
    }

    if (logoutBtn) {
        logoutBtn.addEventListener('click', async () => {
            try {
                await logout();
            } catch (error) {
                alert('Failed to logout');
            }
        });
    }

    onUserChange((user) => {
        if (user && loginBtn && userProfile) {
            loginBtn.style.display = 'none';
            userProfile.style.display = 'flex';
            userPhoto.src = user.photoURL || '';
            userName.textContent = user.displayName?.split(' ')[0] || 'User';
        } else if (loginBtn && userProfile) {
            loginBtn.style.display = 'block';
            userProfile.style.display = 'none';
        }
    });
}

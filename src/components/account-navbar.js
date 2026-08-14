import { LitElement, html, css } from 'lit'

class AccountNavbar extends LitElement {

  static styles = css`
    * {
      box-sizing: border-box;
    }

    nav {
      width: 100%;
      height: 76px;
      background: #ffffff;
      border-bottom: 1px solid #e5e7eb;

      display: flex;
      align-items: center;
      justify-content: space-between;

      padding: 0 50px;
      font-family: Arial, sans-serif;
    }

    .logo {
      display: flex;
      align-items: center;
      gap: 10px;
      font-size: 24px;
      font-weight: bold;
      color: #111827;
    }

    .logo-icon {
      width: 42px;
      height: 42px;
      border-radius: 50%;
      background: #2563eb;
      color: white;

      display: flex;
      align-items: center;
      justify-content: center;

      font-size: 20px;
      font-weight: bold;
    }

    .blue {
      color: #2563eb;
    }

    .links {
      display: flex;
      align-items: center;
      gap: 12px;
    }

    button {
      border: none;
      background: transparent;
      color: #475569;

      padding: 11px 16px;
      border-radius: 8px;

      font-size: 15px;
      font-weight: 600;
      cursor: pointer;
    }

    button:hover,
    button:focus {
      background: #eff6ff;
      color: #2563eb;
    }

    .logout {
      color: #64748b;
    }

    @media (max-width: 700px) {
      nav {
        padding: 0 15px;
      }

      .logo {
        font-size: 18px;
      }

      .logo-icon {
        width: 35px;
        height: 35px;
      }

      button {
        padding: 8px;
        font-size: 13px;
      }
    }
  `

  navigate(page) {
    this.dispatchEvent(
      new CustomEvent('navigate-page', {
        detail: page,
        bubbles: true,
        composed: true
      })
    )
  }

  logout() {
    this.dispatchEvent(
      new CustomEvent('logout-user', {
        bubbles: true,
        composed: true
      })
    )
  }

  render() {
    return html`
      <nav>

        <div class="logo">
          <div class="logo-icon">E</div>
          <span>Electro<span class="blue">Shop</span></span>
        </div>

        <div class="links">

          <button @click=${() => this.navigate('profile')}>
            Profile
          </button>

          <button @click=${() => this.navigate('orders')}>
            Orders
          </button>

          <button @click=${() => this.navigate('wishlist')}>
            Wishlist
          </button>

          <button
            class="logout"
            @click=${this.logout}>
            Logout
          </button>

        </div>

      </nav>
    `
  }
}

customElements.define('account-navbar', AccountNavbar)
import { LitElement, html, css } from 'lit'

import '@material/web/button/text-button.js'

class AccountNavbar extends LitElement {

  static styles = css`
    nav {
      background: #6750a4;
      padding: 18px 30px;

      display: flex;
      align-items: center;
      justify-content: space-between;

      color: white;
    }
      md-text-button:hover {
  background: #4f378b;
}

md-text-button:focus {
  background: #dcd7ea;
}

    h2 {
      margin: 0;
    }

    .links {
      display: flex;
      gap: 8px;
    }

    md-text-button {
      --md-text-button-label-text-color: white;
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

        <h2>My Account</h2>

        <div class="links">

          <md-text-button
            @click=${() => this.navigate('profile')}>
            Profile
          </md-text-button>

          <md-text-button
            @click=${() => this.navigate('orders')}>
            Orders
          </md-text-button>

          <md-text-button
            @click=${() => this.navigate('wishlist')}>
            Wishlist
          </md-text-button>

          <md-text-button
            @click=${this.logout}>
            Logout
          </md-text-button>

        </div>

      </nav>
    `
  }
}

customElements.define(
  'account-navbar',
  AccountNavbar
)
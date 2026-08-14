import { LitElement, html, css } from 'lit'
import '../components/account-navbar.js'

class WishlistPage extends LitElement {

  static styles = css`
    * {
      box-sizing: border-box;
    }

    :host {
      display: block;
      font-family: Arial, sans-serif;
      background: #f6f8fc;
      min-height: 100vh;
    }

    main {
      max-width: 1100px;
      margin: auto;
      padding: 45px 25px;
    }

    h1 {
      margin: 0 0 8px;
      color: #111827;
      font-size: 30px;
    }

    .subtitle {
      color: #64748b;
      margin-bottom: 30px;
    }

    .products {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 20px;
    }

    .product {
      background: white;
      border: 1px solid #e5e7eb;
      border-radius: 14px;
      padding: 22px;
    }

    .image {
      height: 150px;
      background: #f1f5f9;
      border-radius: 10px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 45px;
      margin-bottom: 18px;
    }

    h3 {
      margin: 0 0 8px;
      color: #111827;
    }

    .price {
      color: #2563eb;
      font-weight: bold;
      font-size: 18px;
      margin-bottom: 18px;
    }

    button {
      width: 100%;
      padding: 11px;
      border: none;
      border-radius: 8px;
      background: #2563eb;
      color: white;
      font-weight: 600;
      cursor: pointer;
    }

    button:hover {
      background: #1d4ed8;
    }

    @media (max-width: 750px) {
      .products {
        grid-template-columns: 1fr;
      }
    }
  `

  render() {
    return html`


      <main>

        <h1>My Wishlist</h1>

        <div class="subtitle">
          Products you saved for later
        </div>

        <div class="products">

          <div class="product">
            <div class="image">🎧</div>
            <h3>Wireless Headphones</h3>
            <div class="price">$79.99</div>
            <button>Add to Cart</button>
          </div>

          <div class="product">
            <div class="image">⌚</div>
            <h3>Smart Watch</h3>
            <div class="price">$149.99</div>
            <button>Add to Cart</button>
          </div>

          <div class="product">
            <div class="image">📱</div>
            <h3>Smartphone</h3>
            <div class="price">$699.99</div>
            <button>Add to Cart</button>
          </div>

        </div>

      </main>
    `
  }
}

customElements.define('wishlist-page', WishlistPage)
import { LitElement, html, css } from 'lit'

class WishlistPage extends LitElement {

  static styles = css`
    * {
      box-sizing: border-box;
    }

    :host {
      display: block;
      background: #f6f8fc;
      min-height: 100vh;
      font-family: Arial, Helvetica, sans-serif;
      color: #111827;
    }

    main {
      max-width: 1100px;
      margin: auto;
      padding: 45px 25px;
    }

    .back-button {
      width: auto;

      margin-bottom: 25px;
      padding: 9px 14px;

      background: white;
      color: #526071;

      border: 1px solid #e1e6ed;
      border-radius: 9px;

      font-size: 14px;
      font-weight: 600;

      cursor: pointer;
    }

    .back-button:hover {
      color: #2167dc;
      border-color: #2167dc;
    }

    h1 {
      margin: 0 0 8px;
      color: #15233c;
      font-size: 30px;
    }

    .subtitle {
      color: #64748b;
      margin-bottom: 30px;
    }

    .products {
      display: grid;

      grid-template-columns:
        repeat(3, 1fr);

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
    }

    .price {
      color: #2563eb;

      font-size: 18px;
      font-weight: bold;

      margin-bottom: 18px;
    }

    .cart-button {
      width: 100%;

      padding: 11px;

      border: none;
      border-radius: 8px;

      background: #2563eb;
      color: white;

      font-weight: 600;
      cursor: pointer;
    }

    .empty {
      background: white;

      border: 1px solid #e5e7eb;
      border-radius: 15px;

      padding: 45px;

      text-align: center;
      color: #64748b;
    }

    @media (max-width: 750px) {
      .products {
        grid-template-columns: 1fr;
      }
    }
  `

  backToProfile() {
    this.dispatchEvent(
      new CustomEvent('navigate-page', {
        detail: 'profile',
        bubbles: true,
        composed: true
      })
    )
  }

  render() {

    const hasProfileData =
      localStorage.getItem(
        'hasProfileData'
      ) === 'true'

    return html`
      <main>

        <button
          class="back-button"
          @click=${this.backToProfile}>
          ← Back to Profile
        </button>

        <h1>My Wishlist</h1>

        <div class="subtitle">
          Products you saved for later
        </div>

        ${
          hasProfileData
            ? html`
                <div class="products">

                  <div class="product">

                    <div class="image">
                      🎧
                    </div>

                    <h3>
                      Wireless Headphones
                    </h3>

                    <div class="price">
                      $79.99
                    </div>

                    <button class="cart-button">
                      Add to Cart
                    </button>

                  </div>

                  <div class="product">

                    <div class="image">
                      ⌚
                    </div>

                    <h3>
                      Smart Watch
                    </h3>

                    <div class="price">
                      $149.99
                    </div>

                    <button class="cart-button">
                      Add to Cart
                    </button>

                  </div>

                  <div class="product">

                    <div class="image">
                      📱
                    </div>

                    <h3>
                      Smartphone
                    </h3>

                    <div class="price">
                      $699.99
                    </div>

                    <button class="cart-button">
                      Add to Cart
                    </button>

                  </div>

                </div>
              `
            : html`
                <div class="empty">
                  ♡
                  <br><br>
                  Your wishlist is empty
                </div>
              `
        }

      </main>
    `
  }
}

customElements.define(
  'wishlist-page',
  WishlistPage
)
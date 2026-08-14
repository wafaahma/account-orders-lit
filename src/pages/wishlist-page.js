import { LitElement, html, css } from 'lit'

import { wishlist } from '../data/mock-data.js'

import '@material/web/button/filled-button.js'
import '@material/web/button/outlined-button.js'

class WishlistPage extends LitElement {

  static properties = {
    items: { type: Array }
  }

  constructor() {
    super()

    this.items = [...wishlist]
  }

  static styles = css`
    .container {
      max-width: 900px;
      margin: 40px auto;
      padding: 0 20px;
    }

    .subtitle {
      color: #625b71;
      margin-bottom: 30px;
    }

    .grid {
      display: grid;

      grid-template-columns:
        repeat(auto-fit, minmax(220px, 1fr));

      gap: 20px;
    }

    .product {
      background: white;

      padding: 25px;

      border-radius: 18px;

      box-shadow:
        0 4px 15px rgba(0,0,0,0.07);
    }

    .image {
      height: 120px;

      background: #eee8f4;

      border-radius: 14px;

      display: flex;
      align-items: center;
      justify-content: center;

      font-size: 45px;
    }

    .price {
      color: #6750a4;
      font-size: 20px;
      font-weight: bold;
    }

    .buttons {
      display: grid;
      gap: 10px;

      margin-top: 20px;
    }
  `

  removeItem(id) {
    this.items =
      this.items.filter(
        item => item.id !== id
      )
  }

  addToCart(name) {
    alert(`${name} added to cart`)
  }

  render() {
    return html`
      <div class="container">

        <h1>My Wishlist</h1>

        <div class="subtitle">
          Products you saved for later
        </div>

        ${this.items.length === 0
          ? html`
              <p>Your wishlist is empty.</p>
            `
          : html`
              <div class="grid">

                ${this.items.map(
                  item => html`

                    <div class="product">

                      <div class="image">
                        ♡
                      </div>

                      <h3>
                        ${item.name}
                      </h3>

                      <div class="price">
                        $${item.price.toFixed(2)}
                      </div>

                      <div class="buttons">

                        <md-filled-button
                          @click=${() =>
                            this.addToCart(
                              item.name
                            )}>
                          Add to Cart
                        </md-filled-button>

                        <md-outlined-button
                          @click=${() =>
                            this.removeItem(
                              item.id
                            )}>
                          Remove
                        </md-outlined-button>

                      </div>

                    </div>

                  `
                )}

              </div>
            `
        }

      </div>
    `
  }
}

customElements.define(
  'wishlist-page',
  WishlistPage
)
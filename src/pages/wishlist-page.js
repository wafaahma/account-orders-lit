import { LitElement, html, css } from 'lit'

class WishlistPage extends LitElement {

  static properties = {
    products: {
      state: true
    }
  }

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

      margin-bottom: 18px;

      overflow: hidden;
    }

    .image img {
      width: 100%;
      height: 100%;
      object-fit: contain;
    }

    .category {
      color: #64748b;
      font-size: 13px;
      margin-bottom: 7px;
    }

    h3 {
      margin: 0 0 8px;
      color: #15233c;
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

    .cart-button:hover {
      background: #1d4ed8;
    }

    .empty {
      background: white;

      border: 1px solid #e5e7eb;
      border-radius: 15px;

      padding: 45px;

      text-align: center;
      color: #64748b;
    }

    .empty-icon {
      font-size: 45px;
      margin-bottom: 15px;
    }

    @media (max-width: 750px) {
      .products {
        grid-template-columns: 1fr;
      }
    }
  `

  constructor() {
    super()

    this.products = []

    this.handleWishlistUpdate =
      this.handleWishlistUpdate.bind(this)

    this.handleMessage =
      this.handleMessage.bind(this)
  }

  connectedCallback() {
    super.connectedCallback()

    /*
     * Receive wishlist event from Catalog
     * when Catalog is in the same window.
     */
    window.addEventListener(
      'ElectroShop:wishlist-updated',
      this.handleWishlistUpdate
    )

    /*
     * Receive message from Host
     * when Microfrontends communicate
     * through postMessage.
     */
    window.addEventListener(
      'message',
      this.handleMessage
    )
  }

  disconnectedCallback() {

    window.removeEventListener(
      'ElectroShop:wishlist-updated',
      this.handleWishlistUpdate
    )

    window.removeEventListener(
      'message',
      this.handleMessage
    )

    super.disconnectedCallback()
  }

  

  handleWishlistUpdate(event) {

    const detail =
      event.detail || {}

    const {
      productId,
      liked,
      product
    } = detail

    if (!productId || !product) {
      return
    }

    this.updateWishlist(
      productId,
      liked,
      product
    )
  }

  
  handleMessage(event) {

    const data = event.data

    if (
      !data ||
      data.type !==
        'ElectroShop:wishlist-updated'
    ) {
      return
    }

    const {
      productId,
      liked,
      product
    } = data

    if (!productId || !product) {
      return
    }

    this.updateWishlist(
      productId,
      liked,
      product
    )
  }


  updateWishlist(
    productId,
    liked,
    product
  ) {

    if (liked === true) {

      const exists =
        this.products.some(
          item =>
            item.id === productId
        )

      if (!exists) {

        this.products = [
          ...this.products,
          product
        ]

      }

      return
    }

    if (liked === false) {

      this.products =
        this.products.filter(
          item =>
            item.id !== productId
        )

    }
  }

  
  addToCart(product) {

    /*
     * Send event inside the same window
     */
    window.dispatchEvent(
      new CustomEvent(
        'ElectroShop:add-to-cart',
        {
          detail: {
            productId: product.id,
            delta: 1,
            product
          }
        }
      )
    )

    /*
     * Send event to Host
     */
    if (
      window.parent !== window
    ) {

      window.parent.postMessage(
        {
          type:
            'ElectroShop:add-to-cart',

          productId:
            product.id,

          delta: 1,

          product
        },
        '*'
      )

    }
  }

  
  backToProfile() {

    this.dispatchEvent(
      new CustomEvent(
        'navigate-page',
        {
          detail: 'profile',
          bubbles: true,
          composed: true
        }
      )
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
          @click=${this.backToProfile}
        >
          ← Back to Profile
        </button>

        <h1>
          My Wishlist
        </h1>

        <div class="subtitle">
          Products you saved for later
        </div>

        ${
          !hasProfileData
            ? html`

                <div class="empty">

                  <div class="empty-icon">
                    ♡
                  </div>

                  Your wishlist is empty

                </div>

              `
            : this.products.length === 0
              ? html`

                  <div class="empty">

                    <div class="empty-icon">
                      ♡
                    </div>

                    Your wishlist is empty

                  </div>

                `
              : html`

                  <div class="products">

                    ${
                      this.products.map(
                        product => html`

                          <div
                            class="product"
                          >

                            <div
                              class="image"
                            >

                              <img
                                src="${product.image}"
                                alt="${product.name}"
                              />

                            </div>

                            <div
                              class="category"
                            >
                              ${
                                product.category ||
                                ''
                              }
                            </div>

                            <h3>
                              ${product.name}
                            </h3>

                            <div
                              class="price"
                            >
                              ${
                                typeof product.price ===
                                'number'
                                  ? `$${product.price}`
                                  : product.price
                              }
                            </div>

                            <button
                              class="cart-button"
                              @click=${() =>
                                this.addToCart(
                                  product
                                )}
                            >
                              Add to Cart
                            </button>

                          </div>

                        `
                      )
                    }

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
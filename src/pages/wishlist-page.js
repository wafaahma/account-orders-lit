import {
  LitElement,
  html,
  css
} from "lit";

class WishlistPage extends LitElement {

  static properties = {
    products: {
      state: true
    },

    addedProductId: {
      state: true
    }
  };

  static styles = css`

    * {
      box-sizing: border-box;
    }

    :host {
      display: block;

      background: #f6f8fc;

      min-height: 100vh;

      font-family:
        Arial,
        Helvetica,
        sans-serif;

      color: #111827;
    }

    main {
      max-width: 1100px;

      margin: auto;

      padding: 45px 25px;
    }

    /* =================================
       BACK BUTTON
    ================================= */

    .back-button {
      width: auto;

      margin-bottom: 25px;

      padding: 9px 14px;

      background: white;

      color: #526071;

      border:
        1px solid #e1e6ed;

      border-radius: 9px;

      font-size: 14px;

      font-weight: 600;

      cursor: pointer;

      transition: .2s;
    }

    .back-button:hover {
      color: #2167dc;

      border-color: #2167dc;
    }

    /* =================================
       TITLE
    ================================= */

    h1 {
      margin: 0 0 8px;

      color: #15233c;

      font-size: 30px;
    }

    .subtitle {
      color: #64748b;

      margin-bottom: 30px;
    }

    /* =================================
       PRODUCTS
    ================================= */

    .products {
      display: grid;

      grid-template-columns:
        repeat(3, 1fr);

      gap: 20px;
    }

    .product {
      background: white;

      border:
        1px solid #e5e7eb;

      border-radius: 14px;

      padding: 22px;

      transition:
        transform .2s,
        box-shadow .2s;
    }

    .product:hover {
      transform:
        translateY(-3px);

      box-shadow:
        0 10px 25px
        rgba(22, 53, 95, .08);
    }

    /* =================================
       IMAGE
    ================================= */

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

    /* =================================
       CATEGORY
    ================================= */

    .category {
      color: #64748b;

      font-size: 13px;

      margin-bottom: 7px;
    }

    /* =================================
       PRODUCT NAME
    ================================= */

    h3 {
      margin: 0 0 8px;

      color: #15233c;

      font-size: 18px;

      line-height: 1.4;
    }

    /* =================================
       PRICE
    ================================= */

    .price {
      color: #2563eb;

      font-size: 18px;

      font-weight: bold;

      margin-bottom: 18px;
    }

    /* =================================
       CART BUTTON
    ================================= */

    .cart-button {
      width: 100%;

      padding: 11px;

      border: none;

      border-radius: 8px;

      background: #2563eb;

      color: white;

      font-weight: 600;

      cursor: pointer;

      transition: .2s;
    }

    .cart-button:hover {
      background: #1d4ed8;
    }

    .cart-button.added {
      background: #2aa66f;
    }

    /* =================================
       EMPTY
    ================================= */

    .empty {
      background: white;

      border:
        1px solid #e5e7eb;

      border-radius: 15px;

      padding: 45px;

      text-align: center;

      color: #64748b;
    }

    .empty-icon {
      font-size: 45px;

      margin-bottom: 15px;

      color: #2167dc;
    }

    /* =================================
       RESPONSIVE
    ================================= */

    @media (max-width: 900px) {

      .products {
        grid-template-columns:
          repeat(2, 1fr);
      }

    }

    @media (max-width: 750px) {

      main {
        padding:
          30px 18px;
      }

      .products {
        grid-template-columns:
          1fr;
      }

      h1 {
        font-size: 26px;
      }

    }

  `;

  constructor() {

    super();

    this.products = [];

    this.addedProductId = null;

    this.handleMessage =
      this.handleMessage.bind(this);
  }

  // ==========================================
  // CONNECTED
  // ==========================================

  connectedCallback() {

    super.connectedCallback();

    window.addEventListener(
      "message",
      this.handleMessage
    );

    // Ask Shell for wishlist
    window.parent.postMessage(
      {
        type: "GET_WISHLIST"
      },
      "*"
    );
  }

  // ==========================================
  // DISCONNECTED
  // ==========================================

  disconnectedCallback() {

    window.removeEventListener(
      "message",
      this.handleMessage
    );

    super.disconnectedCallback();
  }

  // ==========================================
  // MESSAGE HANDLER
  // ==========================================

  handleMessage(event) {

    const data = event.data;

    if (!data?.type) {
      return;
    }

    // ========================================
    // INITIAL WISHLIST
    // ========================================

    if (
      data.type === "WISHLIST_DATA"
    ) {

      const wishlist =
        Array.isArray(data.wishlist)
          ? data.wishlist
          : [];

      this.products =
        wishlist
          .map(
            item => item.product
          )
          .filter(Boolean);

      return;
    }

    // ========================================
    // WISHLIST UPDATED
    // ========================================

    if (
      data.type ===
      "WISHLIST_UPDATED"
    ) {

      const {
        productId,
        liked,
        product
      } = data;

      if (
        !productId ||
        !product
      ) {
        return;
      }

      this.updateWishlist(
        productId,
        liked,
        product
      );

      return;
    }

    // ========================================
    // CART UPDATED
    // ========================================

    if (
      data.type === "CART_UPDATED" &&
      data.success === true
    ) {

      this.addedProductId =
        data.productId;

      setTimeout(() => {

        this.addedProductId = null;

      }, 2000);

      return;
    }
  }

  // ==========================================
  // UPDATE WISHLIST
  // ==========================================

  updateWishlist(
    productId,
    liked,
    product
  ) {

    // ADD
    if (liked === true) {

      const exists =
        this.products.some(
          item =>
            item.id === productId
        );

      if (!exists) {

        this.products = [
          ...this.products,
          product
        ];

      }

      return;
    }

    // REMOVE
    if (liked === false) {

      this.products =
        this.products.filter(
          item =>
            item.id !== productId
        );
    }
  }

  // ==========================================
  // ADD TO CART
  // ==========================================

  addToCart(product) {

    window.parent.postMessage(
      {
        type: "ADD_TO_CART",

        productId:
          product.id,

        product:
          product,

        delta: 1
      },
      "*"
    );
  }

  // ==========================================
  // BACK TO PROFILE
  // ==========================================

  backToProfile() {

    window.parent.postMessage(
      {
        type: "NAVIGATE",

        path:
          "/account/profile"
      },
      "*"
    );
  }

  // ==========================================
  // RENDER
  // ==========================================

  render() {

    return html`

      <main>

        <!-- BACK -->

        <button
          class="back-button"
          @click=${this.backToProfile}
        >
          ← Back to Profile
        </button>

        <!-- TITLE -->

        <h1>
          My Wishlist
        </h1>

        <div class="subtitle">
          Products you saved for later
        </div>

        <!-- EMPTY -->

        ${
          this.products.length === 0

            ? html`

                <div class="empty">

                  <div
                    class="empty-icon"
                  >
                    ♡
                  </div>

                  <div>
                    Your wishlist is empty
                  </div>

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

                          <!-- IMAGE -->

                          <div
                            class="image"
                          >

                            <img
                              src="${product.image}"
                              alt="${product.name}"
                            />

                          </div>

                          <!-- CATEGORY -->

                          <div
                            class="category"
                          >
                            ${
                              product.category ||
                              ""
                            }
                          </div>

                          <!-- NAME -->

                          <h3>
                            ${product.name}
                          </h3>

                          <!-- PRICE -->

                          <div
                            class="price"
                          >
                            ${
                              typeof product.price ===
                              "number"

                                ? `$${product.price}`

                                : product.price
                            }
                          </div>

                          <!-- CART -->

                          <button
                            class="cart-button ${
                              this.addedProductId ===
                              product.id
                                ? "added"
                                : ""
                            }"

                            @click=${() =>
                              this.addToCart(
                                product
                              )}
                          >

                            ${
                              this.addedProductId ===
                              product.id
                                ? "Added to Cart ✓"
                                : "Add to Cart"
                            }

                          </button>

                        </div>

                      `
                    )
                  }

                </div>

              `
        }

      </main>

    `;
  }
}

customElements.define(
  "wishlist-page",
  WishlistPage
);
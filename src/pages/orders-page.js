import { LitElement, html, css } from 'lit'

class OrdersPage extends LitElement {

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

    .container {
      max-width: 1100px;
      margin: 0 auto;
      padding: 45px 40px;
    }

    .back-button {
      display: inline-flex;
      align-items: center;
      gap: 8px;

      margin-bottom: 25px;
      padding: 9px 14px;

      background: white;
      color: #526071;

      border: 1px solid #e1e6ed;
      border-radius: 9px;

      font-family: inherit;
      font-size: 14px;
      font-weight: 600;

      cursor: pointer;

      transition:
        background 0.2s,
        color 0.2s,
        border-color 0.2s;
    }

    .back-button:hover {
      background: #f4f7fc;
      color: #2167dc;
      border-color: #2167dc;
    }

    h1 {
      margin: 0;
      font-size: 34px;
      color: #15233c;
    }

    .subtitle {
      margin-top: 8px;
      margin-bottom: 35px;

      color: #64748b;
      font-size: 17px;
    }

    .order-card {
      background: white;

      border: 1px solid #e5e7eb;
      border-radius: 15px;

      padding: 25px;
      margin-bottom: 20px;

      transition:
        transform 0.2s,
        box-shadow 0.2s;
    }

    .order-card:hover {
      transform: translateY(-2px);

      box-shadow:
        0 6px 18px rgba(0, 0, 0, 0.05);
    }

    .order-top {
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 15px;
    }

    .order-number {
      font-size: 18px;
      font-weight: bold;
      color: #15233c;
    }

    .status {
      background: #dcfce7;
      color: #15803d;

      padding: 7px 14px;
      border-radius: 20px;

      font-size: 13px;
      font-weight: bold;
    }

    .processing {
      background: #fef3c7;
      color: #b45309;
    }

    .order-info {
      display: flex;
      justify-content: space-between;
      align-items: center;

      margin-top: 22px;
      padding-top: 18px;

      border-top: 1px solid #f1f5f9;
    }

    .date {
      color: #64748b;
      font-size: 14px;
    }

    .price {
      color: #2563eb;
      font-weight: bold;
      font-size: 18px;
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
      font-size: 42px;
      margin-bottom: 15px;
    }

    .empty-title {
      margin-bottom: 7px;
      color: #15233c;
      font-size: 18px;
      font-weight: 700;
    }

    .empty-text {
      font-size: 14px;
      color: #64748b;
    }

    @media (max-width: 700px) {
      .container {
        padding: 30px 18px;
      }

      h1 {
        font-size: 28px;
      }

      .order-top {
        align-items: flex-start;
      }

      .order-info {
        gap: 15px;
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
      <div class="container">

        <button
          class="back-button"
          @click=${this.backToProfile}
        >
          ← Back to Profile
        </button>

        <h1>My Orders</h1>

        <div class="subtitle">
          View and track your recent orders
        </div>

        ${
          hasProfileData
            ? html`

                <div class="order-card">

                  <div class="order-top">

                    <div class="order-number">
                      Order #1001
                    </div>

                    <div class="status">
                      Delivered
                    </div>

                  </div>

                  <div class="order-info">

                    <div class="date">
                      August 10, 2026
                    </div>

                    <div class="price">
                      $129.99
                    </div>

                  </div>

                </div>


                <div class="order-card">

                  <div class="order-top">

                    <div class="order-number">
                      Order #1002
                    </div>

                    <div class="status processing">
                      Processing
                    </div>

                  </div>

                  <div class="order-info">

                    <div class="date">
                      August 14, 2026
                    </div>

                    <div class="price">
                      $249.99
                    </div>

                  </div>

                </div>

              `
            : html`

                <div class="empty">

                  <div class="empty-icon">
                    📦
                  </div>

                  <div class="empty-title">
                    No orders available
                  </div>

                  <div class="empty-text">
                    Your orders will appear here.
                  </div>

                </div>

              `
        }

      </div>
    `
  }
}

customElements.define(
  'orders-page',
  OrdersPage
)

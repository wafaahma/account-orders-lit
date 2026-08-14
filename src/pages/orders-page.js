 import { LitElement, html, css } from 'lit'

class OrdersPage extends LitElement {

  static styles = css`
    :host {
      display: block;
      background: #f6f8fc;
      min-height: calc(100vh - 100px);
      font-family: Arial, Helvetica, sans-serif;
      color: #111827;
    }

    .container {
      padding: 55px 40px;
    }

    h1 {
      margin: 0;
      font-size: 34px;
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
    }

    .order-top {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .order-number {
      font-size: 18px;
      font-weight: bold;
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
      margin-top: 22px;
    }

    .date {
      color: #64748b;
    }

    .price {
      color: #2563eb;
      font-weight: bold;
      font-size: 18px;
    }
  `

  render() {
    return html`
      <div class="container">

        <h1>My Orders</h1>

        <div class="subtitle">
          View and track your recent orders
        </div>

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

      </div>
    `
  }
}

customElements.define(
  'orders-page',
  OrdersPage
)
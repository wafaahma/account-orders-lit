import { LitElement, html, css } from 'lit'

import { orders } from '../data/mock-data.js'

import '@material/web/button/outlined-button.js'

class OrdersPage extends LitElement {

  static styles = css`
    .container {
      max-width: 900px;
      margin: 40px auto;
      padding: 0 20px;
    }

    h1 {
      margin-bottom: 8px;
    }

    .subtitle {
      color: #625b71;
      margin-bottom: 30px;
    }

    .order {
      background: white;

      margin-bottom: 20px;
      padding: 25px;

      border-radius: 18px;

      box-shadow:
        0 4px 15px rgba(0,0,0,0.07);
    }

    .top {
      display: flex;
      justify-content: space-between;
      gap: 20px;
    }

    .id {
      font-weight: bold;
      font-size: 18px;
    }

    .status {
      color: #6750a4;
      font-weight: bold;
    }

    .details {
      margin-top: 20px;

      display: flex;
      justify-content: space-between;

      color: #625b71;
    }

    .total {
      font-weight: bold;
      color: #1d1b20;
    }
  `

  viewOrder(id) {
    alert(`Viewing ${id}`)
  }

  render() {
    return html`
      <div class="container">

        <h1>Order History</h1>

        <div class="subtitle">
          View and manage your previous orders
        </div>

        ${orders.map(
          order => html`

            <div class="order">

              <div class="top">

                <span class="id">
                  ${order.id}
                </span>

                <span class="status">
                  ${order.status}
                </span>

              </div>

              <div class="details">

                <span>
                  ${order.date}
                </span>

                <span class="total">
                  $${order.total.toFixed(2)}
                </span>

              </div>

              <br>

              <md-outlined-button
                @click=${() =>
                  this.viewOrder(order.id)}>
                View Details
              </md-outlined-button>

            </div>

          `
        )}

      </div>
    `
  }
}

customElements.define(
  'orders-page',
  OrdersPage
)
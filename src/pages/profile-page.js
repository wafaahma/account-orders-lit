import { LitElement, html, css } from 'lit'

class ProfilePage extends LitElement {

  static properties = {
    user: { type: Object },
    editing: { type: Boolean }
  }

  constructor() {
    super()

    this.editing = false

    this.user = {
      name: '',
      email: '',
      phone: '',
      address: ''
    }
  }

  static styles = css`
    * {
      box-sizing: border-box;
    }

    :host {
      display: block;
      min-height: 100vh;
      background: #f6f8fc;
      font-family: Arial, Helvetica, sans-serif;
      color: #111827;
    }

    main {
      max-width: 1000px;
      margin: 0 auto;
      padding: 45px 25px;
    }

    .welcome {
      margin-bottom: 30px;
    }

    .welcome h1 {
      margin: 0 0 8px;
      font-size: 32px;
      color: #15233c;
    }

    .welcome p {
      margin: 0;
      color: #64748b;
    }

    .profile-card {
      background: white;
      border: 1px solid #e5e7eb;
      border-radius: 18px;
      padding: 30px;
      margin-bottom: 30px;

      box-shadow:
        0 5px 18px rgba(0,0,0,0.04);
    }

    .profile-header {
      display: flex;
      gap: 25px;
      align-items: flex-start;
    }

    .avatar {
      width: 85px;
      height: 85px;
      min-width: 85px;

      border-radius: 50%;
      background: #2167dc;
      color: white;

      display: flex;
      align-items: center;
      justify-content: center;

      font-size: 30px;
      font-weight: bold;
    }

    .profile-details {
      flex: 1;
    }

    .profile-details h2 {
      margin: 0 0 14px;
      color: #15233c;
    }

    .details {
      display: flex;
      flex-wrap: wrap;
      gap: 12px 30px;

      color: #64748b;
      font-size: 14px;
    }

    .details strong {
      color: #374151;
    }

    .edit-profile {
      margin-top: 18px;

      padding: 10px 20px;

      border: none;
      border-radius: 8px;

      background: #2167dc;
      color: white;

      font-weight: 600;
      cursor: pointer;
    }

    .edit-form {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 18px;

      margin-top: 20px;
    }

    label {
      display: block;
      margin-bottom: 6px;

      font-size: 13px;
      font-weight: 600;
      color: #374151;
    }

    input {
      width: 100%;
      padding: 11px;

      border: 1px solid #d1d5db;
      border-radius: 8px;

      outline: none;
    }

    input:focus {
      border-color: #2167dc;
    }

    .edit-actions {
      display: flex;
      gap: 10px;
      margin-top: 18px;
    }

    .save,
    .cancel {
      padding: 10px 18px;
      border-radius: 8px;
      font-weight: 600;
      cursor: pointer;
    }

    .save {
      border: none;
      background: #2167dc;
      color: white;
    }

    .cancel {
      border: 1px solid #d1d5db;
      background: white;
      color: #374151;
    }

    .section-title {
      font-size: 20px;
      color: #15233c;
    }

    .actions-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 18px;
    }

    .action-card {
      background: white;

      border: 1px solid #e5e7eb;
      border-radius: 16px;

      padding: 25px;

      text-align: left;
      cursor: pointer;
    }

    .action-card:hover {
      border-color: #2167dc;
    }

    .icon {
      width: 45px;
      height: 45px;

      display: flex;
      align-items: center;
      justify-content: center;

      border-radius: 12px;

      background: #eef4ff;

      font-size: 22px;
      margin-bottom: 15px;
    }

    .action-card h3 {
      margin: 0 0 7px;
      color: #15233c;
    }

    .action-card p {
      margin: 0;
      color: #64748b;
      font-size: 13px;
    }

    .logout-card:hover {
      border-color: #dc2626;
    }

    @media (max-width: 700px) {
      .profile-header {
        flex-direction: column;
      }

      .edit-form {
        grid-template-columns: 1fr;
      }

      .actions-grid {
        grid-template-columns: 1fr;
      }
    }
  `

  startEdit() {
    this.editing = true
  }

  cancelEdit() {
    this.editing = false
  }

  saveProfile() {

    const updatedUser = {
      name:
        this.shadowRoot
          .querySelector('#name').value,

      email:
        this.shadowRoot
          .querySelector('#email').value,

      phone:
        this.shadowRoot
          .querySelector('#phone').value,

      address:
        this.shadowRoot
          .querySelector('#address').value
    }

    this.user = updatedUser

    this.editing = false

    this.dispatchEvent(
      new CustomEvent('update-profile', {
        detail: updatedUser,
        bubbles: true,
        composed: true
      })
    )

    alert('Profile updated successfully')
  }

  openOrders() {
    this.dispatchEvent(
      new CustomEvent('navigate-page', {
        detail: 'orders',
        bubbles: true,
        composed: true
      })
    )
  }

  openWishlist() {
    this.dispatchEvent(
      new CustomEvent('navigate-page', {
        detail: 'wishlist',
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

    const hasData =
      this.user &&
      this.user.name

    return html`
      <main>

        <div class="welcome">
          <h1>My Account</h1>
          <p>Manage your profile, orders and wishlist</p>
        </div>

        <div class="profile-card">

          ${
            hasData
              ? html`
                  <div class="profile-header">

                    <div class="avatar">
                      ${this.user.name
                        .charAt(0)
                        .toUpperCase()}
                    </div>

                    <div class="profile-details">

                      <h2>
                        ${this.user.name}
                      </h2>

                      ${
                        !this.editing
                          ? html`
                              <div class="details">

                                <div>
                                  <strong>Email:</strong>
                                  ${this.user.email}
                                </div>

                                <div>
                                  <strong>Phone:</strong>
                                  ${this.user.phone}
                                </div>

                                <div>
                                  <strong>Address:</strong>
                                  ${this.user.address}
                                </div>

                              </div>

                              <button
                                class="edit-profile"
                                @click=${this.startEdit}>
                                Edit Profile
                              </button>
                            `
                          : html`
                              <div class="edit-form">

                                <div>
                                  <label>Full Name</label>
                                  <input
                                    id="name"
                                    .value=${this.user.name}>
                                </div>

                                <div>
                                  <label>Email</label>
                                  <input
                                    id="email"
                                    .value=${this.user.email}>
                                </div>

                                <div>
                                  <label>Phone</label>
                                  <input
                                    id="phone"
                                    .value=${this.user.phone}>
                                </div>

                                <div>
                                  <label>Address</label>
                                  <input
                                    id="address"
                                    .value=${this.user.address}>
                                </div>

                              </div>

                              <div class="edit-actions">

                                <button
                                  class="save"
                                  @click=${this.saveProfile}>
                                  Save Changes
                                </button>

                                <button
                                  class="cancel"
                                  @click=${this.cancelEdit}>
                                  Cancel
                                </button>

                              </div>
                            `
                      }

                    </div>

                  </div>
                `
              : html`
                  <p>No profile information available.</p>
                `
          }

        </div>

        <h2 class="section-title">
          Account
        </h2>

        <div class="actions-grid">

          <button
            class="action-card"
            @click=${this.openOrders}>

            <div class="icon">📦</div>

            <h3>Orders</h3>

            <p>
              View your previous orders
            </p>

          </button>

          <button
            class="action-card"
            @click=${this.openWishlist}>

            <div class="icon">♡</div>

            <h3>Wishlist</h3>

            <p>
              View your saved products
            </p>

          </button>

          <button
            class="action-card logout-card"
            @click=${this.logout}>

            <div class="icon">↪</div>

            <h3>Logout</h3>

            <p>
              Sign out from your account
            </p>

          </button>

        </div>

      </main>
    `
  }
}

customElements.define(
  'profile-page',
  ProfilePage
)
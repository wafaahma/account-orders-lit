import { LitElement, html, css } from 'lit'

class ProfilePage extends LitElement {

  static styles = css`
    * {
      box-sizing: border-box;
    }

    :host {
      display: block;
      min-height: 100vh;
      background: #f6f8fc;
      font-family: Arial, sans-serif;
      color: #111827;
    }

    main {
      max-width: 950px;
      margin: 0 auto;
      padding: 50px 25px;
    }

    .title {
      margin-bottom: 28px;
    }

    h1 {
      margin: 0 0 8px;
      font-size: 32px;
      color: #111827;
    }

    .subtitle {
      color: #64748b;
      font-size: 16px;
    }

    .card {
      background: white;
      border: 1px solid #e5e7eb;
      border-radius: 18px;
      padding: 36px;

      box-shadow:
        0 8px 25px rgba(0, 0, 0, 0.05);
    }

    .profile-top {
      display: flex;
      align-items: center;
      gap: 18px;

      padding-bottom: 28px;
      margin-bottom: 28px;

      border-bottom: 1px solid #e5e7eb;
    }

    .avatar {
      width: 80px;
      height: 80px;

      border-radius: 50%;

      background: #2563eb;
      color: white;

      display: flex;
      align-items: center;
      justify-content: center;

      font-size: 30px;
      font-weight: bold;
    }

    .profile-name h2 {
      margin: 0 0 5px;
      font-size: 22px;
    }

    .profile-name p {
      margin: 0;
      color: #64748b;
    }

    .form {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 22px;
    }

    label {
      display: block;
      margin-bottom: 8px;

      color: #374151;

      font-size: 14px;
      font-weight: 600;
    }

    input {
      width: 100%;

      padding: 13px 14px;

      border: 1px solid #d1d5db;
      border-radius: 9px;

      background: white;

      font-size: 15px;
      outline: none;
    }

    input:focus {
      border-color: #2563eb;

      box-shadow:
        0 0 0 3px rgba(37, 99, 235, 0.08);
    }

    .actions {
      display: flex;
      justify-content: space-between;
      align-items: center;

      gap: 15px;

      margin-top: 30px;
    }

    .save {
      border: none;
      border-radius: 9px;

      background: #2563eb;
      color: white;

      padding: 13px 24px;

      font-size: 15px;
      font-weight: 600;

      cursor: pointer;
    }

    .save:hover {
      background: #1d4ed8;
    }

    .logout {
      border: 1px solid #dc2626;
      border-radius: 9px;

      background: white;
      color: #dc2626;

      padding: 12px 22px;

      font-size: 15px;
      font-weight: 600;

      cursor: pointer;
    }

    .logout:hover {
      background: #fef2f2;
    }

    @media (max-width: 700px) {
      .form {
        grid-template-columns: 1fr;
      }

      .actions {
        flex-direction: column;
        align-items: stretch;
      }

      .save,
      .logout {
        width: 100%;
      }
    }
  `

  save() {
    alert('Profile updated successfully')
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
      <main>

        <div class="title">

          <h1>My Profile</h1>

          <div class="subtitle">
            Manage your personal information
          </div>

        </div>

        <div class="card">

          <div class="profile-top">

            <div class="avatar">
              W
            </div>

            <div class="profile-name">

              <h2>
                Wafaa Ahmad
              </h2>

              <p>
                wafaa@gmail.com
              </p>

            </div>

          </div>

          <div class="form">

            <div>

              <label>
                Full Name
              </label>

              <input
                type="text"
                value="Wafaa Ahmad"
              >

            </div>

            <div>

              <label>
                Email
              </label>

              <input
                type="email"
                value="wafaa@gmail.com"
              >

            </div>

            <div>

              <label>
                Phone
              </label>

              <input
                type="text"
                value="0590000000"
              >

            </div>

            <div>

              <label>
                Address
              </label>

              <input
                type="text"
                value="Palestine"
              >

            </div>

          </div>

          <div class="actions">

            <button
              class="save"
              @click=${this.save}
            >
              Save Changes
            </button>

            <button
              class="logout"
              @click=${this.logout}
            >
              Logout
            </button>

          </div>

        </div>

      </main>
    `
  }
}

customElements.define(
  'profile-page',
  ProfilePage
)
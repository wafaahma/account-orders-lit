import { LitElement, html, css } from 'lit'
import '../components/account-navbar.js'

class ProfilePage extends LitElement {

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

    .title {
      margin-bottom: 30px;
    }

    h1 {
      margin: 0 0 8px;
      color: #111827;
      font-size: 30px;
    }

    .subtitle {
      color: #64748b;
    }

    .card {
      background: white;
      padding: 35px;
      border-radius: 16px;
      border: 1px solid #e5e7eb;
    }

    .avatar {
      width: 75px;
      height: 75px;
      border-radius: 50%;
      background: #2563eb;
      color: white;

      display: flex;
      align-items: center;
      justify-content: center;

      font-size: 30px;
      font-weight: bold;
      margin-bottom: 30px;
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
      font-weight: 600;
      font-size: 14px;
    }

    input {
      width: 100%;
      padding: 13px;
      border: 1px solid #d1d5db;
      border-radius: 8px;
      font-size: 15px;
      outline: none;
    }

    input:focus {
      border-color: #2563eb;
    }

    .save {
      margin-top: 28px;
      border: none;
      background: #2563eb;
      color: white;
      padding: 13px 25px;
      border-radius: 8px;
      font-size: 15px;
      font-weight: 600;
      cursor: pointer;
    }

    .save:hover {
      background: #1d4ed8;
    }

    @media (max-width: 700px) {
      .form {
        grid-template-columns: 1fr;
      }
    }
  `

  save() {
    alert('Profile updated successfully')
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

          <div class="avatar">W</div>

          <div class="form">

            <div>
              <label>Full Name</label>
              <input value="Wafaa Ahmad">
            </div>

            <div>
              <label>Email</label>
              <input value="wafaa@gmail.com">
            </div>

            <div>
              <label>Phone</label>
              <input value="0590000000">
            </div>

            <div>
              <label>Address</label>
              <input value="Palestine">
            </div>

          </div>

          <button
            class="save"
            @click=${this.save}>
            Save Changes
          </button>

        </div>

      </main>
    `
  }
}

customElements.define('profile-page', ProfilePage)
import { LitElement, html, css } from 'lit'

import '@material/web/button/filled-button.js'
import '@material/web/textfield/outlined-text-field.js'

class ProfilePage extends LitElement {

  static properties = {
    user: { type: Object }
  }

  static styles = css`
    .container {
      max-width: 800px;
      margin: 40px auto;
      padding: 0 20px;
    }

    .card {
      background: white;
      padding: 32px;
      border-radius: 20px;

      box-shadow:
        0 5px 20px rgba(0,0,0,0.08);
    }

    h1 {
      margin-top: 0;
    }

    .avatar {
      width: 80px;
      height: 80px;

      border-radius: 50%;

      background: #6750a4;
      color: white;

      display: flex;
      align-items: center;
      justify-content: center;

      font-size: 32px;
      font-weight: bold;

      margin-bottom: 25px;
    }

    .fields {
      display: grid;
      gap: 18px;
    }

    md-outlined-text-field {
      width: 100%;
    }

    md-filled-button {
      margin-top: 20px;
    }
  `

  saveProfile() {
    alert('Profile updated successfully')
  }

  render() {
    return html`
      <div class="container">

        <div class="card">

          <div class="avatar">
            ${this.user?.name?.charAt(0) || 'U'}
          </div>

          <h1>My Profile</h1>

          <p>
            Manage your personal information
          </p>

          <div class="fields">

            <md-outlined-text-field
              label="Full Name"
              .value=${this.user?.name || ''}>
            </md-outlined-text-field>

            <md-outlined-text-field
              label="Email"
              .value=${this.user?.email || ''}>
            </md-outlined-text-field>

            <md-outlined-text-field
              label="Phone"
              .value=${this.user?.phone || ''}>
            </md-outlined-text-field>

            <md-outlined-text-field
              label="Address"
              .value=${this.user?.address || ''}>
            </md-outlined-text-field>

          </div>

          <md-filled-button
            @click=${this.saveProfile}>
            Save Changes
          </md-filled-button>

        </div>

      </div>
    `
  }
}

customElements.define(
  'profile-page',
  ProfilePage
)
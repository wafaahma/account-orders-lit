import { LitElement, html, css } from 'lit'

import '@material/web/textfield/outlined-text-field.js'
import '@material/web/button/filled-button.js'
import '@material/web/button/text-button.js'

class LoginPage extends LitElement {

  static styles = css`
    * {
      box-sizing: border-box;
    }

    :host {
      display: block;
      min-height: 100vh;
      background: #f6f8fc;
      font-family: Arial, sans-serif;
      padding-top: 1px;
    }

    .card {
      width: 430px;
      max-width: 90%;
      margin: 80px auto;
      padding: 40px;

      background: white;
      border: 1px solid #e5e7eb;
      border-radius: 16px;

      box-shadow:
        0 8px 25px rgba(0, 0, 0, 0.06);
    }

    h1 {
      margin: 0 0 8px;
      font-size: 30px;
      color: #111827;
    }

    .subtitle {
      color: #64748b;
      margin-bottom: 28px;
      font-size: 15px;
    }

    form {
      display: grid;
      gap: 20px;
    }

    md-outlined-text-field {
      width: 100%;

      --md-outlined-text-field-focus-outline-color: #2563eb;
      --md-outlined-text-field-focus-label-text-color: #2563eb;
    }

    md-filled-button {
      width: 100%;

      --md-filled-button-container-color: #2563eb;
      --md-filled-button-label-text-color: white;
      --md-filled-button-container-height: 48px;
    }

    .register {
      margin-top: 24px;
      text-align: center;
      color: #64748b;
      font-size: 14px;
    }

    md-text-button {
      --md-text-button-label-text-color: #2563eb;
    }
  `

  login(event) {
    event.preventDefault()

    const data =
      new FormData(event.target)

    const email =
      data.get('email')

    const password =
      data.get('password')

    if (!email || !password) {
      alert('Please enter email and password')
      return
    }

    this.dispatchEvent(
      new CustomEvent('login-user', {
        detail: {
          email: email
        },
        bubbles: true,
        composed: true
      })
    )
  }

  register() {
    this.dispatchEvent(
      new CustomEvent('go-register', {
        bubbles: true,
        composed: true
      })
    )
  }

  render() {
    return html`
      <div class="card">

        <h1>Login</h1>

        <div class="subtitle">
          Sign in to your account
        </div>

        <form @submit=${this.login}>

          <md-outlined-text-field
            label="Email"
            name="email"
            type="email"
            required>
          </md-outlined-text-field>

          <md-outlined-text-field
            label="Password"
            name="password"
            type="password"
            required>
          </md-outlined-text-field>

          <md-filled-button type="submit">
            Login
          </md-filled-button>

        </form>

        <div class="register">
          Don't have an account?

          <md-text-button
            @click=${this.register}>
            Register
          </md-text-button>
        </div>

      </div>
    `
  }
}

customElements.define(
  'login-page',
  LoginPage
)
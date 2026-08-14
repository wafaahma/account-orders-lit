import { LitElement, html, css } from 'lit'

import '@material/web/textfield/outlined-text-field.js'
import '@material/web/button/filled-button.js'
import '@material/web/button/text-button.js'

class LoginPage extends LitElement {

  static styles = css`
    .card {
      width: 400px;
      max-width: 85%;
      margin: 60px auto;
      padding: 35px;

      background: white;

      border-radius: 22px;

      box-shadow:
        0 8px 25px rgba(0, 0, 0, 0.1);
    }

    h1 {
      margin-bottom: 8px;
    }

    .subtitle {
      color: #625b71;
      margin-bottom: 25px;
    }

    form {
      display: grid;
      gap: 18px;
    }

    md-outlined-text-field {
      width: 100%;
    }

    md-filled-button {
      width: 100%;
    }

    .register {
      margin-top: 20px;
      text-align: center;
      color: #625b71;
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
        detail: { email },
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
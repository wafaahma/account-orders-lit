import { LitElement, html, css } from 'lit'

import '@material/web/textfield/outlined-text-field.js'
import '@material/web/button/filled-button.js'
import '@material/web/button/text-button.js'

class RegisterPage extends LitElement {

  static styles = css`
    .card {
      width: 450px;
      max-width: 85%;
      margin: 40px auto;
      padding: 35px;

      background: white;

      border-radius: 22px;

      box-shadow:
        0 8px 25px rgba(0, 0, 0, 0.1);
    }

    h1 {
      margin-bottom: 8px;
    }

    p {
      color: #625b71;
    }

    form {
      display: grid;
      gap: 16px;

      margin-top: 25px;
    }

    md-outlined-text-field {
      width: 100%;
    }

    md-filled-button {
      width: 100%;
    }

    .login {
      text-align: center;
      margin-top: 20px;
    }
  `

  register(event) {
    event.preventDefault()

    const data =
      new FormData(event.target)

    const name =
      data.get('name')

    const email =
      data.get('email')

    const password =
      data.get('password')

    const confirmPassword =
      data.get('confirmPassword')

    if (password !== confirmPassword) {
      alert('Passwords do not match')
      return
    }

    this.dispatchEvent(
      new CustomEvent('register-user', {
        detail: {
          name,
          email
        },
        bubbles: true,
        composed: true
      })
    )
  }

  login() {
    this.dispatchEvent(
      new CustomEvent('go-login', {
        bubbles: true,
        composed: true
      })
    )
  }

  render() {
    return html`
      <div class="card">

        <h1>Create Account</h1>

        <p>
          Create your account to start shopping
        </p>

        <form @submit=${this.register}>

          <md-outlined-text-field
            name="name"
            label="Full Name"
            required>
          </md-outlined-text-field>

          <md-outlined-text-field
            name="email"
            label="Email"
            type="email"
            required>
          </md-outlined-text-field>

          <md-outlined-text-field
            name="password"
            label="Password"
            type="password"
            required>
          </md-outlined-text-field>

          <md-outlined-text-field
            name="confirmPassword"
            label="Confirm Password"
            type="password"
            required>
          </md-outlined-text-field>

          <md-filled-button type="submit">
            Create Account
          </md-filled-button>

        </form>

        <div class="login">

          Already have an account?

          <md-text-button
            @click=${this.login}>
            Login
          </md-text-button>

        </div>

      </div>
    `
  }
}

customElements.define(
  'register-page',
  RegisterPage
)
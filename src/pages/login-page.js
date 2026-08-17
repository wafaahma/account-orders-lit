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
      box-shadow: 0 8px 25px rgba(0, 0, 0, 0.06);
    }

    .logo {
      width: 52px;
      height: 52px;
      margin: 0 auto 20px;
      display: flex;
      align-items: center;
      justify-content: center;
      background: #2167dc;
      color: white;
      border-radius: 14px;
      font-size: 24px;
      font-weight: 800;
    }

    h1 {
      margin: 0 0 8px;
      text-align: center;
      font-size: 30px;
      color: #15233c;
    }

    .subtitle {
      color: #64748b;
      margin-bottom: 28px;
      font-size: 15px;
      text-align: center;
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

    @media (max-width: 500px) {
      .card {
        padding: 30px 22px;
        margin-top: 50px;
      }

      h1 {
        font-size: 26px;
      }
    }
  `

  login(event) {

    event.preventDefault()

    const form = event.target
    const data = new FormData(form)

    const email =
      data.get('email')?.toString().trim()

    const password =
      data.get('password')?.toString()

    if (!email || !password) {
      alert('Please enter email and password')
      return
    }

    localStorage.setItem(
      'ElectroShop:isLoggedIn',
      'true'
    )

    localStorage.setItem(
      'ElectroShop:user',
      JSON.stringify({
        email: email
      })
    )

    window.parent.postMessage(
      {
        type: 'LOGIN_SUCCESS'
      },
      '*'
    )

    this.dispatchEvent(
      new CustomEvent(
        'login-user',
        {
          detail: {
            email: email
          },
          bubbles: true,
          composed: true
        }
      )
    )
  }

  register() {

    window.parent.postMessage(
      {
        type: 'NAVIGATE',
        path: '/account/register'
      },
      '*'
    )

    this.dispatchEvent(
      new CustomEvent(
        'go-register',
        {
          bubbles: true,
          composed: true
        }
      )
    )
  }

  render() {

    return html`

      <div class="card">

        <div class="logo">
          E
        </div>

        <h1>
          Login
        </h1>

        <div class="subtitle">
          Sign in to your ElectroShop account
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
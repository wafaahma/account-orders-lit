import { LitElement, html, css } from 'lit'

class RegisterPage extends LitElement {

  static styles = css`
    * {
      box-sizing: border-box;
    }

    :host {
      display: block;
      font-family: Arial, sans-serif;
    }

    .page {
      min-height: 100vh;
      background: #f6f8fc;
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 30px;
    }

    .card {
      width: 100%;
      max-width: 500px;
      background: white;
      padding: 40px;
      border-radius: 18px;
      box-shadow: 0 8px 30px rgba(0,0,0,0.07);
    }

    .logo {
      text-align: center;
      font-size: 28px;
      font-weight: bold;
      margin-bottom: 25px;
    }

    .blue {
      color: #2563eb;
    }

    h1 {
      margin: 0 0 8px;
      color: #111827;
    }

    .subtitle {
      color: #64748b;
      margin-bottom: 25px;
    }

    label {
      display: block;
      margin-bottom: 7px;
      color: #374151;
      font-weight: 600;
      font-size: 14px;
    }

    input {
      width: 100%;
      padding: 13px;
      margin-bottom: 17px;
      border: 1px solid #d1d5db;
      border-radius: 9px;
      font-size: 15px;
      outline: none;
    }

    input:focus {
      border-color: #2563eb;
    }

    .register-btn {
      width: 100%;
      border: none;
      background: #2563eb;
      color: white;
      padding: 14px;
      border-radius: 9px;
      font-size: 16px;
      font-weight: 600;
      cursor: pointer;
    }

    .register-btn:hover {
      background: #1d4ed8;
    }

    .login {
      text-align: center;
      margin-top: 20px;
      color: #64748b;
    }

    .login button {
      border: none;
      background: transparent;
      color: #2563eb;
      cursor: pointer;
      font-weight: 600;
    }
  `

  register() {
    this.dispatchEvent(
      new CustomEvent('login-user', {
        bubbles: true,
        composed: true
      })
    )
  }

  login() {
    this.dispatchEvent(
      new CustomEvent('navigate-page', {
        detail: 'login',
        bubbles: true,
        composed: true
      })
    )
  }

  render() {
    return html`
      <div class="page">
        <div class="card">

          <div class="logo">
            Electro<span class="blue">Shop</span>
          </div>

          <h1>Create Account</h1>
          <div class="subtitle">Create your ElectroShop account</div>

          <label>Full Name</label>
          <input type="text" placeholder="Enter your full name">

          <label>Email</label>
          <input type="email" placeholder="Enter your email">

          <label>Password</label>
          <input type="password" placeholder="Create a password">

          <button
            class="register-btn"
            @click=${this.register}>
            Create Account
          </button>

          <div class="login">
            Already have an account?
            <button @click=${this.login}>Login</button>
          </div>

        </div>
      </div>
    `
  }
}

customElements.define('register-page', RegisterPage)
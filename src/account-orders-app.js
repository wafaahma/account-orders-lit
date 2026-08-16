import { LitElement, html, css } from 'lit'

import './components/account-navbar.js'

import './pages/login-page.js'
import './pages/register-page.js'
import './pages/profile-page.js'
import './pages/orders-page.js'
import './pages/wishlist-page.js'

import { user as defaultUser }
  from './data/mock-data.js'

class AccountOrdersApp extends LitElement {

  static properties = {
    page: { type: String },
    loggedIn: { type: Boolean },
    user: { type: Object }
  }

  constructor() {
    super()

    this.loggedIn = false
    this.page = 'login'
    this.user = { ...defaultUser }
  }

  static styles = css`
    :host {
      display: block;
      min-height: 100vh;
      background: #f6f4f8;
      font-family: Arial, Helvetica, sans-serif;
      color: #1d1b20;
    }
  `

  connectedCallback() {
    super.connectedCallback()

    this.addEventListener(
      'go-register',
      this.handleRegisterPage
    )

    this.addEventListener(
      'go-login',
      this.handleLoginPage
    )

    this.addEventListener(
      'login-user',
      this.handleLogin
    )

    this.addEventListener(
      'register-user',
      this.handleRegister
    )

    this.addEventListener(
      'navigate-page',
      this.handleNavigation
    )

    this.addEventListener(
      'logout-user',
      this.handleLogout
    )
  }

  disconnectedCallback() {
    super.disconnectedCallback()

    this.removeEventListener(
      'go-register',
      this.handleRegisterPage
    )

    this.removeEventListener(
      'go-login',
      this.handleLoginPage
    )

    this.removeEventListener(
      'login-user',
      this.handleLogin
    )

    this.removeEventListener(
      'register-user',
      this.handleRegister
    )

    this.removeEventListener(
      'navigate-page',
      this.handleNavigation
    )

    this.removeEventListener(
      'logout-user',
      this.handleLogout
    )
  }

  handleRegisterPage = () => {
    this.page = 'register'
  }

  handleLoginPage = () => {
    this.page = 'login'
  }

 handleLogin = (event) => {
  this.user = {
    ...this.user,
    email: event.detail.email
  }

  window.parent.postMessage(
    {
      type: 'NAVIGATE',
      path: '/'
    },
    '*'
  )
}
handleRegister = (event) => {
  this.user = {
    ...this.user,
    name: event.detail.name,
    email: event.detail.email
  }

  window.parent.postMessage(
    {
      type: 'NAVIGATE',
      path: '/'
    },
    '*'
  )
}
  handleNavigation = (event) => {
    this.page = event.detail
  }

  handleLogout = () => {
    this.loggedIn = false
    this.page = 'login'
  }

  renderPage() {
    switch (this.page) {

      case 'profile':
        return html`
          <profile-page
            .user=${this.user}>
          </profile-page>
        `

      case 'orders':
        return html`
          <orders-page>
          </orders-page>
        `

      case 'wishlist':
        return html`
          <wishlist-page>
          </wishlist-page>
        `

      default:
        return html`
          <profile-page
            .user=${this.user}>
          </profile-page>
        `
    }
  }

  render() {

    if (!this.loggedIn) {

      if (this.page === 'register') {
        return html`
          <register-page>
          </register-page>
        `
      }

      return html`
        <login-page>
        </login-page>
      `
    }

    return html`
      <account-navbar>
      </account-navbar>

      ${this.renderPage()}
    `
  }
}

customElements.define(
  'account-orders-app',
  AccountOrdersApp
)
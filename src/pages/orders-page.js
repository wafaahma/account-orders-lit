import { LitElement, html, css } from 'lit'

import './pages/login-page.js'
import './pages/profile-page.js'
import './pages/orders-page.js'
import './pages/wishlist-page.js'

import { user as defaultUser }
  from './data/mock-data.js'

class AccountOrdersApp extends LitElement {

  static properties = {
    page: { type: String },
    user: { type: Object }
  }

  constructor() {
    super()

    this.user = { ...defaultUser }

    const path = window.location.pathname

    // ❤️ القلب من Shell
    if (path === '/login') {
      this.page = 'login'
    }

    // 👤 البروفايل
    else if (path === '/profile') {
      this.page = 'profile'
    }

    // Orders
    else if (path === '/orders') {
      this.page = 'orders'
    }

    // Wishlist
    else if (path === '/wishlist') {
      this.page = 'wishlist'
    }

    // /account العادي
    else {
      this.page = 'profile'
    }
  }

  static styles = css`
    :host {
      display: block;
      min-height: 100vh;
      background: #f6f8fc;
      font-family: Arial, Helvetica, sans-serif;
      color: #111827;
    }
  `

  connectedCallback() {
    super.connectedCallback()

    this.addEventListener(
      'login-user',
      this.handleLogin
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
      'login-user',
      this.handleLogin
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

  handleLogin = (event) => {

    this.user = {
      ...this.user,
      email: event.detail.email
    }

    localStorage.setItem(
      'hasProfileData',
      'true'
    )

    // بعد Login يرجع Home تبعت فرح
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

    this.user = {
      name: '',
      email: '',
      phone: '',
      address: ''
    }

    localStorage.setItem(
      'hasProfileData',
      'false'
    )

    window.parent.postMessage(
      {
        type: 'NAVIGATE',
        path: '/'
      },
      '*'
    )
  }

  render() {

    if (this.page === 'login') {
      return html`
        <login-page></login-page>
      `
    }

    if (this.page === 'orders') {
      return html`
        <orders-page></orders-page>
      `
    }

    if (this.page === 'wishlist') {
      return html`
        <wishlist-page></wishlist-page>
      `
    }

    return html`
      <profile-page
        .user=${this.user}>
      </profile-page>
    `
  }
}

customElements.define(
  'account-orders-app',
  AccountOrdersApp
)

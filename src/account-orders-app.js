import { LitElement, html, css } from 'lit'

import './pages/profile-page.js'
import './pages/orders-page.js'
import './pages/wishlist-page.js'

import { user as defaultUser }
  from './data/mock-data.js'

class AccountOrdersApp extends LitElement {

  static properties = {
    page: { type: String },
    user: { type: Object },
    hasProfileData: { type: Boolean }
  }

  constructor() {
    super()

    this.page = 'profile'

    // أول مرة المستخدم يكون عنده حساب جاهز
    if (localStorage.getItem('hasProfileData') === null) {
      localStorage.setItem('hasProfileData', 'true')
    }

    this.hasProfileData =
      localStorage.getItem('hasProfileData') === 'true'

    if (this.hasProfileData) {
      this.user = { ...defaultUser }
    } else {
      this.user = {
        name: '',
        email: '',
        phone: '',
        address: ''
      }
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
      'navigate-page',
      this.handleNavigation
    )

    this.addEventListener(
      'logout-user',
      this.handleLogout
    )

    this.addEventListener(
      'update-profile',
      this.handleProfileUpdate
    )
  }

  disconnectedCallback() {
    super.disconnectedCallback()

    this.removeEventListener(
      'navigate-page',
      this.handleNavigation
    )

    this.removeEventListener(
      'logout-user',
      this.handleLogout
    )

    this.removeEventListener(
      'update-profile',
      this.handleProfileUpdate
    )
  }

  handleNavigation = (event) => {
    this.page = event.detail
  }

  handleProfileUpdate = (event) => {
    this.user = {
      ...event.detail
    }

    this.hasProfileData = true

    localStorage.setItem(
      'hasProfileData',
      'true'
    )
  }

  handleLogout = () => {

    this.user = {
      name: '',
      email: '',
      phone: '',
      address: ''
    }

    this.hasProfileData = false

    localStorage.setItem(
      'hasProfileData',
      'false'
    )

    // يرجع Home تبعت Shell فرح
    window.parent.postMessage(
      {
        type: 'NAVIGATE',
        path: '/'
      },
      '*'
    )
  }

  renderPage() {

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

  render() {
    return html`
      ${this.renderPage()}
    `
  }
}

customElements.define(
  'account-orders-app',
  AccountOrdersApp
)
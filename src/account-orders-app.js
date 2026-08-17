import {
  LitElement,
  html,
  css
} from "lit";

import "./pages/login-page.js";
import "./pages/profile-page.js";
import "./pages/orders-page.js";
import "./pages/wishlist-page.js";

import {
  user as defaultUser
} from "./data/mock-data.js";

class AccountOrdersApp extends LitElement {

  static properties = {
    page: {
      type: String
    },

    user: {
      type: Object
    },

    isLoggedIn: {
      type: Boolean
    }
  };

  constructor() {
    super();

    const path =
      window.location.pathname;

    this.isLoggedIn =
      localStorage.getItem(
        "ElectroShop:isLoggedIn"
      ) === "true";

    const savedUser =
      localStorage.getItem(
        "ElectroShop:user"
      );

    if (savedUser) {
      try {
        this.user = {
          ...defaultUser,
          ...JSON.parse(savedUser)
        };
      } catch {
        this.user = {
          name: "",
          email: "",
          phone: "",
          address: ""
        };
      }
    } else {
      this.user = {
        name: "",
        email: "",
        phone: "",
        address: ""
      };
    }

    if (!this.isLoggedIn) {
      this.page = "login";
      return;
    }

    if (
      path === "/account/login" ||
      path === "/account/register"
    ) {
      this.page = "login";
      return;
    }

    if (
      path === "/orders" ||
      path === "/account/orders"
    ) {
      this.page = "orders";
      return;
    }

    if (
      path === "/wishlist" ||
      path === "/account/wishlist"
    ) {
      this.page = "wishlist";
      return;
    }

    this.page = "profile";
  }

  static styles = css`
    :host {
      display: block;

      min-height: 100vh;

      background: #f6f8fc;

      font-family:
        Arial,
        Helvetica,
        sans-serif;

      color: #111827;
    }
  `;

  connectedCallback() {
    super.connectedCallback();

    this.addEventListener(
      "login-user",
      this.handleLogin
    );

    this.addEventListener(
      "navigate-page",
      this.handleNavigation
    );

    this.addEventListener(
      "logout-user",
      this.handleLogout
    );

    this.addEventListener(
      "update-profile",
      this.handleProfileUpdate
    );
  }

  disconnectedCallback() {
    this.removeEventListener(
      "login-user",
      this.handleLogin
    );

    this.removeEventListener(
      "navigate-page",
      this.handleNavigation
    );

    this.removeEventListener(
      "logout-user",
      this.handleLogout
    );

    this.removeEventListener(
      "update-profile",
      this.handleProfileUpdate
    );

    super.disconnectedCallback();
  }

  handleLogin = (event) => {
    const email =
      event.detail?.email;

    if (!email) {
      return;
    }

    this.isLoggedIn = true;

    this.user = {
      ...this.user,
      email
    };

    localStorage.setItem(
      "ElectroShop:isLoggedIn",
      "true"
    );

    localStorage.setItem(
      "ElectroShop:user",
      JSON.stringify(
        this.user
      )
    );

    this.page = "profile";

    window.parent.postMessage(
      {
        type: "LOGIN_SUCCESS"
      },
      "*"
    );
  };

  handleNavigation = (event) => {
    if (!this.isLoggedIn) {
      this.page = "login";
      return;
    }

    const page =
      event.detail;

    if (page === "orders") {
      this.page = "orders";
      return;
    }

    if (page === "wishlist") {
      this.page = "wishlist";
      return;
    }

    this.page = "profile";
  };

  handleProfileUpdate = (event) => {
    this.user = {
      ...this.user,
      ...event.detail
    };

    localStorage.setItem(
      "ElectroShop:user",
      JSON.stringify(
        this.user
      )
    );
  };

  handleLogout = () => {
    this.isLoggedIn = false;

    this.user = {
      name: "",
      email: "",
      phone: "",
      address: ""
    };

    localStorage.removeItem(
      "ElectroShop:isLoggedIn"
    );

    localStorage.removeItem(
      "ElectroShop:user"
    );

    this.page = "login";

    window.parent.postMessage(
      {
        type: "LOGOUT"
      },
      "*"
    );
  };

  renderPage() {
    if (!this.isLoggedIn) {
      return html`
        <login-page></login-page>
      `;
    }

    if (this.page === "orders") {
      return html`
        <orders-page></orders-page>
      `;
    }

    if (this.page === "wishlist") {
      return html`
        <wishlist-page></wishlist-page>
      `;
    }

    return html`
      <profile-page
        .user=${this.user}>
      </profile-page>
    `;
  }

  render() {
    return html`
      ${this.renderPage()}
    `;
  }
}

customElements.define(
  "account-orders-app",
  AccountOrdersApp
);
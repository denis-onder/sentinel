import React from "react";
import Link from "next/link";
import css from "../assets/scss/base.scss";

const Nav = () => (
  <nav className={css.nav}>
    <Link prefetch href="/">
      <p>SENTINEL</p>
    </Link>
    <ul>
      <li className="liTag">
        <Link prefetch href="/">
          <a>Home</a>
        </Link>
      </li>
      <li className="liTag">
        <Link prefetch href="/login">
          <a>Login</a>
        </Link>
      </li>
      <li className="liTag">
        <Link prefetch href="/register">
          <a>Register</a>
        </Link>
      </li>
      <li className="liTag">
        <Link prefetch href="/getting-started">
          <a>Getting Started</a>
        </Link>
      </li>
    </ul>
  </nav>
);

export default Nav;

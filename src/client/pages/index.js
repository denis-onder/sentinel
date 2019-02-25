import React from "react";
import Link from "next/link";
import Head from "../components/head";
import Nav from "../components/nav";
import css from "../assets/scss/base.scss";

const Home = () => (
  <div>
    <Head title="Sentinel - Home" />
    <Nav />

    <div className={css.hero}>
      <h1 className={css.title}>Welcome to Sentinel!</h1>
      <div className={css.row}>
        <Link href="https://github.com/zeit/next.js#getting-started">
          <a className={css.card}>
            <h3>Getting Started &rarr;</h3>
            <p>Learn more about Sentinel.</p>
          </a>
        </Link>
        <Link href="https://open.segment.com/create-next-app">
          <a className={css.card}>
            <h3>Log In &rarr;</h3>
            <p>If you already have an account, you can log in here.</p>
          </a>
        </Link>
        <Link href="https://github.com/segmentio/create-next-app">
          <a className={css.card}>
            <h3>Register &rarr;</h3>
            <p>
              If you do not have an account, this is where you can create one.
            </p>
          </a>
        </Link>
      </div>
    </div>
  </div>
);

export default Home;

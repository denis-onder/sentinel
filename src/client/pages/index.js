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

    {/* <style jsx>{`
      .hero {
        width: 100%;
        color: #333;
      }
      .title {
        margin: 0;
        width: 100%;
        padding-top: 80px;
        line-height: 1.15;
        font-size: 48px;
      }
      .title,
      .description {
        text-align: center;
      }
      .row {
        max-width: 880px;
        margin: 80px auto 40px;
        display: flex;
        flex-direction: row;
        justify-content: space-around;
      }
      .card {
        padding: 18px 18px 24px;
        width: 220px;
        text-align: left;
        text-decoration: none;
        color: #434343;
        border: 1px solid #9b9b9b;
      }
      .card:hover {
        border-color: #067df7;
      }
      .card h3 {
        margin: 0;
        color: #067df7;
        font-size: 18px;
      }
      .card p {
        margin: 0;
        padding: 12px 0 0;
        font-size: 13px;
        color: #333;
      }
    `}</style> */}
  </div>
);

export default Home;

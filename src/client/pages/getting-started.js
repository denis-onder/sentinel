import React from "react";
import Head from "../components/head";
import Nav from "../components/nav";
import css from "../assets/scss/base.scss";

const GettingStarted = () => (
  <div>
    <Head title="Sentinel - Getting Started" />
    <Nav />
    <div className={css.hero}>
      <h1 className={css.title}>Getting Started</h1>
    </div>
  </div>
);

export default GettingStarted;

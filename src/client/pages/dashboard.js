import React from "react";
import Head from "../components/head";
import Nav from "../components/nav";
import css from "../assets/scss/base.scss";

export default class Dashboard extends React.Component {
  render() {
    return (
      <div>
        <Head title="Sentinel - Dashboard" />
        <Nav />
        <div className={css.hero}>
          <h1>Dashboard</h1>
        </div>
      </div>
    )
  }
}

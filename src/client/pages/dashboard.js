import React from "react";
import Head from "../components/head";
import Nav from "../components/nav";
import css from "../assets/scss/base.scss";

const Dashboard = () => (
  <div>
    <Head title="Sentinel - Dashboard" />
    <Nav />
    <div className={css.hero}>
      <h1 className={css.title}>Dashboard</h1>
    </div>
  </div>
);

export default Dashboard;

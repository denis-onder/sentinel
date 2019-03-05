import React from "react";
import Head from "../components/head";
import css from "../assets/scss/base.scss";
import Store from '../store';

export default class Dashboard extends React.Component {
  componentDidMount = () => {
    Store.checkForVault();
  }
  render() {
    return (
      <div>
        <Head title="Sentinel - Dashboard" />
        <div className={css.hero}>
          <h1>Dashboard</h1>
        </div>
      </div>
    )
  }
}

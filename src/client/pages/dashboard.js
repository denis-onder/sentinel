import React from "react";
import Head from "../components/head";
import css from "../assets/scss/base.scss";
import Store from '../store';

const Sidebar = () => {
  return (
    <div className={css.sidebar}>
      <ul>
        <li><i className="fas fa-plus-circle fa-2x"></i></li>
        <li><i className="fas fa-cog fa-2x"></i></li>
        <li><i className="fas fa-sign-out-alt fa-2x" onClick={Store.logoutUser}></i></li>
      </ul>
    </div>
  )
};

export default class Dashboard extends React.Component {
  componentDidMount = () => {
    Store.checkForVault();
  }
  render() {
    return (
      <div className={css.dashboard}>
        <Head title="Sentinel - Dashboard" />
        <div>
          <Sidebar />
          <h1>Dashboard</h1>
        </div>
      </div>
    )
  };
};

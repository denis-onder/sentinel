import React from "react";
import Head from "../components/head";
import css from "../assets/scss/base.scss";
import Store from '../store';

const Sidebar = () => {
  return (
    <div className={css.sidebar}>
      <ul>
        <li><i className="fas fa-plus-circle fa-2x" onClick={Store.addFieldToVault}></i></li>
        <li><i className="fas fa-cog fa-2x"></i></li>
        <li><i className="fas fa-sign-out-alt fa-2x" onClick={Store.logoutUser}></i></li>
      </ul>
    </div>
  )
};

export default class Dashboard extends React.Component {
  constructor() {
    super();
    this.state = {
      vaultOpen: false
    };
  }
  componentDidMount = () => {
    Store.checkForVault();
    if (Store.store.vaultExists) {
      Store.openVault();
    }
  }
  render() {
    return (
      <div>
        <Sidebar />
        <div className={css.dashboard}>
          <Head title="Sentinel - Dashboard" />
          <div>
            <div className={css.wrapper}>
              <h1>Dashboard</h1>
              <div className={css.output} style={{ display: `${this.state.vaultOpen ? 'block' : 'none'}` }}>
                <div className={css.field}><p>Name: Test</p><input type="password" placeholder="Password:" /></div>
                <div className={css.field}><p>Name: Test</p><input type="password" placeholder="Password:" /></div>
                <div className={css.field}><p>Name: Test</p><input type="password" placeholder="Password:" /></div>
                <div className={css.field}><p>Name: Test</p><input type="password" placeholder="Password:" /></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  };
};

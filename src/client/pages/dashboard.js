import React from "react";
import Head from "../components/head";
import css from "../assets/scss/base.scss";
import TextField from "@material-ui/core/TextField";
import Store from "../store";

const Sidebar = () => {
  return (
    <div className={css.sidebar}>
      <ul>
        <li>
          <i
            className="fas fa-plus-circle fa-2x"
            onClick={Store.addFieldToVault}
          />
        </li>
        <li>
          <i className="fas fa-cog fa-2x" />
        </li>
        <li>
          <i className="fas fa-sign-out-alt fa-2x" onClick={Store.logoutUser} />
        </li>
      </ul>
    </div>
  );
};

export default class Dashboard extends React.Component {
  constructor() {
    super();
    this.state = {
      vaultOpen: false
    };
  }
  handleSubmit = e => {
    if (e.which === 13) {
      const keys = {
        key: e.target.value
      };
      Store.openVault(keys);
    }
  };
  render() {
    Store.checkForVault()
      .then(result => {
        if (!result) {
          window.location.href = "/vault-creation";
        }
      })
      .catch(err => console.error(err));
    return (
      <div>
        <Sidebar />
        <div className={css.dashboard}>
          <Head title="Sentinel - Dashboard" />
          <div>
            <div className={css.wrapper}>
              <h1>Dashboard</h1>
              <TextField
                id="standard-password-input"
                label="Master Password:"
                margin="normal"
                name="password"
                type="password"
                style={{ display: !this.state.vaultOpen ? "block" : "none" }}
                onKeyPress={this.handleSubmit}
              />
              <div
                className={css.output}
                style={{
                  display: `${this.state.vaultOpen ? "block" : "none"}`
                }}
              >
                <div className={css.field}>
                  <p>Name: Test</p>
                  <input type="password" placeholder="Password:" />
                </div>
                <div className={css.field}>
                  <p>Name: Test</p>
                  <input type="password" placeholder="Password:" />
                </div>
                <div className={css.field}>
                  <p>Name: Test</p>
                  <input type="password" placeholder="Password:" />
                </div>
                <div className={css.field}>
                  <p>Name: Test</p>
                  <input type="password" placeholder="Password:" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

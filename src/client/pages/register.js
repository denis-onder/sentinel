import React from "react";
import Head from "../components/head";
import Nav from "../components/nav";
import css from "../assets/scss/base.scss";
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Store from '../store';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      password: ''
    }
    this.onChange = this.onChange.bind(this);
    this.onClick = this.onClick.bind(this);
  }
  onChange(e) {
    this.setState({ [e.target.name]: e.target.value })
  }
  onClick() {
    const userData = {
      email: this.state.email,
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      password: this.state.password
    }
    Store.registerUser(userData)
      .then(res => window.location.href = '/login')
      .catch(err => console.log(err));
  }
  render() {
    return (
      <div>
        <Head title="Sentinel - Register" />
        <Nav />
        <div className={css.hero}>
          <form noValidate autoComplete="off">
            <h4>Register:</h4>
            <TextField
              id="standard-first-name"
              label="First Name"
              margin="normal"
              name="firstName"
              value={this.state.firstName}
              onChange={this.onChange}
            />
            <TextField
              id="standard-last-name"
              label="Last Name"
              margin="normal"
              name="lastName"
              value={this.state.lastName}
              onChange={this.onChange}
            />
            <TextField
              id="standard-email"
              label="Email"
              margin="normal"
              name="email"
              value={this.state.email}
              onChange={this.onChange}
            />
            <TextField
              id="standard-password-input"
              label="Password"
              margin="normal"
              name="password"
              type="password"
              value={this.state.password}
              onChange={this.onChange}
            />
            <Button variant="contained" className={css.button} onClick={this.onClick}>Submit</Button>
          </form>
        </div>
      </div>
    )
  }
}

export default Login;

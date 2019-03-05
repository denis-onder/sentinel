import React from "react";
import Head from "../components/head";
import css from "../assets/scss/base.scss";
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Store from '../store';

export default class VaultCreation extends React.Component {
    constructor() {
        super();
        this.state = {
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
            key: this.state.password
        };
        Store.createVault(userData);
    }
    componentDidMount() {
        const vaultExists = Store.store.vaultExists;
        if (vaultExists) {
            window.location.href = '/dashboard';
        }
    }
    render() {
        return (
            <div>
                <Head title="Sentinel - Vault Creation" />
                <div className={css.vaultCreation}>
                    <h1>It seems like you do not have a vault.</h1>
                    <h4>For creating your vault, please provide a master password.</h4>
                    <h4>This password will be used for accessing your vault.</h4>
                    <form noValidate autoComplete="off">
                        <h4>Create your vault:</h4>
                        <TextField
                            id="standard-first-name"
                            label="Password"
                            margin="normal"
                            name="password"
                            type="password"
                            onChange={this.onChange}
                            value={this.state.password}
                        />
                        <Button variant="contained" className={css.button} onClick={this.onClick}>Submit</Button>
                    </form>
                </div>
            </div>
        )
    }
}

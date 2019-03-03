import { OPEN_VAULT, GET_ERRORS } from './types';
import axios from "axios";

export const setVault = vault => {
    return {
        type: OPEN_VAULT,
        payload: vault
    };
};

export const createVault = vaultData => dispatch => {
    axios.post('http://localhost:8000/api/vault/create', vaultData)
        .then(res => console.log('Vault Created: ', res.data))
        .catch(err => dispatch({ type: GET_ERRORS, payload: err.response.data }));
}

export const addVault = vaultData => dispatch => {
    axios.post('http://localhost:8000/api/vault/add', vaultData)
        .then(res => console.log('Added to vault: ', res.data))
        .catch(err => dispatch({ type: GET_ERRORS, payload: err.response.data }));
}

export const openVault = vaultData => dispatch => {
    axios.get('http://localhost:8000/api/vault/get', vaultData)
        .then(res => {
            dispatch(setVault(res.data));
        })
        .catch(err => dispatch({ type: GET_ERRORS, payload: err.response.data }));
}

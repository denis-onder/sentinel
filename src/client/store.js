import axios from 'axios';

class StoreClass {
    constructor() {
        this.store = {
            vault: []
        };
        this.testServer = this.testServer.bind(this);
    }
    testServer() {
        axios.get('http://localhost:8000/api/test')
            .then(res => res.data)
            .then(data => console.log(data))
            .catch(err => console.log(err));
    }
    loginUser(data) {
        return new Promise((resolve, reject) => {
            axios.post('http://localhost:8000/api/login', data)
                .then(res => res.data)
                .then(data => resolve(data))
                .catch(err => reject(err.response.data));
        })
    }
    registerUser(data) {
        return new Promise((resolve, reject) => {
            axios.post('http://localhost:8000/api/register', data)
                .then(res => res.data)
                .then(data => {
                    if (!data.hasOwnProperty('_key')) {
                        reject(data);
                    } else {
                        resolve(data);
                    }
                })
                .catch(err => reject(err.response.data));
        });
    }
    createVault(data) {
        // Add a new vault
    }
    addFieldToVault(data) {
        // Add a new field to the vault
    }
    openVault(data) {
        // Open the vault
    }
}

const Store = new StoreClass();

export default Store;
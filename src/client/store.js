import axios from 'axios';

class StoreClass {
    constructor() {
        this.testServer = this.testServer.bind(this);
    }
    testServer() {
        return new Promise((resolve, reject) => {
            axios.get('http://localhost:8000/api/test')
                .then(res => res.data)
                .then(data => resolve(data))
                .catch(err => reject(err));
        })
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
        // Regiser a new user
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
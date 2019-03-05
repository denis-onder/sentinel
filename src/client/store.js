import axios from 'axios';

class StoreClass {
    constructor() {
        this.store = {
            vaultExists: false,
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
    async checkForVault() {
        if (localStorage.token) {
            const { token } = localStorage;
            const res = await axios.get('http://localhost:8000/api/vault/check', { headers: { Authorization: token } });
            const data = await res.data;
            const { vaultExists } = data;
            this.store.vaultExists = vaultExists;
            if (!this.store.vaultExists) {
                window.location.href = '/vault-creation';
            }
        } else {
            console.log('You are not logged in.');
        }
    }
    createVault(data) {
        if (localStorage.token) {
            const { token } = localStorage;
            axios.post('http://localhost:8000/api/vault/create', data, { headers: { Authorization: token } })
                .then(res => res.data)
                .then(data => {
                    const { _key } = data;
                    if (_key) {
                        window.location.href = '/dashboard';
                    }
                })
                .catch(err => console.log(err.response.data));
        } else {
            console.log('You are not logged in.');
        }
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
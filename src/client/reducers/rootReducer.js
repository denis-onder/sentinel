
import { combineReducers } from 'redux';
import authReducer from './authReducer';
import vaultReducer from './vaultReducer';

export default combineReducers({
    auth: authReducer,
    vault: vaultReducer,
});
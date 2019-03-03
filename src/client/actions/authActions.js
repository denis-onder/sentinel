import { GET_USER, GET_ERRORS } from './types';
import axios from "axios";
import jwt_decode from "jwt-decode";

export const setCurrentUser = decoded => {
    return {
        type: GET_USER,
        payload: decoded
    };
};

export const registerUser = userData => dispatch => {
    axios.post('http://localhost:8000/api/register', userData)
        .then(res => console.log('Registered: ', res.data))
        .catch(err => dispatch({ type: GET_ERRORS, payload: err.response.data }));
}

export const loginUser = userData => dispatch => {
    axios.post('http://localhost:8000/api/login', userData)
        .then(res => {
            const { token } = res.data;
            localStorage.setItem('token', token);
            const decoded = jwt_decode(token);
            console.log(decoded);
            dispatch(setCurrentUser(decoded));
        })
        .catch(err => dispatch({ type: GET_ERRORS, payload: err.response.data }));
}

export const logoutUser = () => dispatch => {
    localStorage.removeItem("token");
    dispatch(setCurrentUser({}));
};
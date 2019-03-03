import { OPEN_VAULT } from '../actions/types';

const initialState = {
    vault: []
};

export default function (state = initialState, action) {
    switch (action.type) {
        case OPEN_VAULT:
            return {
                ...state,
                vault: action.payload
            };
        default:
            return state;
    }
};
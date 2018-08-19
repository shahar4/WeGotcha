import { SET_USER_HAT } from '../actions/types';

export default function(state = 'unknown', action) {
    switch (action.type) {
        case SET_USER_HAT: {
            return action.payload;
        }

        default: {
            return state;
        }
    }
}
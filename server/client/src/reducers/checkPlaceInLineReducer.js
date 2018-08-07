import { CHECK_PLACE_IN_LINE } from '../actions/types';

export default function(state = [], action) {
    switch (action.type) {

        case CHECK_PLACE_IN_LINE: {
            return action.payload;
        }

        default: {
            return state;
        }
    }
}
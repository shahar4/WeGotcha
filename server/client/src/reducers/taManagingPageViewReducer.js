import { SWITCH_TA_MANAGING_PAGE_VIEW } from '../actions/types';

export default function(state = 'chooseOh', action) {
    switch (action.type) {

    case SWITCH_TA_MANAGING_PAGE_VIEW:
        return state === 'chooseOh' ? 'showQueue' : 'chooseOh';

    default:
        return state;
    }
}
import { SUBMIT_OFFICE_HOURS, FETCH_OFFICE_HOURS_LIST, UPDATE_QUEUE_STATUS } from '../actions/types';

export default function(state = [], action) {
  switch (action.type) {
    
    case SUBMIT_OFFICE_HOURS:
      return action.payload;
    
    case FETCH_OFFICE_HOURS_LIST: {
      return action.payload;
    }

    case UPDATE_QUEUE_STATUS: {
      return action.payload;
    }
    
    default:
      return state;
  }
}
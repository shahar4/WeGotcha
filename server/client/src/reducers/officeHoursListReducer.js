import { CREATE_NEW_OH, FETCH_OFFICE_HOURS_LIST, UPDATE_QUEUE_STATUS, SUBMIT_EDITED_OH, UPDATE_EDITED_TOPICS } from '../actions/types';

export default function(state = [], action) {
  switch (action.type) {
    
    case CREATE_NEW_OH: {
      return action.payload.list;
    }
    case SUBMIT_EDITED_OH: {
      return action.payload.list;
    }
    case FETCH_OFFICE_HOURS_LIST: {
      return action.payload;
    }
    case UPDATE_QUEUE_STATUS: {
      return action.payload;
    }
    case UPDATE_EDITED_TOPICS: {
      return action.payload.list;
    }
    default:
      return state;
  }
}
import { SUBMIT_OFFICE_HOURS } from '../actions/types';

export default function(state = [], action) {
  switch (action.type) {
    
    case SUBMIT_OFFICE_HOURS:
      return action.payload;
    
    default:
      return state;
  }
}
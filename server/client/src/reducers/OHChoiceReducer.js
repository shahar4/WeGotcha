import { HANDLE_OH_CHOICE } from '../actions/types';

export default function(state = [], action) {
  switch (action.type) {

    case HANDLE_OH_CHOICE:
      return action.payload;

    default:
      return state;
  }
}
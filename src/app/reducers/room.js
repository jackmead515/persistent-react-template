const initialState = {
  roomName: '',
  displayName: ''
};

export default (state = initialState, action = {}) => {
  switch(action.type) {
    case 'SET_DISPLAY_NAME':
        return {
          ...state,
          displayName: action.data
        }
    case 'SET_ROOM_NAME':
        return {
          ...state,
          roomName: action.data
        }
    default:
      return state;
  }
};

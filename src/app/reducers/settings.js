const initialState = {
  showEncryption: false,
  showSettings: false
};

export default (state = initialState, action = {}) => {
  switch(action.type) {
    case 'SHOW_ENCRYPTION':
        return {
          ...state,
          showEncryption: action.data
        }
    default:
      return state;
  }
};

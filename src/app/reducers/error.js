const initialState = {
  errorMessage: null
};

export default (state = initialState, action = {}) => {
  switch(action.type) {
  case 'SET_ERROR_MESSAGE':
        return {
          ...state,
          errorMessage: action.data
        }
    default:
      return state;
  }
};

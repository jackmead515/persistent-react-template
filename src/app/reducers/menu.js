const initialState = {
  page: 'DASHBOARD'
};

export default (state = initialState, action = {}) => {
  switch(action.type) {
    case 'NAVIGATION':
      return {
        ...state,
        page: action.data.page
      }
    default:
      return state;
  }
};

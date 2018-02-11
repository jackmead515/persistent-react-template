const initialState = {
  ruleBook: null,
  password: '',
};

export default (state = initialState, action = {}) => {
  switch(action.type) {
    case 'SET_RULE_BOOK':
      return {
        ...state,
        ruleBook: action.data
      }
    case 'SET_PASSWORD':
      return {
        ...state,
        password: action.data
      }
    default:
      return state;
  }
};

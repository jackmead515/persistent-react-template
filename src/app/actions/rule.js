export const setRuleBook = (ruleBook) => {
  return {
    type: 'SET_RULE_BOOK',
    data: ruleBook
  }
}

export const setPassword = (password) => {
  return {
    type: 'SET_PASSWORD',
    data: password
  }
}

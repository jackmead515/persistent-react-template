import React, { Component } from 'react';
import { connect } from 'react-redux';

import Switch from '../../components/Switch';
import SquareButton from '../../components/SquareButton';

import RuleBookGenerator from '../../lib/jsm_encryption/RuleBookGenerator';
import RuleBook from '../../lib/jsm_encryption/RuleBook';

import { setRuleBook, setPassword } from '../../actions/rule';

class Settings extends Component {
  constructor(props){
    super(props);

    this.state = {
      newPassword: '',
      ruleBook: '',
      showChangeRuleBook: false
    }
  }

  generateRandomRuleBook() {
    let ruleBookGen = new RuleBookGenerator(70, 10);
    ruleBookGen.generateRandomRuleBook();
    let ruleBook = new RuleBook(ruleBookGen.book());

    this.setState({ruleBook: JSON.stringify(ruleBookGen.book())});
    this.props.dispatch(setRuleBook(ruleBook));
  }

  onClickSetRuleBook() {
    let ruleBook = null;
    try {
      let book = JSON.parse(this.state.ruleBook);
      ruleBook = new RuleBook(book);

      this.props.dispatch(setRuleBook(ruleBook));
    } catch(e) {
      console.log(e)
    }
  }

  render() {
    const { animateClassName, onClickShowSettings } = this.props;

    return (
      <div className={`animatedFast ${animateClassName} settings__container`}>
        <div className="settings__wrapper">
          <div style={{width: '100%'}}>
            <SquareButton
              onClick={() => onClickShowSettings()}
              title="Close"
            />
          </div>
          <div className="settings__setting">
            <div className="settings__password__container">
              <div className="settings__password__title" style={{marginBottom: 5}}>
                Random Rule Book
              </div>
              <div className="settings__password__input">
                <SquareButton
                  onClick={() => this.generateRandomRuleBook()}
                />
                <input
                  style={{marginLeft: 20}}
                  value={this.state.ruleBook}
                  type="text"
                />
              </div>
            </div>
          </div>
          <div className="settings__setting">
            <div className="settings__password__container">
              <div className="settings__password__title" style={{marginBottom: 5}}>
                Pre-Set Rule Book
              </div>
              <div className="settings__password__input">
                <SquareButton
                  onClick={() => this.onClickSetRuleBook()}
                />
                <input
                  style={{marginLeft: 20}}
                  value={this.state.ruleBook}
                  type="text"
                  onChange={(e) => this.setState({ruleBook: e.target.value})}
                />
              </div>
            </div>
          </div>
          <div className="settings__setting">
            <div className="settings__password__container">
              <div className="settings__password__title" style={{marginBottom: 5}}>
                Change Password
              </div>
              <div className="settings__password__input">
                <SquareButton
                  onClick={() => this.props.dispatch(setPassword(this.state.newPassword))}
                />
                <input
                  style={{marginLeft: 20}}
                  value={this.state.newPassword}
                  type="password"
                  onChange={(e) => this.setState({newPassword: e.target.value})}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return { ...state };
}

export default connect(mapStateToProps)(Settings);

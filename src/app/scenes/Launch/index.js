import React, { Component } from 'react';
import { history } from '../../../index.js';
import { setDisplayName, setRoomName } from '../../actions/room';
import { setErrorMessage } from '../../actions/error';
import { connect } from 'react-redux';

import RuleBookGenerator from '../../lib/jsm_encryption/RuleBookGenerator';
import RuleBook from '../../lib/jsm_encryption/RuleBook';

class Launch extends Component {
  constructor(props) {
    super(props);

    this.state = {
      room: '',
      name: '',
      loading: false,
      loadingText: 'loading'
    }

    this.ruleBookGen = new RuleBookGenerator(4, 4)
    this.ruleBookGen.generateRandomRuleBook();
    this.ruleBook = new RuleBook(this.ruleBookGen.book());

    this.loadingInterval = null;
  }

  componentWillUnmount() {
    clearInterval(this.loadingInterval);
    this.loadingInterval = null;
  }

  loginToRoom() {
    const { name, room } = this.state;

    if(name && name.length > 0 && room && room.length > 0) {
      this.setState({loading: true});

      this.loadingInterval = setInterval(() => {
        let { loadingText, loading } = this.state;
        if(!loading) {
          this.setState({loadingText: 'loading'});
          clearInterval(this.loadingInterval);
          this.loadingInterval = null;
        } else {
          this.setState({loadingText: loadingText.concat('.')});
        }
      }, 1000);

      this.props.dispatch(setDisplayName(name));
      this.props.dispatch(setRoomName(room));

      history.push('/chat');

    } else {
        this.props.dispatch(setErrorMessage('Enter in a room and display name please!'));
    }
  }

  renderError() {
    const { errorMessage } = this.props.error;

    if(errorMessage && errorMessage.length > 0) {
      setTimeout(() => {
        this.props.dispatch(setErrorMessage(null));
      }, 5000);

      return (
        <div className="launch__login__error animatedFast slideInDown" style={{marginBottom: 20}}>
          {errorMessage}
        </div>
      );
    }
  }

  renderPageControls() {
    return (
      <div className="launch__controls__container">
        <div
          style={{marginRight: 10}}
          className="launch__controls__button"
          onClick={() => history.push('/')}
        >
          Join
        </div>
        <div
         className="launch__controls__button"
         onClick={() => history.push('/create')}
        >
          Create
        </div>
      </div>
    )
  }

  renderForm() {
    return (
      <div className="launch__login__container animatedFast slideInRight">
        <div className="launch__login__input--container" style={{marginBottom: 20}}>
          <div className="launch__login__input--title">
            Room Name
          </div>
          <input
            className="launch__login__input--input"
            placeholder="Company-Tech-43"
            value={this.state.room}
            type="text"
            onChange={(e) => this.setState({room: e.target.value})}
          />
        </div>
        <div className="launch__login__input--container">
          <div className="launch__login__input--title">
            Display Name
          </div>
          <input
            className="launch__login__input--input"
            placeholder="Phil Billips"
            value={this.state.name}
            type="text"
            onChange={(e) => this.setState({name: e.target.value})}
          />
          <div
           className="launch__login__button"
           onClick={() => this.loginToRoom()}
          >
            Login
          </div>
        </div>
      </div>
    )
  }

  render() {
    const { loading, error, loadingText } = this.state;

    let jsx = null;
    if(loading) {

      let l = this.ruleBook.encrypt(loadingText, 'abcxyzijk');

      jsx = (
        <div className="launch__container">
          <div className="launch__login__loading">{l}</div>
        </div>
      )
    } else {
      jsx = (
        <div className="launch__container">
          {this.renderError()}
          {this.renderPageControls()}
          {this.renderForm()}
        </div>
      )
    }

    return jsx;
  }

}

const mapStateToProps = (state) => {
  return { ...state };
}

export default connect(mapStateToProps)(Launch);

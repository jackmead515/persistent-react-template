import React, { Component } from 'react';
import { connect } from 'react-redux';
import { history } from '../../../index.js';
import io from 'socket.io-client';

import { showEncryption } from '../../actions/settings';
import { setErrorMessage } from '../../actions/error';
import { setRuleBook, setPassword } from '../../actions/rule';

import Settings from './Settings';
import Drawer from './Drawer';

import User from '../../components/User';
import Message from '../../components/Message';
import Switch from '../../components/Switch';
import SquareButton from '../../components/SquareButton';
import ToggleInputField from '../../components/ToggleInputField';

import RuleBookGenerator from '../../lib/jsm_encryption/RuleBookGenerator';
import RuleBook from '../../lib/jsm_encryption/RuleBook';

class Chat extends Component {
  constructor(props) {
    super(props);

    this.state = {
      message: '',
      loading: true,
      showSettings: false,
      chatMessagesjsx: [],
      users: [],
      chatMessagesKey: 0
    }
  }

  componentWillUnmount() {
    this.socket.emit('disconnect');
    this.socket.disconnect();
    this.socket.close();
  }

  componentWillMount() {
    const { roomName, displayName } = this.props.room;
    this.props.dispatch(showEncryption(false));
    this.setChatRuleBook();

    this.socket = io('http://127.0.0.1:5000/');

    this.socket.on('connect', (data) => {

      this.socket.emit('join', { name: displayName, room: roomName }, () => {

      });

      this.socket.on('message', (data) => {
        this.appendMessageToArea(data);
      });

      this.socket.on('updateUserList', (data) => {
        this.setState({users: data.users});
      });

      this.socket.on('disconnect', () => {
        this.socket.disconnect();
        this.socket.close();
        this.props.dispatch(setErrorMessage('Disconnected from server'));
        history.push('/');
      });
    });
  }

  setChatRuleBook() {
    if(!this.props.rule.ruleBook) {
      let ruleBookGen = new RuleBookGenerator(70, 10);
      ruleBookGen.generateRandomRuleBook();
      let ruleBook = new RuleBook(ruleBookGen.book());
      this.props.dispatch(setRuleBook(ruleBook));
      this.props.dispatch(setPassword('password'));
    }
  }

  appendMessageToArea(data) {
    let { from, message, admin } = data;
    const { ruleBook, password } = this.props.rule;
    let { chatMessagesjsx, chatMessagesKey } = this.state;

    let decryptedMessage = '';
    if(admin) {
      decryptedMessage = message;
    } else {
      decryptedMessage = ruleBook.decrypt(message, password);
    }

    if(chatMessagesjsx.length%2 === 0) {
      chatMessagesjsx.push((
        <Message
          key={"chat-message-" + chatMessagesKey}
          from={from}
          decryptedMessage={decryptedMessage}
          encryptedMessage={message}
          even
        />
      ));
      chatMessagesKey+=1;
      this.setState({chatMessagesjsx, chatMessagesKey});
    } else {
      chatMessagesjsx.push((
        <Message
          key={"chat-message-" + chatMessagesKey}
          from={from}
          decryptedMessage={decryptedMessage}
          encryptedMessage={message}
        />
      ));
      chatMessagesKey+=1;
      this.setState({chatMessagesjsx, chatMessagesKey});
    }

    var messages = document.getElementById("messages-wrapper");
    messages.scrollTop = messages.scrollHeight;
  }

  onSubmitMessage() {
    let { message } = this.state;
    const { ruleBook, password } = this.props.rule;
    this.setState({message: ''});

    if(this.validateMessage(message)) {
      message = ruleBook.encrypt(message, password);

      this.socket.emit('message', { message });
    }
  }

  validateMessage(message) {
    let m = message.slice();

    if (typeof m === 'string' && m.replace(/\s/g, '').length > 0 && m.length > 0) {
      return true;
    } else {
      return false;
    }
  }

  getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  renderSettingsContainer() {
    const { users } = this.state;

    return (
      <Drawer
        users={users}
        onClickShowEncryption={() => {
          this.props.dispatch(showEncryption(!this.props.settings.showEncryption));

          var messages = document.getElementById("messages-wrapper");
          messages.scrollTop = messages.scrollHeight;
        }}
        onClickShowSettings={() => {
          this.setState({showSettings: !this.state.showSettings})
        }}
      />
    );
  }

  renderSettings() {
    const { showSettings } = this.state;
    let settings = null;
    if(showSettings) {
      settings = (
        <Settings
          onClickShowSettings={() => this.setState({showSettings: !this.state.showSettings})}
          animateClassName="slideInLeft"
        />
      )
    } else {
      settings = (
        <Settings
          onClickShowSettings={() => this.setState({showSettings: !this.state.showSettings})}
          animateClassName="slideOutLeft"
        />
      )
    }

    return settings;
  }

  renderTopNav() {
    return (
      <div style={{padding: 20, backgroundColor: '#3bbf3b'}}>
        Name
      </div>
    )
  }

  render() {
    const { chatMessagesjsx } = this.state;

    return (
      <div className="chat__container">
        {this.renderSettings()}
        {this.renderSettingsContainer()}
        <div className="chat__chat__container">
          <div className="chat__chat__area">
            {this.renderTopNav()}
            <div className="chat__chat__message--wrapper" id="messages-wrapper">
              {chatMessagesjsx}
            </div>
          </div>
          <div className="chat__chat__bar">
            <input
              className="chat__chat__input"
              value={this.state.message}
              type="text"
              onChange={(e) => this.setState({message: e.target.value})}
              onKeyDown={(key) => {
                if(key.which === 13) this.onSubmitMessage();
              }}
            />
            <div className="chat__chat__submit" onClick={() => this.onSubmitMessage()}>
              Send
            </div>
          </div>
          <div className="chat__chat__bar--underline"/>
        </div>
      </div>
    );
  }

}

const mapStateToProps = (state) => {
  return { ...state };
}

export default connect(mapStateToProps)(Chat);

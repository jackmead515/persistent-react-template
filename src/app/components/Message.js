import React, { Component } from 'react';
import { connect } from 'react-redux';

class Message extends Component {
  render() {
    const { encryptedMessage, decryptedMessage, from, even, showEncryption } = this.props;

    let message = showEncryption ? encryptedMessage : decryptedMessage;
    let backgroundColor = even ? '#e8e8e8' : 'white';

    return (
      <div
        className="animatedFast slideInRight chat__chat__message"
        style={{backgroundColor}}
      >
        <div className="chat__chat__message--from">
          {from}
        </div>
        <div className="chat__chat__message--message">
          {message}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return { showEncryption: state.settings.showEncryption };
}

export default connect(mapStateToProps)(Message);

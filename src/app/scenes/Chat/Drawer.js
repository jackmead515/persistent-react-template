import React, { Component } from 'react';
import { connect } from 'react-redux';

import Switch from '../../components/Switch';
import SquareButton from '../../components/SquareButton';
import User from '../../components/User';

class Drawer extends Component {
  constructor(props) {
      super(props);
  }

  renderNameAndRoom() {
    return (
      <div className="drawer__username" style={{marginBottom: 50}}>
        <div style={{marginBottom: 5}}>
          {this.props.room.displayName}
        </div>
        <div style={{color: 'blue'}}>
          {this.props.room.roomName}
        </div>
      </div>
    );
  }

  getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  renderUserList() {
    const { users } = this.props;

    /*let userList = [];
    for(let i = 0; i < 10; i++) {
      userList.push((
        <User
          key={"user-" + i}
          color={this.getRandomColor()}
          name={'DogMan'}
        />
      ))
    }*/

    let userList = users.map((u, i) => {
      u = JSON.parse(u);
      return (
        <User
          key={"user-" + i}
          color={u.color}
          name={u.name}
        />
      )
    });

    return (
      <div className="drawer__users__container">
        <div className="drawer__users__title">
          Users
        </div>
        <div className="drawer__users__wrapper">
          {userList}
        </div>
      </div>
    )
  }

  render() {
    const { onClickShowEncryption, onClickShowSettings, room } = this.props;

    return (
      <div className="drawer__container">
        <div className="drawer__wrapper">
          {this.renderNameAndRoom()}
          <Switch
            style={{marginBottom: 20}}
            title="Show Encryption"
            onClick={() => onClickShowEncryption()}
          />
          <SquareButton
            title="Settings"
            onClick={() => onClickShowSettings()}
          />
          {this.renderUserList()}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return { ...state };
}

export default connect(mapStateToProps)(Drawer);

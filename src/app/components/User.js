import React, { Component } from 'react';

export default class User extends Component {
  render() {
    const { name, color } = this.props;

    return (
      <div className="user__container">
        <div className="user__color" style={{backgroundColor: color}}/>
        <div className="user__name">
          {name}
        </div>
      </div>
    );
  }
}

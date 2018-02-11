import React, { Component } from 'react';

export default class Switch extends Component {
  constructor(props) {
    super(props);

    this.state = {
      toggled: false
    }
  }

  render() {
    const { onClick, title, style } = this.props;

    return (
      <div className="switch__wrapper" style={{...style}}>
        <label className="switch__container">
          <input
            type="checkbox"
            className="switch__input"
            onClick={() => {
              this.setState({toggled: !this.state.toggled});
              onClick(!this.state.toggled)
            }}
          />
          <span className="switch__slider" />
        </label>
        <div className="switch__title">{title}</div>
      </div>
    );
  }
}

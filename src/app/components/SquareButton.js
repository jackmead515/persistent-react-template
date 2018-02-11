import React, { Component } from 'react';

export default class SquareButton extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { onClick, title, style } = this.props;

    let titleComp = null;
    if(title) {
      titleComp = <div className="squarebutton__title">{title}</div>
    }

    return (
      <div className="squarebutton__container" style={{...style}}>
        <div className="squarebutton__button" onClick={() => onClick()}/>
        {titleComp}
      </div>
    );
  }
}

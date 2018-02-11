import React, { Component } from 'react';

export default class Post extends Component {
  constructor(props) {
    super(props);

    this.styles = {
      container: {
        border: '1px solid black',
        borderRadius: 5,
        margin: 5,
        padding: 5
      }
    }
  }

  render() {
    return (
      <div style={{...this.styles.container}}>
        {this.props.children}
      </div>
    )
  }

}

import React, { Component } from 'react';
import { connect } from 'react-redux';

import Dashboard from './Dashboard';

class RootScene extends Component {

  render() {
    const { page } = this.props.menu;

    switch(page) {
      case 'DASHBOARD':
        return <Dashboard />
      default:
        return <Dashboard />
    }
  }

}

const mapStateToProps = (state) => {
  return { ...state };
}

export default connect(mapStateToProps)(RootScene);

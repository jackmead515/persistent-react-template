import React, { Component } from 'react';
import { connect } from 'react-redux';
import { navigate } from '../actions/menu';

import Dashboard from './Dashboard';

class RootScene extends Component {

  render() {
    const { menu } = this.props;

    switch(menu) {
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

import React, { Component } from 'react';
import { connect } from 'react-redux';

import Post from '../../components/Post';

class Dashboard extends Component {

  render() {
    return (
      <div className="dashboard__container">
        <Post>
          Dashboard bro!
        </Post>
      </div>
    )
  }

}

const mapStateToProps = (state) => {
  return { ...state };
}

export default connect(mapStateToProps)(Dashboard);

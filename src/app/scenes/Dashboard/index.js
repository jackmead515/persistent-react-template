import React, { Component } from 'react';
import { connect } from 'react-redux';

import { navigate } from '../../actions/menu';

import Post from '../../components/Post';

class Dashboard extends Component {

  render() {
    return (
      <div className="dashboard__container">
        <Post>
          Dashboard bro!
        </Post>
        <Post>
          To get started, open up '/src/app/scenes/Dashboard/index.js' and modifiy the text!
        </Post>
        <Post>
          To start editting the CSS, open up '/src/app/styles/components/_dashboard.scss' and modify that!
        </Post>
        <Post>
          <button style={{padding: 10}} onClick={() => this.props.dispatch(navigate('DASHBOARD'))}>
            Sample Navigation Button!
          </button>
        </Post>
        <Post>
          Happy coding! :)
        </Post>
      </div>
    )
  }

}

const mapStateToProps = (state) => {
  return { ...state };
}

export default connect(mapStateToProps)(Dashboard);

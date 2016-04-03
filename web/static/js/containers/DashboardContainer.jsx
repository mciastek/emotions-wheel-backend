import React from 'react';
import { connect } from 'react-redux';

import { fetchCurrentUser } from 'actions/session';

class DashboardContainer extends React.Component {
  componentDidMount() {
    this.props.dispatch(fetchCurrentUser());
  }

  render() {
    const {first_name, last_name} = this.props.session.currentUser;

    return (
      <div className="container">
        <h1>Welcome {first_name} {last_name}</h1>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    session: state.session
  };
}


export default connect(mapStateToProps)(DashboardContainer);

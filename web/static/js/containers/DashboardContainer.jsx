import React from 'react';
import { connect } from 'react-redux';

import { fetchCurrentUser } from 'actions/session';
import { fetchLanguages } from 'actions/languages';

class DashboardContainer extends React.Component {
  componentDidMount() {
    this.props.dispatch(fetchCurrentUser());
    this.props.dispatch(fetchLanguages());
  }

  render() {
    return (
      <div className="container">
        {this.props.children}
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

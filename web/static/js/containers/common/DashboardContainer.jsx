import React from 'react';
import { connect } from 'react-redux';
import isEmpty from 'lodash/lang/isEmpty';

import { fetchCurrentUser } from 'actions/session';
import { fetchLanguages } from 'actions/languages';
import { fetchCountries } from 'actions/countries';
import { fetchCities } from 'actions/cities';

class DashboardContainer extends React.Component {
  componentDidMount() {
    if (isEmpty(this.props.session.currentUser)) {
      this.props.dispatch(fetchCurrentUser());
    }

    this.props.dispatch(fetchLanguages());
    this.props.dispatch(fetchCountries());
    this.props.dispatch(fetchCities());
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

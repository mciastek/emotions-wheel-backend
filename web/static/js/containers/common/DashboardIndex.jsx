import React from 'react';
import { connect } from 'react-redux';

import Stats from 'containers/common/Stats';

class DashboardIndex extends React.Component {
  render() {
    const { first_name, last_name } = this.props.session.currentUser;

    return (
      <section className="page">
        <header className="page-header">
          <h1 className="page__title">Hi, {first_name} {last_name}!</h1>
        </header>

        <section className="page__content">
          <Stats />
        </section>
      </section>
    );
  }
}

function mapStateToProps(state) {
  return {
    session: state.session
  };
}

export default connect(mapStateToProps)(DashboardIndex);

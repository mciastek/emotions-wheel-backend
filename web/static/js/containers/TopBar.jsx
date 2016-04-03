import React from 'react';
import { connect } from 'react-redux';

import AppBar from 'material-ui/lib/app-bar';
import FlatButton from 'material-ui/lib/flat-button';

import { signOut } from 'actions/session';

class TopBar extends React.Component {
  handleButtonClick(e) {
    e.preventDefault();

    this.props.dispatch(signOut());
  }

  render() {
    const logoutButton = (() => {
      return (
        <FlatButton label="Logout" onClick={this.handleButtonClick.bind(this)} />
      );
    })();

    return (
      <AppBar title="Dashboard" iconElementRight={logoutButton} />
    );
  }
}

function mapStateToProps(state) {
  return {
    session: state.session
  };
}

export default connect(mapStateToProps)(TopBar);

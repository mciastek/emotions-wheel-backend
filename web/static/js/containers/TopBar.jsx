import React from 'react';
import { connect } from 'react-redux';

import AppBar from 'material-ui/lib/app-bar';
import IconButton from 'material-ui/lib/icon-button';
import FlatButton from 'material-ui/lib/flat-button';
import NavigationMenu from 'material-ui/lib/svg-icons/navigation/menu';

import { signOut } from 'actions/session';
import { toggleNav } from 'actions/ui';

class TopBar extends React.Component {
  handleButtonClick(e) {
    e.preventDefault();

    this.props.dispatch(signOut());
  }

  handleLeftButtonTap(e) {
    e.preventDefault();

    this.props.dispatch(toggleNav());
  }

  render() {
    const logoutButton = (() => {
      return (
        <FlatButton label="Logout" onClick={this.handleButtonClick.bind(this)} />
      );
    })();

    const menuButton = (() => {
      return (
        <IconButton onClick={this.handleLeftButtonTap.bind(this)}>
          <NavigationMenu />
        </IconButton>
      );
    })();

    return (
      <AppBar title="Dashboard" iconElementLeft={menuButton} iconElementRight={logoutButton} />
    );
  }
}

function mapStateToProps(state) {
  return {
    session: state.session
  };
}

export default connect(mapStateToProps)(TopBar);

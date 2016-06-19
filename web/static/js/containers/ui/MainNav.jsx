import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';

import AppBar from 'material-ui/lib/app-bar';
import LeftNav from 'material-ui/lib/left-nav';
import Divider from 'material-ui/lib/divider';
import MenuItem from 'material-ui/lib/menus/menu-item';

import ActionHome from 'material-ui/lib/svg-icons/action/home';
import ActionQuestionAnswer from 'material-ui/lib/svg-icons/action/question-answer';
import ImagePhotoLibrary from 'material-ui/lib/svg-icons/image/photo-library';
import SocialPeople from 'material-ui/lib/svg-icons/social/people';
import ActionSettings from 'material-ui/lib/svg-icons/action/settings';
import ActionPowerSettingsNew from 'material-ui/lib/svg-icons/action/power-settings-new';

import { closeNav } from 'actions/ui';
import { signOut } from 'actions/session';

const navTitleStyles = {
  marginBottom: 30
};

const dividerStyles = {
  marginTop: 30
};

const navigationItems = [{
  label: 'Dashboard',
  icon: ActionHome,
  route: '/dashboard'
}, {
  label: 'Experiments',
  icon: ActionQuestionAnswer,
  route: '/dashboard/experiments'
}, {
  label: 'Participants',
  icon: SocialPeople,
  route: '/dashboard/participants'
}, {
  label: 'Photos',
  icon: ImagePhotoLibrary,
  route: '/dashboard/photos'
}, {
  label: 'Settings',
  icon: ActionSettings,
  route: '/dashboard/settings'
}];

class MainNav extends React.Component {
  componentDidMount() {
    this.props.dispatch(closeNav());
  }

  handleRequestChange() {
    this.props.dispatch(closeNav());
  }

  closeNav(e) {
    e.preventDefault();
    this.props.dispatch(closeNav());
  }

  singOut(e) {
    e.preventDefault();
    this.props.dispatch(signOut());
  }

  render() {
    const links = navigationItems.map((item, index) => {
      return (
        <MenuItem key={index} leftIcon={<item.icon />} primaryText={item.label} containerElement={<Link to={item.route} />} onTouchTap={this.closeNav.bind(this)} />
      );
    });

    return (
      <LeftNav
        open={this.props.ui.navOpen}
        docked={false}
        onRequestChange={this.handleRequestChange.bind(this)}>
        <AppBar title="Main menu" showMenuIconButton={false} style={navTitleStyles} />
        {links}
        <Divider style={dividerStyles} />
        <MenuItem leftIcon={<ActionPowerSettingsNew/>} onTouchTap={this.singOut.bind(this)}>Logout</MenuItem>
      </LeftNav>
    );
  }
}

function mapStateToProps(state) {
  return {
    ui: state.ui
  };
}


export default connect(mapStateToProps)(MainNav);

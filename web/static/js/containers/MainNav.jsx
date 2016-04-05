import React from 'react';
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

import { toggleNav } from 'actions/ui';

const navTitleStyles = {
  marginBottom: 30
};

const dividerStyles = {
  marginTop: 30
};

class MainNav extends React.Component {
  handleRequestChange() {
    this.props.dispatch(toggleNav());
  }

  render() {
    return (
      <LeftNav
        open={this.props.ui.navOpen}
        docked={false}
        onRequestChange={this.handleRequestChange.bind(this)}>
        <AppBar title="Main menu" showMenuIconButton={false} style={navTitleStyles} />
        <MenuItem leftIcon={<ActionHome/>}>Dashboard</MenuItem>
        <MenuItem leftIcon={<ActionQuestionAnswer/>}>Experiments</MenuItem>
        <MenuItem leftIcon={<SocialPeople/>}>Participants</MenuItem>
        <MenuItem leftIcon={<ImagePhotoLibrary/>}>Photos</MenuItem>
        <MenuItem leftIcon={<ActionSettings/>}>Settings</MenuItem>
        <Divider style={dividerStyles} />
        <MenuItem leftIcon={<ActionPowerSettingsNew/>}>Logout</MenuItem>
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

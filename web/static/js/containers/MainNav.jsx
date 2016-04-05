import React from 'react';
import { connect } from 'react-redux';

import LeftNav from 'material-ui/lib/left-nav';

import { toggleNav } from 'actions/ui';

class MainNav extends React.Component {
  handleRequestChange() {
    this.props.dispatch(toggleNav());
  }

  render() {
    return (
      <LeftNav
        open={this.props.ui.navOpen}
        docked={false}
        onRequestChange={this.handleRequestChange.bind(this)} />
    );
  }
}

function mapStateToProps(state) {
  return {
    ui: state.ui
  };
}


export default connect(mapStateToProps)(MainNav);

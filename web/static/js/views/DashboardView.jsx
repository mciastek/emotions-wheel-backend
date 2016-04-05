import React from 'react';
import { connect } from 'react-redux';

import LeftNav from 'material-ui/lib/left-nav';

import { toggleNav } from 'actions/ui';

import TopBar from 'containers/TopBar';
import DashboardContainer from 'containers/DashboardContainer';

class DashboardView extends React.Component {
  handleRequestChange() {
    this.props.dispatch(toggleNav());
  }

  render() {
    return (
      <div>
        <TopBar />
        <LeftNav
          open={this.props.ui.navOpen}
          docked={false}
          onRequestChange={this.handleRequestChange.bind(this)} />
        <DashboardContainer />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    ui: state.ui
  };
}

export default connect(mapStateToProps)(DashboardView);

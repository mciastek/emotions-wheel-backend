import React from 'react';

import TopBar from 'containers/TopBar';
import MainNav from 'containers/MainNav';

class DashboardView extends React.Component {
  render() {
    return (
      <div>
        <TopBar />
        <MainNav />
        <div className="container">
          {this.props.children}
        </div>
      </div>
    );
  }
}

export default DashboardView;

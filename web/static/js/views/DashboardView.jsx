import React from 'react';

import TopBar from 'containers/TopBar';
import DashboardContainer from 'containers/DashboardContainer';

class DashboardView extends React.Component {
  render() {
    return (
      <div>
        <TopBar />
        <DashboardContainer />
      </div>
    );
  }
}

export default DashboardView;

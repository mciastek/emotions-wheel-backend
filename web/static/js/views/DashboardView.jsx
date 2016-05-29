import React from 'react';

import TopBar from 'containers/TopBar';
import MainNav from 'containers/MainNav';
import QrDialog from 'containers/QrDialog';
import CustomDialog from 'containers/CustomDialog';

import DashboardContainer from 'containers/DashboardContainer';

class DashboardView extends React.Component {
  render() {
    return (
      <div>
        <TopBar />
        <MainNav />
        <DashboardContainer>
          {this.props.children}
        </DashboardContainer>
        <QrDialog />
        <CustomDialog />
      </div>
    );
  }
}

export default DashboardView;

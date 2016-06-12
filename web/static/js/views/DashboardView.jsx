import React from 'react';

import TopBar from 'containers/TopBar';
import MainNav from 'containers/MainNav';
import CustomDialog from 'containers/CustomDialog';
import NotificationBar from 'containers/NotificationBar';
import PhotoFullPreview from 'containers/PhotoFullPreview';

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
        <CustomDialog />
        <NotificationBar />
        <PhotoFullPreview />
      </div>
    );
  }
}

export default DashboardView;

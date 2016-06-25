import React from 'react';

import TopBar from 'containers/ui/TopBar';
import MainNav from 'containers/ui/MainNav';
import CustomDialog from 'containers/ui/CustomDialog';
import NotificationBar from 'containers/ui/NotificationBar';
import PhotoFullPreview from 'containers/photo/PhotoFullPreview';

import DashboardContainer from 'containers/common/DashboardContainer';

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

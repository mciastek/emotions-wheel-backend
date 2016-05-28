import React from 'react';

import LinkButton from 'containers/LinkButton';
import PhotosGrid from 'containers/PhotosGrid';

class ParticipantsView extends React.Component {
  render() {
    return (
      <section className="page">
        <header className="page-header">
          <div className="page-header__left">
            <h1 className="page__title">Photos</h1>
          </div>
          <div className="page-header__right">
            <LinkButton label="Add New Photo" primary={true} route="/dashboard/photos/new" />
          </div>
        </header>
        <section className="page__content">
          <PhotosGrid />
        </section>
      </section>
    );
  }
}

export default ParticipantsView;

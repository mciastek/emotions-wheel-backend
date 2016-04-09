import React from 'react';

import ParticipantContainer from 'containers/ParticipantContainer';

class ParticipantView extends React.Component {
  render() {
    return (
      <ParticipantContainer id={this.props.params.id} />
    );
  }
}

export default ParticipantView;

import React from 'react';

import ExperimentContainer from 'containers/ExperimentContainer';

class ParticipantView extends React.Component {
  render() {
    return (
      <ExperimentContainer id={this.props.params.id} />
    );
  }
}

export default ParticipantView;

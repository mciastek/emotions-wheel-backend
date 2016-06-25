import 'css/containers/stats.scss';

import React from 'react';
import { connect } from 'react-redux';

import Paper from 'material-ui/lib/paper';

import { fetchExperiments } from 'actions/experiments';
import { fetchParticipants } from 'actions/participants';
import { fetchPhotos } from 'actions/photos';

class Stats extends React.Component {
  componentDidMount() {
    this.props.dispatch(fetchExperiments());
    this.props.dispatch(fetchParticipants());
    this.props.dispatch(fetchPhotos());
  }

  render() {
    return (
      <section className="stats">
        <div className="stats__col">
          <Paper className="stats-card">
            <h1 className="stats-card__header">Experiments</h1>
            <p className="stats-card__results">{this.props.experiments.collection.length}</p>
          </Paper>
        </div>

        <div className="stats__col">
          <Paper className="stats-card">
            <h1 className="stats-card__header">Participants</h1>
            <p className="stats-card__results">{this.props.participants.collection.length}</p>
          </Paper>
        </div>

        <div className="stats__col">
          <Paper className="stats-card">
            <h1 className="stats-card__header">Photos</h1>
            <p className="stats-card__results">{this.props.photos.collection.length}</p>
          </Paper>
        </div>

        <div className="stats__col">
          <Paper className="stats-card">
            <h1 className="stats-card__header">Rates</h1>
            <p className="stats-card__results">0</p>
          </Paper>
        </div>
      </section>
    );
  }
}

function mapStateToProps(state) {
  return {
    experiments: state.experiments,
    participants: state.participants,
    photos: state.photos
  };
}

export default connect(mapStateToProps)(Stats);

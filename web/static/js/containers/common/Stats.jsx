import 'css/containers/stats.scss';

import React from 'react';
import { connect } from 'react-redux';

import Paper from 'material-ui/lib/paper';

import { fetchStats } from 'actions/stats';

class Stats extends React.Component {
  componentDidMount() {
    this.props.dispatch(fetchStats());
  }

  render() {
    return (
      <section className="stats">
        <div className="stats__col">
          <Paper className="stats-card">
            <h1 className="stats-card__header">Experiments</h1>
            <p className="stats-card__results">{this.props.stats.single.experiments}</p>
          </Paper>
        </div>

        <div className="stats__col">
          <Paper className="stats-card">
            <h1 className="stats-card__header">Participants</h1>
            <p className="stats-card__results">{this.props.stats.single.participants}</p>
          </Paper>
        </div>

        <div className="stats__col">
          <Paper className="stats-card">
            <h1 className="stats-card__header">Photos</h1>
            <p className="stats-card__results">{this.props.stats.single.photos}</p>
          </Paper>
        </div>

        <div className="stats__col">
          <Paper className="stats-card">
            <h1 className="stats-card__header">Rates</h1>
            <p className="stats-card__results">{this.props.stats.single.rates}</p>
          </Paper>
        </div>
      </section>
    );
  }
}

function mapStateToProps(state) {
  return {
    stats: state.stats
  };
}

export default connect(mapStateToProps)(Stats);

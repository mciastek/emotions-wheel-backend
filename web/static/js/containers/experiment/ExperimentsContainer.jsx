import config from '../../config';

import React from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import moment from 'moment';

import * as Colors from 'material-ui/lib/styles/colors';

import Table from 'material-ui/lib/table/table';
import TableHeader from 'material-ui/lib/table/table-header';
import TableHeaderColumn from 'material-ui/lib/table/table-header-column';
import TableBody from 'material-ui/lib/table/table-body';
import TableRow from 'material-ui/lib/table/table-row';
import TableRowColumn from 'material-ui/lib/table/table-row-column';
import RaisedButton from 'material-ui/lib/raised-button';

import { fetchExperiments, deleteSingleExperiment } from 'actions/experiments';

import {
  openCustomDialog,
  closeCustomDialog,
  setCustomDialogContent,
  showNotificationBar,
  setNotificationBarContent
} from 'actions/ui';

import EditButton from 'components/EditButton';
import PreviewButton from 'components/PreviewButton';
import DeleteButton from 'components/DeleteButton';

const shortColumnStyle = {
  width: 70
};

const optionIconStyle = {
  width: 20,
  height: 20
};

const confirmButtonStyle = {
  marginLeft: 10
};

class ExperimentsContainer extends React.Component {
  componentDidMount() {
    this.props.dispatch(fetchExperiments());
  }

  handlePreviewClick(experimentId) {
    this.props.dispatch(push(`/dashboard/experiments/${experimentId}`));
  }

  handleEditClick(experimentId) {
    this.props.dispatch(push(`/dashboard/experiments/edit/${experimentId}`));
  }

  handleModalConfirmClick(experiment) {
    this.deleteExperiment(experiment);
  }

  handleDeleteClick(experiment) {
    const actions = [
      <RaisedButton label="Cancel" secondary={true} onTouchTap={() => this.props.dispatch(closeCustomDialog())} />,
      <RaisedButton label="Delete" primary={true} style={confirmButtonStyle} onTouchTap={this.handleModalConfirmClick.bind(this, experiment)} />
    ];

    this.props.dispatch(openCustomDialog());

    this.props.dispatch(setCustomDialogContent({
      title: `Delete ${experiment.name}`,
      content: 'Are you sure that you want to delete that experiment?',
      actions: actions
    }));
  }

  deleteExperiment(experiment) {
    this.props.dispatch(deleteSingleExperiment(experiment.id))
      .then(() => {
        this.props.dispatch(showNotificationBar());

        this.props.dispatch(setNotificationBarContent({
          message: `${experiment.name} deleted!`
        }));

        this.props.dispatch(closeCustomDialog());
      });
  }

  formattedDate(date) {
    return moment(date).format(config.date.formatDateTime);
  }

  isEnded(endDate) {
    return moment().isAfter(moment(endDate));
  }

  render() {
    const rows = this.props.experiments.collection.map((experiment) => {

      const editButton = (() => {
        if (!this.isEnded(experiment.end_date)) {
          return (
            <EditButton iconStyle={optionIconStyle} iconColor={Colors.cyan500} onTap={this.handleEditClick.bind(this, experiment.id)} />
          );
        }
      })();

      return (
        <TableRow key={experiment.id}>
          <TableRowColumn style={shortColumnStyle}>{experiment.id}</TableRowColumn>
          <TableRowColumn>{experiment.name}</TableRowColumn>
          <TableRowColumn>{experiment.kind}</TableRowColumn>
          <TableRowColumn>{this.formattedDate(experiment.start_date)}</TableRowColumn>
          <TableRowColumn>{this.formattedDate(experiment.end_date)}</TableRowColumn>
          <TableRowColumn>
            <PreviewButton iconStyle={optionIconStyle} iconColor={Colors.cyan500} onTap={this.handlePreviewClick.bind(this, experiment.id)} />
            {editButton}
            <DeleteButton iconStyle={optionIconStyle} iconColor={Colors.cyan500} onTap={this.handleDeleteClick.bind(this, experiment)} />
          </TableRowColumn>
        </TableRow>
      );
    });

    return (
      <Table>
        <TableHeader>
          <TableRow>
            <TableHeaderColumn style={shortColumnStyle}>ID</TableHeaderColumn>
            <TableHeaderColumn>Name</TableHeaderColumn>
            <TableHeaderColumn>Experiment mode</TableHeaderColumn>
            <TableHeaderColumn>Start date</TableHeaderColumn>
            <TableHeaderColumn>End date</TableHeaderColumn>
            <TableHeaderColumn>Options</TableHeaderColumn>
          </TableRow>
        </TableHeader>
        <TableBody>
          {rows}
        </TableBody>
      </Table>
    );
  }
}

function mapStateToProps(state) {
  return {
    experiments: state.experiments
  };
}

export default connect(mapStateToProps)(ExperimentsContainer);

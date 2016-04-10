import config from '../config';

import React from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import moment from 'moment';

import Colors from 'material-ui/lib/styles/colors';

import Table from 'material-ui/lib/table/table';
import TableHeader from 'material-ui/lib/table/table-header';
import TableHeaderColumn from 'material-ui/lib/table/table-header-column';
import TableBody from 'material-ui/lib/table/table-body';
import TableRow from 'material-ui/lib/table/table-row';
import TableRowColumn from 'material-ui/lib/table/table-row-column';

import { fetchParticipants } from 'actions/participants';

import EditButton from 'components/EditButton';
import DeleteButton from 'components/DeleteButton';

const shortColumnStyle = {
  width: 70
};

const optionIconStyle = {
  width: 20,
  height: 20
};

class ParticipantsContainer extends React.Component {
  componentDidMount() {
    this.props.dispatch(fetchParticipants());
  }

  render() {
    const rows = this.props.participants.collection.map((participant) => {

      const editButtonClick = () => {
        this.props.dispatch(push(`/dashboard/participants/${participant.id}`));
      };

      const formattedBirthdate = moment(participant.birthdate).format(config.date.format);

      return (
        <TableRow key={participant.id}>
          <TableRowColumn style={shortColumnStyle}>{participant.id}</TableRowColumn>
          <TableRowColumn>{participant.first_name} {participant.last_name}</TableRowColumn>
          <TableRowColumn>{participant.gender}</TableRowColumn>
          <TableRowColumn>{formattedBirthdate}</TableRowColumn>
          <TableRowColumn style={shortColumnStyle}>{participant.age}</TableRowColumn>
          <TableRowColumn>{participant.email}</TableRowColumn>
          <TableRowColumn>
            <EditButton iconStyle={optionIconStyle} iconColor={Colors.cyan500} onTap={editButtonClick} />
            <DeleteButton iconStyle={optionIconStyle} iconColor={Colors.cyan500} />
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
            <TableHeaderColumn>Gender</TableHeaderColumn>
            <TableHeaderColumn>Birthdate</TableHeaderColumn>
            <TableHeaderColumn style={shortColumnStyle}>Age</TableHeaderColumn>
            <TableHeaderColumn>Email</TableHeaderColumn>
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
    participants: state.participants
  };
}

export default connect(mapStateToProps)(ParticipantsContainer);

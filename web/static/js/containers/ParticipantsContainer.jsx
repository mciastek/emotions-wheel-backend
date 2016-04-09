import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';

import Colors from 'material-ui/lib/styles/colors';

import Table from 'material-ui/lib/table/table';
import TableHeader from 'material-ui/lib/table/table-header';
import TableHeaderColumn from 'material-ui/lib/table/table-header-column';
import TableBody from 'material-ui/lib/table/table-body';
import TableRow from 'material-ui/lib/table/table-row';
import TableRowColumn from 'material-ui/lib/table/table-row-column';

import IconButton from 'material-ui/lib/icon-button';
import ImageEdit from 'material-ui/lib/svg-icons/image/edit';
import ActionDelete from 'material-ui/lib/svg-icons/action/delete';

import { fetchParticipants } from 'actions/participants';

import EditButton from 'components/EditButton';

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

      return (
        <TableRow key={participant.id}>
          <TableRowColumn style={shortColumnStyle}>{participant.id}</TableRowColumn>
          <TableRowColumn>{participant.first_name} {participant.last_name}</TableRowColumn>
          <TableRowColumn>{participant.gender}</TableRowColumn>
          <TableRowColumn>{participant.birthdate}</TableRowColumn>
          <TableRowColumn style={shortColumnStyle}>{participant.age}</TableRowColumn>
          <TableRowColumn>{participant.email}</TableRowColumn>
          <TableRowColumn>
            <EditButton iconStyle={optionIconStyle} iconColor={Colors.cyan500} onTap={editButtonClick} />

            <IconButton iconStyle={optionIconStyle}>
              <ActionDelete color={Colors.cyan500} />
            </IconButton>
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

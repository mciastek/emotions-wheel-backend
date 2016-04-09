import React from 'react';

import Table from 'material-ui/lib/table/table';
import TableHeader from 'material-ui/lib/table/table-header';
import TableHeaderColumn from 'material-ui/lib/table/table-header-column';
import TableRow from 'material-ui/lib/table/table-row';

class ParticipantsView extends React.Component {
  render() {
    return (
      <section className="page">
        <header className="page__header">
          <h1 className="page__title">Participants</h1>
          <h3 className="page__subtitle">List of participants</h3>
        </header>
        <section className="page__content">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHeaderColumn>ID</TableHeaderColumn>
                <TableHeaderColumn>Gender</TableHeaderColumn>
                <TableHeaderColumn>Name</TableHeaderColumn>
                <TableHeaderColumn>Birthdate</TableHeaderColumn>
                <TableHeaderColumn>Age</TableHeaderColumn>
                <TableHeaderColumn>Email</TableHeaderColumn>
              </TableRow>
            </TableHeader>
          </Table>
        </section>
      </section>
    );
  }
}

export default ParticipantsView;

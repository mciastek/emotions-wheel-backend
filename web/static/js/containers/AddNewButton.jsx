import React from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';

import RaisedButton from 'material-ui/lib/raised-button';

class AddNewButton extends React.Component {
  handleTap() {
    this.props.dispatch(push(this.props.route));
  }

  render() {
    return (
      <RaisedButton {...this.props} onTouchTap={this.handleTap.bind(this)} primary={true} />
    );
  }
}

export default connect()(AddNewButton);

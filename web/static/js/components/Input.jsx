import React from 'react';
import TextField from 'material-ui/lib/text-field';

class Input extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      value: props.value
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      value: nextProps.value
    });
  }

  handleChange(e) {
    const { value } = e.target;

    this.setState({ value });

    if (value && this.state.errorText) {
      this.setState({
        errorText: null
      });
    }

    if (this.props.onChange) {
      this.props.onChange(e);
    }
  }

  render() {
    return (
      <TextField
        {...this.props}
        errorText={this.state.errorText}
        value={this.state.value}
        fullWidth={true}
        onChange={this.handleChange.bind(this)} />
    );
  }
}

export default Input;

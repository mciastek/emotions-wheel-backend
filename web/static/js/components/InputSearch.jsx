import React from 'react';
import AutoComplete from 'material-ui/lib/auto-complete';

class InputSearch extends React.Component {
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

  handleChange(value) {
    this.setState({ value });

    if (value && this.state.errorText) {
      this.setState({
        errorText: null
      });
    }

    if (this.props.onChange) {
      this.props.onChange(value);
    }
  }

  render() {
    const filterType = (this.props.filterType) ? AutoComplete[this.props.filterType] : null;

    return (
      <AutoComplete
        {...this.props}
        errorText={this.state.errorText}
        searchText={this.state.value}
        autoComplete="off"
        filter={filterType}
        onNewRequest={this.handleChange.bind(this)}
        onUpdateInput={this.handleChange.bind(this)} />
    );
  }
}

export default InputSearch;

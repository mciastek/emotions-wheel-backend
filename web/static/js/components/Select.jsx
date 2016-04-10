import React, { PropTypes } from 'react';

import SelectField from 'material-ui/lib/select-field';
import MenuItem from 'material-ui/lib/menus/menu-item';

const fullWidthStyle = {
  width: '100%'
};

class Select extends React.Component {
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

  handleChange(e, i, value) {
    this.setState({ value });

    if (this.props.onChange) {
      this.props.onChange(e, i, value);
    }
  }

  render() {
    const options = this.props.options.map((option, index) => {
      return (
        <MenuItem key={index} value={option.value} primaryText={option.label}/>
      );
    });

    let props = this.props;

    if (!this.props.autoWidth) {
      props = {
        ...this.props,
        style: fullWidthStyle
      };
    }

    return (
      <SelectField {...props} value={this.state.value} onChange={this.handleChange.bind(this)}>
        {options}
      </SelectField>
    );
  }
}

Select.propTypes = {
  options: PropTypes.array.isRequired
};

export default Select;

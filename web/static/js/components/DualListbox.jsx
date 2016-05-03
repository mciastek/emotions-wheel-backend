import 'css/components/dual-listbox.scss';

import React from 'react';

import Paper from 'material-ui/lib/paper';
import List from 'material-ui/lib/lists/list';
import ListItem from 'material-ui/lib/lists/list-item';
import ContentForward from 'material-ui/lib/svg-icons/content/forward';
import ContenUndo from 'material-ui/lib/svg-icons/content/undo';

class DualListbox extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      leftList: [],
      rightList: [],
      selection: []
    };
  }

  componentWillReceiveProps(nextProps) {
    if (!nextProps) return;

    this.setState({
      leftList: [...nextProps.collection]
    });
  }

  handleAdd(item) {
    this.setState({
      rightList: [
        ...this.state.rightList,
        item
      ]
    }, function() {
      this.filterList('leftList', item.id);
      this.updateSelection();
    });

  }

  handleRemove(item) {
    this.setState({
      leftList: [
        ...this.state.leftList,
        item
      ]
    });

    this.filterList('rightList', item.id, () => {
      this.updateSelection();
    });
  }

  filterList(listName, prop, callback) {
    this.setState({
      [listName]: this.state[listName].filter((item) => item[this.props.selectBy] !== prop)
    }, function() {
      if (callback) {
        callback();
      }
    });
  }

  updateSelection() {
    this.setState({
      selection: this.state.rightList.map((item) => item[this.props.selectBy])
    });
  }

  render() {
    const leftList = (() => {
      return this.state.leftList.map((item, index) => {
        const label = (this.props.listItemLabel) ? this.props.listItemLabel(item) : item;

        return (
          <ListItem key={index} primaryText={label} onTouchTap={this.handleAdd.bind(this, item)} rightIcon={<ContentForward />} />
        );
      });
    })();

    const rightList = (() => {
      return this.state.rightList.map((item, index) => {
        const label = (this.props.listItemLabel) ? this.props.listItemLabel(item) : item;

        return (
          <ListItem key={index} primaryText={label} onTouchTap={this.handleRemove.bind(this, item)} rightIcon={<ContenUndo />} />
        );
      });
    })();

    return (
      <div className="dual-listbox">
        <div className="dual-listbox__col">
          <div className="dual-listbox__label">
            {this.props.leftLabel}
          </div>
          <Paper>
            <List>
              {leftList}
            </List>
          </Paper>
        </div>
        <div className="dual-listbox__col">
          <div className="dual-listbox__label">
            {this.props.rightLabel}
          </div>
          <Paper>
            <List>
              {rightList}
            </List>
          </Paper>
        </div>
      </div>
    );
  }
}

DualListbox.defaultProps = {
  selectBy: 'name'
};

export default DualListbox;

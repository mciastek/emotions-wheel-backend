import 'css/components/dual-listbox.scss';

import React from 'react';

import Paper from 'material-ui/lib/paper';
import List from 'material-ui/lib/lists/list';
import ListItem from 'material-ui/lib/lists/list-item';
import IconButton from 'material-ui/lib/icon-button';

import * as Colors from 'material-ui/lib/styles/colors';
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

    const { selected = [], collection } = nextProps;

    if (selected.length) {
      this.setState({
        leftList: [...this.xor(collection, selected)],
        rightList: [...selected],
        selection: this.mappedToIds(selected)
      });
    } else {
      this.setState({
        leftList: [...collection]
      });
    }
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
      [listName]: this.filtered(this.state[listName], prop)
    }, function() {
      if (callback) {
        callback();
      }
    });
  }

  xor(collection, selected) {
    const { selectBy } = this.props;

    return collection.filter((item) => {
      return selected.every((selectedItem) => {
        return selectedItem[selectBy] !== item[selectBy];
      });
    });
  }

  filtered(collection, prop) {
    return collection.filter((item) => item[this.props.selectBy] !== prop);
  }

  mappedToIds(collection) {
    return collection.map((item) => item[this.props.selectBy]);
  }

  updateSelection() {
    this.setState({
      selection: this.mappedToIds(this.state.rightList)
    });
  }

  render() {
    const leftList = (() => {
      return this.state.leftList.map((item, index) => {
        const label = (this.props.listItemLabel) ? this.props.listItemLabel(item) : item;

        const button = (
          <IconButton onTouchTap={this.handleAdd.bind(this, item)}>
            <ContentForward color={Colors.cyan500} />
          </IconButton>
        );

        return (
          <ListItem key={index} primaryText={label} rightIconButton={button} />
        );
      });
    })();

    const rightList = (() => {
      return this.state.rightList.map((item, index) => {
        const label = (this.props.listItemLabel) ? this.props.listItemLabel(item) : item;

        const button = (
          <div>
            {(this.props.rightListItemAction) ? this.props.rightListItemAction(item) : null}
            <IconButton onTouchTap={this.handleRemove.bind(this, item)}>
              <ContenUndo color={Colors.pink500} />
            </IconButton>
          </div>
        );

        return (
          <ListItem key={index} primaryText={label} rightIconButton={button} />
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

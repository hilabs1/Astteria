import React, { Component } from 'react';
import { View, ScrollView, Text } from 'react-native';
import { views, filterViews } from '../styling';
import { FilterButton } from './FilterButton';
import { all } from '../../strings';
import * as colors from '../../colors';
import { isBetween, dev } from '../../../Cortex';
import { ClearButton } from './ClearButton';
import PropTypes from 'prop-types';

const textStyles = [
  filterViews.filterBlacktextStyle,
  filterViews.filterWhiteTextStyle,
];
const buttonStyles = [colors.filterButtonGray, colors.blueButton];

export default class ScrollFilter extends Component {
  _isMounted = false;
  constructor(props) {
    super(props);
    this.state = {
      range: props.range,
      showClearButton: props.showClearButton,
      buttons: props.buttons,
    };
  }

  componentDidMount() {
    // console.log(this.props);
    this._isMounted = true;
  }

  componentWillUnmount() {
    this.clearAll();
    // console.log(this.props);
    this._isMounted = false;
  }

  /**
   * [getView triggered by render
   * 		handles viewing a view with or without the x button depending
   * 		on what's in this.state[strings.clearAllButton]]
   * @return void [description]
   */
  getView() {
    if (this.props.name) {
      return (
        <View style={views.filterTitleViewStyle}>
          <Text style={views.filterTitleStyle}>{this.props.name}</Text>

          {this.state.showClearButton !== 0 && (
            <ClearButton onPress={() => this.clearAll()} />
          )}
        </View>
      );
    }
  }

  /**
   * [buttonPressed: triggered when a clarity button is pressed,
   * 		handles changing appearance of pressed button]
   * @param  String  chosenClarity  [the name of the button that was pressed]
   * @param  int 	   num 			  [the number of the button that was pressed, for updating scale]
   * @return void [description]
   */
  async clickButton(key) {
    const buttonColorState = (this.state.buttons[key].isChosen + 1) % 2;
    (await buttonColorState)
      ? this.chooseButton(key)
      : this.unChooseButton(key);
    this.submit();
  }

  async unChooseButton(key) {
    let showClearButton = this.state.showClearButton - 1;
    if (this.props.isRange) {
      let newRange = this.state.range;
      if (key === this.state.range[0] && key === this.state.range[1]) {
        newRange = [-1, -1];
        showClearButton = 0;
      } else {
        if (key === this.state.range[0]) {
          newRange = [key + 1, this.state.range[1]];
        } else {
          if (key === this.state.range[1]) {
            newRange = [this.state.range[0], key - 1];
          }
        }
      }
      this.setState({
        range: newRange,
        showClearButton: showClearButton,
        buttons: this.state.buttons.map((button) => {
          return button.key === key && !isBetween(button.key, newRange, false)
            ? {
                key: button.key,
                text: button.text,
                isChosen: 0,
                flex: button.flex,
                row2: button.row2 || undefined,
              }
            : button;
        }),
      });
    } else {
      this.setState({
        showClearButton: showClearButton,
        buttons: this.state.buttons.map((button) => {
          return button.key === key
            ? {
                key: button.key,
                text: button.text,
                isChosen: 0,
                flex: button.flex,
                row2: button.row2 || undefined,
              }
            : button;
        }),
      });
    }
  }

  shouldComponentUpdate() {
    return true;
  }

  showClearButton(newRange) {
    return newRange[0] === 0 && newRange[1] === 0
      ? 1
      : newRange[1] - newRange[0] + 1;
  }

  async chooseButton(key) {
    if (this.props.isRange) {
      const newRange =
        this.state.range[0] < 0
          ? [key, key]
          : [
              Math.min(this.state.range[0], key),
              Math.max(this.state.range[1], key),
            ];

      // dev('ScrollFilter', 'chooseButton', `newRange ${newRange}`);
      const showClearButton = this.showClearButton(newRange);
      // dev('ScrollFilter', 'chooseButton', `showClearButton ${showClearButton}`)
      this.setState({
        range: newRange,
        showClearButton: showClearButton,
        buttons: this.state.buttons.map((button) => {
          return isBetween(button.key, newRange, true)
            ? {
                key: button.key,
                text: button.text,
                isChosen: 1,
                flex: button.flex,
                row2: button.row2 || undefined,
              }
            : button;
        }),
      });
    } else {
      const showClearButton = this.state.showClearButton + 1;
      this.setState({
        showClearButton: showClearButton,
        buttons: this.state.buttons.map((button) => {
          return button.key === key
            ? {
                key: button.key,
                text: button.text,
                isChosen: 1,
                flex: button.flex,
                row2: button.row2 || undefined,
              }
            : button;
        }),
      });
    }
  }

  clearAll = () => {
    // TODO i think i need to map clearall or sth, cuz clearall clears the first, which is color filter
    // dev('ScrollFilter', 'clearAll', this.props.stateName)
    if (this._isMounted) {
      this.setState(
        {
          range: this.props.range,
          showClearButton: 0,
          buttons: this.props.buttons,
        },
        () => {
          dev(
            'ScrollFilter',
            'clearAll',
            `name ${this.props.name}, showClearButton ${this.state.showClearButton}`
          );
          this.submit();
        }
      );
    }
  };

  submit() {
    let choiceArr = [];
    this.state.buttons.map((button) => {
      if (button.isChosen === 1) {
        choiceArr.push(this.props.stringArr[button.row2 || button.key]);
      }
    });
    // console.log('tkt choiceArr', choiceArr);
    if (choiceArr.length === 0) {
      choiceArr = [all];
    }
    if (this.props.toggleClear) {
      this.props.toggleClear(this.state.showClearButton, this.props.isColor);
    }
    // console.log(
    //   'tkt this.state.buttons',
    //   this.state.buttons,
    //   'this.props.stateName',
    //   this.props.stateName,
    //   'choiceArr',
    //   choiceArr
    // );
    this.props.stateHandler(this.props.stateName, choiceArr);
  }

  colorRender() {
    return this.props.isColor ? (
      this.getScrollView()
    ) : (
      <View style={views.shadowBox}>
        {this.getView()}

        <View style={filterViews.viewStyle}>{this.getScrollView()}</View>
      </View>
    );
  }

  getScrollView() {
    return (
      <ScrollView
        horizontal={true}
        contentContainerStyle={this.props.scrollViewStyle}
        scrollEnabled={this.props.scrollEnabled}>
        {this.state.buttons.map((button) => (
          <FilterButton
            key={button.key}
            text={button.text}
            isChosen={buttonStyles[button.isChosen]}
            textStyle={textStyles[button.isChosen]}
            flex={button.flex}
            onPress={() => this.clickButton(button.key)}
          />
        ))}
      </ScrollView>
    );
  }

  render() {
    return this.colorRender();
  }
}

ScrollFilter.propTypes = {
  name: PropTypes.string,
  stateName: PropTypes.string,
  stringArr: PropTypes.array,
  scrollViewStyle: PropTypes.object,
  scrollEnabled: PropTypes.bool,
  isRange: PropTypes.bool,
  range: PropTypes.array || null,
  showClearButton: PropTypes.number,
  buttons: PropTypes.array,
  stateHandler: PropTypes.func,
  isColor: PropTypes.string,
  toggleClear: PropTypes.func,
};

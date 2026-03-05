import React, { Component } from 'react';
import { View, Text, CheckBox, Platform, Switch } from 'react-native';

import ScrollFilter from '../components/ScrollFilter';
import * as strings from '../../strings';
import PropTypes from 'prop-types';

import { colorTable } from '../styling';
import { TEXT } from '../../../Cortex';

import { intensities, colors } from '../filterObject';

const refs = [];

export default class FancyColor extends Component {
  /**
	 * [constructor]
	 * @param  <T> props [props passed from parent component
	 *                   action: refers to colorTable's prop from stateHandler() from its parent (grandparent)]
	 *                   clear: refers to parent's showClearAll()]
	 *
	 *         String [] intensities && String [] fColors: arrays of state names
	 *
	 *         states: each color button is associated with a color state which indicates if it was chosen
	 *         		   colors.filterButtonGray: when button was not chosen
	 *         		   colors.blueButton: whenn button was pressed
					   [strings.clearAllButton] -> state of the x button, default is null, meaning, invisible
					   min && max -> keep track of scale

	 * @return void      [description]
	 */
  constructor(props) {
    super(props);
    this.state = {
      ...intensities,
      ...colors,
      intensities: 0,
      colors: 0,
      overtone: 0,
      showClearButton: 0,
      [strings.fancyOvertoneState]: true,
      colorStateRow1: [strings.all],
      colorStateRow2: [strings.all],
    };
  }

  /**
   * [checkboxDef triggered by render (bottom)
   * 		handles picker appearence according to OS]
   * @return Switch/Checkbox [for ios or android respectively]
   */
  checkboxDef = () =>
    Platform.OS === 'ios' ? (
      <Switch
        style={{ alignSelf: 'center' }}
        value={!this.state[strings.fancyOvertoneState]}
        onValueChange={() => this.toggleOvertone()}
      />
    ) : (
      <CheckBox
        style={{ alignSelf: 'center' }}
        value={!this.state[strings.fancyOvertoneState]}
        onValueChange={() => this.toggleOvertone()}
      />
    );

  /**
   * [toggleOvertone triggered by checkboxDef()
   * 		handles toogling/checking the switch/checkbox]
   * @return {[type]} [description]
   */
  toggleOvertone = () => {
    this.setState(
      {
        [strings.fancyOvertoneState]: !this.state[strings.fancyOvertoneState],
        overtone: 1 - this.state.overtone,
      },
      () => {
        this.showClearAll();
      }
    );
  };

  toggleClear = (number, state) => {
    this.setState(
      {
        [state]: number,
      },
      () => {
        this.showClearAll();
      }
    );
  };

  showClearAll = () => {
    this.props.showClearAll(
      this.state.intensities + this.state.colors + this.state.overtone
    );
  };

  reset = () => {
    this.setState({
      ...intensities,
      ...colors,
      intensities: 0,
      colors: 0,
      showClearButton: 0,
      [strings.fancyOvertoneState]: true,
      colorStateRow1: [strings.all],
      colorStateRow2: [strings.all],
    });
    [0, 1, 2].map((index) => {
      refs[index] && refs[index].clearAll();
    });
  };

  stateHandler = (stateName, value, colorState) => {
    this.setState(
      {
        [colorState]: value,
      },
      () => {
        let combo = [];
        if (this.state.colorStateRow1[0] === strings.all) {
          combo = this.state.colorStateRow2;
        } else if (this.state.colorStateRow2[0] === strings.all) {
          combo = this.state.colorStateRow1;
        } else {
          combo = [...this.state.colorStateRow1, ...this.state.colorStateRow2];
        }
        this.props.stateHandler(stateName, combo);
      }
    );
    // }
  };

  render() {
    return (
      <View style={colorTable.fancyContainerStyle}>
        <Text style={colorTable.subTitleTextStyle}>{TEXT.intensity}</Text>

        <ScrollFilter
          stateName={strings.fancyIntensities}
          stringArr={intensities.stringArr}
          scrollViewStyle={intensities.scrollViewStyle}
          scrollEnabled={intensities.scrollEnabled}
          isRange={intensities.isRange}
          showClearButton={this.state.showClearButton}
          buttons={this.state.buttons}
          stateHandler={this.props.stateHandler}
          toggleClear={(number, state) => this.toggleClear(number, state)}
          isColor={'intensities'}
          ref={(ScrollFilter) => refs.push(ScrollFilter)}
        />

        <Text style={colorTable.subTitleTextStyle}>{TEXT.color}</Text>

        <ScrollFilter
          name={colors.name}
          stateName={strings.fancyColorArr}
          stringArr={colors.stringArr}
          scrollViewStyle={colors.scrollViewStyle}
          scrollEnabled={colors.scrollEnabled}
          isRange={colors.isRange}
          showClearButton={this.state.showClearButton}
          buttons={this.state.firstRow}
          stateHandler={(stateName, value) =>
            this.stateHandler(stateName, value, 'colorStateRow1')
          } // this.props.stateHandler}
          toggleClear={(number, state) => this.toggleClear(number, state)}
          isColor={'colors'}
          ref={(ScrollFilter) => refs.push(ScrollFilter)}
        />

        <ScrollFilter
          name={colors.name}
          stateName={strings.fancyColorArr}
          stringArr={colors.stringArr}
          scrollViewStyle={colors.scrollViewStyle}
          scrollEnabled={colors.scrollEnabled}
          isRange={colors.isRange}
          showClearButton={this.state.showClearButton}
          buttons={this.state.secondRow}
          stateHandler={(stateName, value) =>
            this.stateHandler(stateName, value, 'colorStateRow2')
          } // this.props.stateHandler}
          toggleClear={(number, state) => this.toggleClear(number, state)}
          isColor={'colors'}
          ref={(ScrollFilter) => refs.push(ScrollFilter)}
        />

        <View style={colorTable.overtoneStyle}>
          {this.checkboxDef()}
          <Text style={colorTable.subTitleTextStyle}>{TEXT.overtone}</Text>
        </View>
      </View>
    );
  }
}

FancyColor.propTypes = {
  showClearButton: PropTypes.number,
  stateHandler: PropTypes.func,
  showClearAll: PropTypes.func,
  clean: PropTypes.func,
};

import React, { Component } from 'react';
import {
  Text,
  TextInput,
  View,
  TouchableOpacity,
  Image,
  Alert,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import * as strings from '../strings';
import * as colors from '../colors';
import { views, buttons, weight } from './styling.js';
import { TEXT } from '../../Cortex';

const weightSegments = [
  { from: 0.1, to: 0.3, valueTo: '0.29' },
  { from: 0.3, to: 0.39, valueTo: '0.39' },
  { from: 0.4, to: 0.49, valueTo: '0.49' },
  { from: 0.5, to: 0.69, valueTo: '0.69' },
  { from: 0.7, to: 0.89, valueTo: '0.89' },
  { from: 0.9, to: 0.99, valueTo: '0.99' },
  { from: 1, to: 1.49, valueTo: '1.49' },
  { from: 1.5, to: 1.99, valueTo: '1.99' },
  { from: 2, to: 2.99, valueTo: '2.99' },
  { from: 3, to: 4.99, valueTo: '4.99' },
  { from: 5, to: 9.99, valueTo: '9.99' },
  { from: 10, to: 100, valueTo: '100' },
  { from: 100, to: 1000, valueTo: '100' },
];

export default class Weight extends Component {
  /**
 * [constructor ]
 * @param  <T> props [props passed from parent component
 *                   stateHandler: refers to parent's stateHandler()]
 *
 *         states: [strings.from] && [strings.to] -> keep track of user's weight selection
 *         [strings.clearAllButton] -> state of the x button, default is null, meaning, invisible
           valueFrom && valueTo -> handles clearing textInput in case of need

 * @return void      [description]
 */
  constructor(props) {
    super(props);
    this.state = {
      [strings.fromWeight]: [strings.ZERO],
      [strings.to]: [strings.HUNDRED],
      [strings.clearAllButton]: null,
      valueFrom: '',
      valueTo: '',
    };
  }

  /**
   * [changeInputTo triggered when with user input]
   * @param  String  weight [user's weight input]
   * @return void
   */
  changeInputTo(weight) {
    this.setState(
      {
        [strings.to]: weight || strings.HUNDRED,
        valueTo: weight || '',
      },
      () => {
        this.showClearAll();
        this.submit();
      }
    );
  }

  /**
   * [changeInputFrom triggered when user submit value in from textInput
   * 		 handles onTextChange of textInput
   * 						also handles autofill for different ranges of weights]
   * @param  String weight      [user's input]
   */
  changeInputFrom(weight) {
    const segment = weightSegments.find(
      ({ from, to }) => weight >= from && weight < to
    );

    const to = segment ? segment.valueTo : '';

    this.setState(
      {
        [strings.fromWeight]: weight || strings.ZERO,
        valueFrom: weight || '',
        [strings.to]: weight ? to : strings.HUNDRED,
        valueTo: weight ? to : '',
      },
      () => {
        this.showClearAll();
        this.submit();
      }
    );
  }

  /**
   * [showAlert triggered by changeInput()
   * 		throws a pop up that weight input is invalid
   * 		then, clears textInput fields]
   * @return  void	 [description]
   */
  showAlert() {
    Alert.alert(strings.numericTypo);
    this.clearAll();
  }

  /**
   * [submit triggered by clearAll() & changeInput()()
   * 		creates an array of chosen shapes and send to parent component]
   * @return void [description]
   */
  submit() {
    const valFrom = parseFloat(this.state[strings.fromWeight]);
    const valTo = parseFloat(this.state[strings.to]);
    var choiceArray = [];
    if (valFrom > valTo) {
      choiceArray = [
        parseFloat(this.state[strings.to]),
        parseFloat(this.state[strings.fromWeight]),
      ];
    } else {
      choiceArray = [
        parseFloat(this.state[strings.fromWeight]),
        parseFloat(this.state[strings.to]),
      ];
    }
    this.props.stateHandler(strings.weightRangeState, choiceArray);
  }

  /**
   * [showClearAll triggered by sumbit(), clearAll() && changeInput()
   * 		handles state of this.state[clearAllButton] -> the x buttun
   * 		either a touchable of the x button
   * 		or null]
   * @return void	         [description]
   */
  showClearAll() {
    if (
      this.state[strings.fromWeight] !== strings.ZERO ||
      this.state[strings.to] !== strings.HUNDRED
    ) {
      this.setState({
        [strings.clearAllButton]: (
          <TouchableOpacity
            style={buttons.cancelTouchableStyle}
            onPress={() => this.clearAll()}>
            <Image
              source={require('../../assets/pics/delete.png')}
              style={buttons.cancelImageStyle}></Image>
          </TouchableOpacity>
        ),
      });
    } else {
      this.setState({
        [strings.clearAllButton]: null,
      });
    }
  }

  /**
   * [clearAll triggered when user presses x button
   * 		handles clearing user's selection]
   * @return void [description]
   */
  clearAll() {
    console.log('tkt weight clear all called');
    this.setState(
      {
        [strings.to]: strings.HUNDRED,
        [strings.fromWeight]: strings.ZERO,
        valueFrom: '',
        valueTo: '',
      },
      () => {
        this.showClearAll();
        // this.submit();
      }
    );
  }

  /**
   * [getView triggered by render
   * 		handles viewing a view with or without the x button depending
   * 		on what's in this.state[strings.clearAllButton]]
   * @return void [description]
   */
  getTitleView() {
    return (
      <View style={views.filterTitleViewStyle}>
        <Text style={views.filterTitleStyle}>
          {this.props.type.toUpperCase()}
        </Text>
        {this.state[strings.clearAllButton]}
      </View>
    );
  }

  render() {
    return (
      <TouchableWithoutFeedback
        style={views.shadowBox}
        onPress={() => Keyboard.dismiss()}>
        <View style={views.shadowBox}>
          {this.getTitleView()}

          <View style={views.viewStyle}>
            <View style={views.rowStyle}>
              {/* from======= */}
              <TextInput
                ref={strings.fromWeight.toString()}
                style={weight.textInputStyle}
                multiline={false}
                maxLength={10}
                placeholderTextColor={colors.gray}
                placeholder={this.state[strings.fromWeight].toString()}
                underlineColorAndroid={colors.trans}
                keyboardType='numeric'
                textAlign={'center'}
                value={this.state.valueFrom}
                onChangeText={(text) => this.changeInputFrom(text)}
              />
              <Text style={weight.textToStyle}>{TEXT.to}</Text>

              {/* to======= */}
              <TextInput
                ref={strings.to.toString()}
                style={weight.textInputStyle}
                multiline={false}
                maxLength={10}
                placeholderTextColor={colors.gray}
                placeholder={this.state[strings.to].toString()}
                underlineColorAndroid={colors.trans}
                keyboardType='numeric'
                textAlign={'center'}
                value={this.state.valueTo}
                onChangeText={(text) => this.changeInputTo(text)}
              />
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

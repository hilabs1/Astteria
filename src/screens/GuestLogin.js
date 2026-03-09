import React, {Component} from 'react';
import {
  View,
  Alert,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
  StatusBar,
  Dimensions,
  ImageBackground,
  KeyboardAvoidingView,
  Keyboard,
  TouchableWithoutFeedback,
  ActivityIndicator,
} from 'react-native';

import * as strings from './strings';
import * as colors from './colors';
import * as styling from './styling';
import {
  put,
  get,
  updateAccess,
  getTextSize,
  TABLET,
  getStyle,
  updateEmail,
  updateCo,
  TEXT,
  logger,
} from '../Cortex';
import {LOGIN} from '../constants/login';
// import {Navigation} from 'react-native-navigation';
import {Auth} from 'aws-amplify';
import {CognitoUser} from 'amazon-cognito-identity-js';
import {login} from '../services/login';
import {notifyEmail} from '../services/forgotPassword';
var co = 'No Company';

export default class GuestLogin extends Component {
  constructor(props) {
    super(props);

    this.state = {
      passwordInput: '',
      valFromDB: '',
      userName: '',
      isLoggedIn: false,
      email: '',
      view: LOGIN.loginView,
      plus: '+',
      companyName: null,
      showConfirm: false,
      authenticationCode: '',
      loading: false,
    };
    this.logInOut();
  }

  async logInOut() {
    this.isLoggedIn();
  }

  /**
   * onTextChange Triggers when user changes text in textInput
   * @param  String text [user's text input]
   * @return void   	   [description]
   */

  onTextChange(text) {
    // console.log('GuestLogin: TKT_1: onTextChange ~~~~~~~~~~~~~~~~~~~~~~~');
    // console.log('GuestLogin: TKT_1: onTextChange text: '+text);

    this.setState({
      passwordInput: text,
      valFromDB: text,
    });
  }

  async varifyNow() {
    await put(strings.accessLevel.toString(), strings.unverified.toString());

    await put(
      strings.emailPlaceHolder.toString(),
      this.state.userName.toString(),
    ); // email

    await put(
      strings.passwordTxt.toString(),
      this.state.passwordInput.toString(),
    );

    updateEmail(this.state.userName);
    updateAccess(strings.unverified);

    this.setState(
      {
        passwordInput: '',
        valFromDB: '',
        userName: '',
        email: '',
        view: LOGIN.loginView, // this.getComponents(),
        plus: '+',
        showConfirm: false,
        authenticationCode: '',
        loading: false,
      },
      () => {
        this.props.navigation.navigate('profile');
      },
    );
  }

  async handleLoginResp(resp) {
    switch (resp) {
      case 0: {
        this.setState(
          {
            passwordInput: '',
            valFromDB: '',
            userName: '',
            email: '',
            view: LOGIN.loginView,
            plus: '+',
            showConfirm: false,
            authenticationCode: '',
            loading: false,
          },
          () => {
            this.props.navigation.navigate('drawerStack', { screen: 'appStack', params: { screen: 'welcome' } });
          },
        );
        break;
      }
      case 1: {
        this.setState(
          {
            loading: false,
          },
          () => {
            Alert.alert(
              TEXT.accountNotVarifiedTitle,
              TEXT.accountNotVarified,
              [
                {text: TEXT.yes, onPress: () => this.varifyNow()},
                {text: TEXT.no, onPress: () => this.loginAnyway()},
              ],
              {cancelable: false},
            );
          },
        );
        break;
      }
      case 2: {
        this.setState(
          {
            passwordInput: '',
            userName: '',
            valFromDB: '',
            loading: false,
          },
          () => {
            Alert.alert(TEXT.errorLogin, TEXT.wrongDetails, [{text: TEXT.ok}], {
              cancelable: false,
            });
          },
        );
        break;
      }
      case 3: {
        this.setState(
          {
            loading: false,
            passwordInput: '',
            userName: '',
            valFromDB: '',
          },
          () => {
            Alert.alert(
              TEXT.errorLogin,
              TEXT.userDoesntExist,
              [{text: TEXT.ok}],
              {cancelable: false},
            );
          },
        );
        break;
      }
      case 4: {
        this.setState(
          {
            passwordInput: '',
            userName: '',
            valFromDB: '',
            loading: false,
          },
          () => {
            Alert.alert(TEXT.errorLogin, TEXT.wrongDetails, [{text: TEXT.ok}], {
              cancelable: false,
            });
          },
        );
        break;
      }
    } // switch
  }

  /**
   * [logIn redirected from onTextChange
   * 		Check if password is correct, called from onTextChange
   * if so: put password in storage]
   * @param  String  password [user password inout]
   * @return Boolean          [if password is correct: true
   *                             else: false]
   */
  async logIn() {
    // pass
    this.setState(
      {
        loading: true,
      },
      async () => {
        const resp = await login(this.state.userName, this.state.passwordInput);

        this.handleLoginResp(resp);
      },
    );
  }

  loginAnyway() {
    // when user chooses not to confirm
    this.setState(
      {
        view: LOGIN.loginView, // this.getComponents(),
        plus: '+',
        showConfirm: false,
        authenticationCode: '',
        loading: false,
      },
      () => {
        this.continueAsGuest(true); // this.props.navigation.navigate('welcome');
      },
    );
  }

  async getDataFromAWS() {
    const user = await Auth.currentAuthenticatedUser();
    if (user) {
      var payloadJSON = user.signInUserSession.idToken.payload; // JSON.stringify(user.signInUserSession.idToken.payload);
      var group = payloadJSON['cognito:groups'];
      if (!group) {
        group = strings.registered;
      } else {
        group = group.toString();

        group = group.replace(/'/g, '');
      }
      var atts = user.attributes;

      var name = atts.name.toString();
      var co = atts['custom:companyName'].toString();
      // var accessLevel = atts['custom:access'].toString();

      await put(strings.username.toString(), name.toString());
      await put(strings.accessLevel.toString(), group.toString());
      await put(strings.companyName.toString(), co);
      await put(
        strings.emailPlaceHolder.toString(),
        this.state.userName.toString(),
      );
      // var co = await get(strings.companyName.toString());

      // await put(strings.checkAccess.toString(), false);
      updateAccess(group);
      updateCo(co);

      this.setState(
        {
          passwordInput: '',
          valFromDB: '',
          userName: '',
          email: '',
          view: LOGIN.loginView, // this.getComponents(),
          plus: '+',
          showConfirm: false,
          authenticationCode: '',
          loading: false,
        },
        () => {
          this.props.navigation.navigate('drawerStack', { screen: 'appStack', params: { screen: 'welcome' } });
        },
      );

      return true;
    }
  }

  /**
   * [isLoggedIn Triggered in constructor]
   * @return Boolean [if storage contains password,
   *                    meaning user has logged in before -> redirect to welcome and skip login
   *                    else -> user has to go through login again]
   */
  async isLoggedIn() {
    return get(strings.accessLevel.toString())
      .then(async item => {
        if (
          item &&
          item !=
            strings.continueAsGuest /* (item == strings.password || item == strings.managerPassword) */
        ) {
          logger('isLoggedIn', item)
          var email = await get(strings.emailPlaceHolder.toString());
          var co = await get(strings.companyName.toString());
          updateCo(co);
          updateEmail(email);
          updateAccess(item);

          this.setState(
            {
              passwordInput: '',
              valFromDB: '',
              userName: '',
            },
            () => {
              // logger('got here')
              this.props.navigation.navigate('drawerStack', { screen: 'appStack', params: { screen: 'welcome' } });
            },
          );
          return true;
        } else {
          // console.log('GuestLogin: TKT_12: isLoggedIn() dataMat.len: '+dataMatrix.length);

          return true;
        }
      })
      .catch(error => {
        return true;
      });
    // console.log('GuestLogin: TKT_2: isloggedIn: OUT DANG: ');
  }

  async continueAsGuest(unverified) {
    if (unverified) {
      await put(strings.accessLevel.toString(), strings.unverified.toString());

      await put(
        strings.emailPlaceHolder.toString(),
        this.state.userName.toString(),
      ); // email

      // await put(strings.companyName.toString(), co.toString());
      await put(
        strings.passwordTxt.toString(),
        this.state.passwordInput.toString(),
      );

      updateEmail(this.state.userName);
      updateAccess(strings.unverified);

      this.setState(
        {
          passwordInput: '',
          valFromDB: '',
          userName: '',
          email: '',
          view: LOGIN.loginView,
          plus: '+',
          showConfirm: false,
          authenticationCode: '',
          loading: false,
        },
        () => {
          this.props.navigation.navigate('drawerStack', { screen: 'appStack', params: { screen: 'welcome' } });
        },
      );
    } else {
      await put(
        strings.passwordTxt.toString(),
        strings.continueAsGuest.toString(),
      );
      await put(strings.username.toString(), strings.guest.toString());
      updateAccess(strings.continueAsGuest);
    }

    this.props.navigation.navigate('welcome');
  }

  getBackgroundImage() {
    if (TABLET) {
      return require('../assets/pics/launchBackgroundTablet.jpg');
    }
    return require('../assets/pics/launchBackground.jpg');
  }

  // validate(password, email)

  register = async () => {
    // const {userName, email, passwordInput, companyName} = this.state
    if (
      this.state.email == '' ||
      this.state.userName == '' ||
      this.state.passwordInput == ''
    ) {
      Alert.alert(TEXT.errorLogin, TEXT.fillBlanks, [{text: TEXT.ok}], {
        cancelable: false,
      });
    } else {
      if (!this.validateEmail(this.state.email)) {
        Alert.alert(TEXT.errorLogin, TEXT.invalidEmail, [{text: TEXT.ok}], {
          cancelable: false,
        });
        this.setState({
          email: '',
        });
      } else {
        this.setState({
          loading: true,
        });
        const username = this.state.userName;
        const email = this.state.email;
        const password = this.state.passwordInput;

        // console.log('GuestLogin: TKT_0.1: register() email: '+email );
        if (this.state.companyName) {
          co = this.state.companyName;
        }

        try {
          // user.signInUserSession.idToken.payload
          const success = await Auth.signUp({
            username: email,
            password: password,
            attributes: {
              // email: email,
              name: username,
              'custom:companyName': co,
              // 'custom:access': strings.registered,
            },
          });

          this.setState({
            view: LOGIN.confirmView,
            loading: false,
          });
        } catch (err) {
          // var jsonString = JSON.stringify(err);
          // var data = jsonString.split(',');
          this.setState(
            {
              loading: false,
              passwordInput: '',
              valFromDB: '',
            },
            () => {
              Alert.alert(TEXT.errorLogin, TEXT.fixErrors, [{text: TEXT.ok}], {
                cancelable: false,
              });
            },
          );

          // console.log('GuestLogin: TKT_0.1: register() err: '+err.message );
          // console.log({err});
        }
      }
    }
  };

  async confirmLater() {
    await put(strings.username.toString(), this.state.userName.toString());
    await put(strings.accessLevel.toString(), strings.unverified.toString());
    await put(strings.emailPlaceHolder.toString(), this.state.email.toString());
    await put(strings.companyName.toString(), co.toString());
    await put(
      strings.passwordTxt.toString(),
      this.state.passwordInput.toString(),
    );

    updateCo(co);
    updateEmail(this.state.email);
    updateAccess(strings.unverified);

    this.setState(
      {
        passwordInput: '',
        valFromDB: '',
        userName: '',
        email: '',
        view: LOGIN.loginView,
        plus: '+',
        showConfirm: false,
        authenticationCode: '',
        loading: false,
      },
      () => {
        this.props.navigation.navigate('welcome');
      },
    );
  }

  confirmSignUp = async () => {
    this.setState({
      loading: true,
    });

    try {
      await Auth.confirmSignUp(this.state.email, this.state.authenticationCode);
      await put(strings.username.toString(), this.state.userName.toString());
      await put(strings.accessLevel.toString(), strings.registered.toString());
      await put(
        strings.emailPlaceHolder.toString(),
        this.state.email.toString(),
      );
      await put(strings.companyName.toString(), co.toString());
      updateCo(co);
      updateEmail(this.state.email);

      updateAccess(strings.registered);
      this.setState(
        {
          passwordInput: '',
          valFromDB: '',
          userName: '',
          email: '',
          view: LOGIN.loginView,
          plus: '+',
          showConfirm: false,
          authenticationCode: '',
          loading: false,
        },
        () => {
          this.props.navigation.navigate('drawerStack', { screen: 'appStack', params: { screen: 'welcome' } });
        },
      );

      return true;
    } catch (err) {
      Alert.alert(strings.errorLogin, err.message, [{text: TEXT.ok}], {
        cancelable: false,
      });
      this.setState({
        passwordInput: '',
        userName: '',
        valFromDB: '',
        email: '',
        loading: false,
      });
    }
  };

  forgotPassword() {
    this.setState({
      view: LOGIN.forgotPasswordView,
    });
  }

  notifyEmail() {
    this.setState({
      loading: true,
    });

    Auth.forgotPassword(this.state.userName)
      .then(data => {
        this.setState({
          view: LOGIN.confirmForgotPasswordView,
          loading: false,
        });
      })
      .catch(err => {
        this.setState(
          {
            loading: false,
          },
          () => {
            Alert.alert(
              strings.errorLogin,
              strings.wrongEmailAddress,
              [{text: TEXT.ok}],
              {cancelable: false},
            );
          },
        );
      });
  }

  async confirmEmail() {
    console.log(this.state);
    this.setState({
      loading: true,
    });

    try {
      // Auth.forgotPasswordSubmit
      await Auth.forgotPasswordSubmit(
        this.state.userName,
        this.state.authenticationCode,
        this.state.passwordInput,
      );
      this.keyboardDismiss();
      const resp = await login(this.state.userName, this.state.passwordInput);
      this.handleLoginResp(resp);
      // console.log('GuestLogin: TKT_0.1: loadingData: :userName: ' + this.state.passwordInput)
    } catch (err) {
      console.log(JSON.stringify(err));
      Alert.alert(TEXT.errorLogin, TEXT.fillBlanks, [{text: TEXT.ok}], {
        cancelable: false,
      });
    }
    this.setState({
      loading: false,
    });
  }

  /**
   * [loadingData triggered by render()
   * 		handles showing loader for six mins(for now) until all data loads ]
   * @return View   [activityIndicator]
   */
  loadingData() {
    // console.log('GuestLogin: TKT_0.1: loadingData: ');

    if (this.state.loading) {
      return (
        <View style={getStyle(styles.loaderStyle, styles.tabletLoaderStyle)}>
          <ActivityIndicator
            aninamting={this.state.loading}
            size="large"
            color={colors.blueButton}
          />
          <Text style={styles.loaderTextStyle}>{TEXT.loadingText}</Text>
        </View>
      );
    }
  }

  validateEmail(emailInput) {
    var emailReg = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    // console.log('GuestLogin: TKT_0.1: validateEmail: '+emailReg.test(emailInput) );
    return emailReg.test(emailInput);
  }

  getComponents() {
    if (this.state.view == LOGIN.loginView) {
      // login
      return (
        <TouchableWithoutFeedback onPress={() => this.keyboardDismiss()}>
          <ImageBackground
            style={styling.styles.guestLoginImageBackgroundStyle}
            resizeMode="stretch"
            source={this.getBackgroundImage()}>
            <StatusBar hidden={true} />

            <TouchableWithoutFeedback onPress={() => this.keyboardDismiss()}>
              <View
                testID={'passwordView'}
                style={styling.styles.guestLoginViewStyle}>
                <Text
                  style={getStyle(
                    styling.styles.guestloginWelcomeTextStyle,
                    styling.styles.tabletGuestLoginWelcomeTextStyle,
                  )}>
                  {TEXT.welcome}
                </Text>

                {
                  <TextInput
                    clearButtonMode="always"
                    autoCapitalize="none"
                    autoCorrect={false}
                    style={getStyle(
                      styling.styles.guestLoginTextInputStyle,
                      styling.styles.tabletGuestLoginTextInput,
                    )}
                    multiline={false}
                    keyboardType={'email-address'}
                    placeholderTextColor={colors.gray}
                    placeholder={TEXT.loginPlaceHolder}
                    underlineColorAndroid={colors.trans}
                    value={this.state.userName}
                    onChangeText={text => {
                      this.setState({userName: text.trim()});
                    }}
                  />
                }

                {
                  <TextInput
                    clearButtonMode="always"
                    autoCapitalize="none"
                    autoCorrect={false}
                    style={getStyle(
                      styling.styles.guestLoginTextInputStyle,
                      styling.styles.tabletGuestLoginTextInput,
                    )}
                    multiline={false}
                    placeholderTextColor={colors.gray}
                    placeholder={TEXT.passwordTxt}
                    underlineColorAndroid={colors.trans}
                    value={this.state.valFromDB}
                    secureTextEntry={true}
                    onChangeText={text => this.onTextChange(text)}
                  />
                }

                <TouchableOpacity
                  style={getStyle(
                    styling.styles.guestLoginEnterViewStyle,
                    styling.styles.tabletGuestLoginEnterViewStyle,
                  )}
                  onPress={() => {
                    this.logIn();
                  }}>
                  <Text
                    style={getStyle(
                      styling.styles.guestLoginEnterTextStyle,
                      styling.styles.tabletGuestLoginEnterTextStyle,
                    )}>
                    {TEXT.enter}
                  </Text>
                </TouchableOpacity>

                <Text
                  style={getStyle(
                    styling.styles.guestLoginContinueAsGuestTextStyle,
                    styling.styles.tabletGuestLoginContinueAsGuestTextStyle,
                  )}
                  onPress={() => this.continueAsGuest(false)}>
                  {TEXT.continueAsGuest}
                </Text>

                <Text
                  style={getStyle(
                    styling.styles.guestLoginRegisterTextStyle,
                    styling.styles.tabletGuestLoginRegisterTextStyle,
                  )}
                  onPress={() => this.registerOrLogin(LOGIN.signUpView)}>
                  {TEXT.register}{' '}
                  <Text style={{color: colors.sendButton}}>
                    {TEXT.registerWelcome}
                  </Text>{' '}
                </Text>

                <Text
                  style={getStyle(
                    styling.styles.guestLoginForgotPassTextStyle,
                    styling.styles.tabletGuestLoginForgotPassTextStyle,
                  )}
                  onPress={() => this.forgotPassword()}>
                  {TEXT.forgotPassword}
                </Text>
              </View>
            </TouchableWithoutFeedback>
          </ImageBackground>
        </TouchableWithoutFeedback>
      );
    } else {
      if (this.state.view == LOGIN.signUpView) {
        // signup
        return (
          <TouchableWithoutFeedback onPress={() => this.keyboardDismiss()}>
            <ImageBackground
              style={styling.styles.registerImageBackgroundStyle}
              resizeMode="stretch"
              source={this.getBackgroundImage()}>
              <StatusBar hidden={true} />

              <TouchableWithoutFeedback onPress={() => this.keyboardDismiss()}>
                <View
                  testID={'registerView'}
                  style={styling.styles.guestLoginViewStyle}>
                  <Text
                    style={getStyle(
                      styling.styles.guestloginWelcomeTextStyle,
                      styling.styles.tabletGuestLoginWelcomeTextStyle,
                    )}>
                    {TEXT.registerWelcome}
                  </Text>

                  <TextInput
                    clearButtonMode="always"
                    autoCapitalize="words"
                    autoCorrect={false}
                    style={getStyle(
                      styling.styles.guestLoginTextInputStyle,
                      styling.styles.tabletGuestLoginTextInput,
                    )}
                    multiline={false}
                    placeholderTextColor={colors.gray}
                    placeholder={TEXT.fullName}
                    underlineColorAndroid={colors.trans}
                    value={this.state.userName}
                    onChangeText={text => {
                      this.setState({userName: text});
                    }}
                    //	borderWidth={1}
                  />

                  <TextInput
                    clearButtonMode="always"
                    autoCapitalize="none"
                    autoCorrect={true}
                    keyboardType={'email-address'}
                    style={getStyle(
                      styling.styles.guestLoginTextInputStyle,
                      styling.styles.tabletGuestLoginTextInput,
                    )}
                    multiline={false}
                    placeholderTextColor={colors.gray}
                    placeholder={TEXT.emailPlaceHolder}
                    underlineColorAndroid={colors.trans}
                    value={this.state.email}
                    onChangeText={text => {
                      this.setState({email: text});
                    }}
                    secureTextEntry={false}
                  />

                  <TextInput
                    testID={'passwordTextInput'}
                    clearButtonMode="always"
                    autoCapitalize="none"
                    autoCorrect={false}
                    style={getStyle(
                      styling.styles.guestLoginTextInputStyle,
                      styling.styles.tabletGuestLoginTextInput,
                    )}
                    multiline={false}
                    placeholderTextColor={colors.gray}
                    placeholder={TEXT.passwordTxt}
                    underlineColorAndroid={colors.trans}
                    value={this.state.valFromDB}
                    secureTextEntry={true}
                    onChangeText={text => this.onTextChange(text)}
                  />

                  <Text style={styling.styles.passwordPolicyTextStyle}>
                    {' '}
                    {TEXT.passwordPolicy}{' '}
                  </Text>

                  <View style={styling.styles.companyOptionViewStyle}>
                    <TouchableOpacity
                      style={styling.styles.plusTouchableStyle}
                      onPress={() => this.imCompany()}>
                      <Text style={styling.styles.plusTextStyle}>
                        {' '}
                        {this.state.plus}{' '}
                      </Text>
                    </TouchableOpacity>

                    <Text style={styling.styles.imCompanyTextStyle}>
                      {' '}
                      {TEXT.company}{' '}
                    </Text>
                  </View>

                  {this.getCompanyComps()}

                  <TouchableOpacity
                    style={getStyle(
                      styling.styles.guestLoginEnterViewStyle,
                      styling.styles.tabletGuestLoginEnterViewStyle,
                    )}
                    onPress={() => {
                      this.register();
                    }}>
                    <Text
                      style={getStyle(
                        styling.styles.guestLoginEnterTextStyle,
                        styling.styles.tabletGuestLoginEnterTextStyle,
                      )}>
                      {TEXT.registerWelcome}
                    </Text>
                  </TouchableOpacity>

                  <Text
                    style={getStyle(
                      styling.styles.guestLoginRegisterTextStyle,
                      styling.styles.tabletGuestLoginRegisterTextStyle,
                    )}
                    onPress={() => this.registerOrLogin(LOGIN.loginView)}>
                    {TEXT.alreadyRegistered}
                    <Text style={{color: colors.sendButton}}>
                      {TEXT.alreadyRegisteredGold}
                    </Text>{' '}
                  </Text>
                </View>
              </TouchableWithoutFeedback>
            </ImageBackground>
          </TouchableWithoutFeedback>
        );
      } else {
        if (this.state.view == LOGIN.confirmView) {
          // showConfirm
          return (
            <TouchableWithoutFeedback onPress={() => this.keyboardDismiss()}>
              <ImageBackground
                style={styling.styles.guestLoginConfirmImageBackgroundStyle}
                resizeMode="stretch"
                source={this.getBackgroundImage()}>
                <StatusBar hidden={true} />

                <TouchableWithoutFeedback
                  onPress={() => this.keyboardDismiss()}>
                  <View
                    testID={'passwordView'}
                    style={styling.styles.guestLoginConfirmView}>
                    <TextInput
                      clearButtonMode="always"
                      autoCapitalize="none"
                      autoCorrect={false}
                      style={getStyle(
                        styling.styles.guestLoginTextInputStyle,
                        styling.styles.tabletGuestLoginTextInput,
                      )}
                      multiline={false}
                      underlineColorAndroid={colors.trans}
                      value={this.state.authenticationCode}
                      placeholderTextColor={colors.labelColor}
                      placeholder={TEXT.enterConfCode}
                      onChangeText={text => {
                        this.setState({authenticationCode: text});
                      }}
                      //	borderWidth={1}
                    />

                    <TouchableOpacity
                      style={getStyle(
                        styling.styles.guestLoginEnterViewStyle,
                        styling.styles.tabletGuestLoginEnterViewStyle,
                      )}
                      onPress={() => this.confirmSignUp()}>
                      <Text
                        style={getStyle(
                          styling.styles.guestLoginConfirmTextStyle,
                          styling.styles.tabletGuestLoginConfirmTextStyle,
                        )}>
                        {TEXT.confirm}
                      </Text>
                    </TouchableOpacity>

                    <Text
                      style={getStyle(
                        styling.styles.guestLoginForgotPassTextStyle,
                        styling.styles.tabletGuestLoginForgotPassTextStyle,
                      )}
                      onPress={() => this.confirmLater()}>
                      {TEXT.confirmLater}
                    </Text>
                  </View>
                </TouchableWithoutFeedback>
              </ImageBackground>
            </TouchableWithoutFeedback>
          );
        } else {
          if (this.state.view == LOGIN.forgotPasswordView) {
            // forgot password
            return (
              <TouchableWithoutFeedback onPress={() => this.keyboardDismiss()}>
                <ImageBackground
                  style={styling.styles.guestLoginConfirmImageBackgroundStyle}
                  resizeMode="stretch"
                  source={this.getBackgroundImage()}>
                  <StatusBar hidden={true} />

                  <TouchableWithoutFeedback
                    onPress={() => this.keyboardDismiss()}>
                    <View
                      testID={'passwordView'}
                      style={styling.styles.guestLoginConfirmView}>
                      <TextInput
                        clearButtonMode="always"
                        autoCapitalize="none"
                        autoCorrect={false}
                        style={getStyle(
                          styling.styles.guestLoginTextInputStyle,
                          styling.styles.tabletGuestLoginTextInput,
                        )}
                        multiline={false}
                        keyboardType={'email-address'}
                        placeholderTextColor={colors.gray}
                        placeholder={TEXT.loginPlaceHolder}
                        underlineColorAndroid={colors.trans}
                        value={this.state.userName}
                        onChangeText={text => {
                          this.setState({userName: text});
                        }}
                        //	borderWidth={1}
                      />

                      <TouchableOpacity
                        style={getStyle(
                          styling.styles.guestLoginEnterViewStyle,
                          styling.styles.tabletGuestLoginEnterViewStyle,
                        )}
                        onPress={() => {
                          this.notifyEmail();
                        }}>
                        <Text
                          style={getStyle(
                            styling.styles.guestLoginEnterTextStyle,
                            styling.styles.tabletGuestLoginEnterTextStyle,
                          )}>
                          {TEXT.enter}
                        </Text>
                      </TouchableOpacity>

                      <Text
                        style={getStyle(
                          styling.styles.guestLoginForgotPassTextStyle,
                          styling.styles.tabletGuestLoginForgotPassTextStyle,
                        )}
                        onPress={() => this.setState({view: LOGIN.loginView})}>
                        {TEXT.cancelForgotPassword}
                      </Text>
                    </View>
                  </TouchableWithoutFeedback>
                </ImageBackground>
              </TouchableWithoutFeedback>
            );
          } else {
            // confirmForgotPassword
            return (
              <TouchableWithoutFeedback onPress={() => this.keyboardDismiss()}>
                <ImageBackground
                  style={styling.styles.guestLoginConfirmImageBackgroundStyle}
                  resizeMode="stretch"
                  source={this.getBackgroundImage()}>
                  <StatusBar hidden={true} />

                  <TouchableWithoutFeedback
                    onPress={() => this.keyboardDismiss()}>
                    <View
                      testID={'passwordView'}
                      style={styling.styles.guestLoginConfirmView}>
                      <TextInput
                        clearButtonMode="always"
                        autoCapitalize="none"
                        autoCorrect={false}
                        style={getStyle(
                          styling.styles.guestLoginTextInputStyle,
                          styling.styles.tabletGuestLoginTextInput,
                        )}
                        multiline={false}
                        underlineColorAndroid={colors.trans}
                        value={this.state.authenticationCode}
                        placeholderTextColor={colors.gray}
                        placeholder={TEXT.enterConfCode}
                        onChangeText={text => {
                          this.setState({authenticationCode: text});
                        }}
                        //	borderWidth={1}
                      />

                      <TextInput
                        clearButtonMode="always"
                        autoCapitalize="none"
                        autoCorrect={false}
                        style={getStyle(
                          styling.styles.guestLoginTextInputStyle,
                          styling.styles.tabletGuestLoginTextInput,
                        )}
                        multiline={false}
                        placeholderTextColor={colors.gray}
                        placeholder={TEXT.newPassword}
                        underlineColorAndroid={colors.trans}
                        value={this.state.valFromDB}
                        secureTextEntry={true}
                        onChangeText={text => this.onTextChange(text)}
                      />

                      <Text style={styling.styles.passwordPolicyTextStyle}>
                        {' '}
                        {TEXT.passwordPolicy}{' '}
                      </Text>

                      <TouchableOpacity
                        style={getStyle(
                          styling.styles.guestLoginEnterViewStyle,
                          styling.styles.tabletGuestLoginEnterViewStyle,
                        )}
                        onPress={() => this.confirmEmail()}>
                        <Text
                          style={getStyle(
                            styling.styles.guestLoginConfirmTextStyle,
                            styling.styles.tabletGuestLoginConfirmTextStyle,
                          )}>
                          {TEXT.confirm}
                        </Text>
                      </TouchableOpacity>

                      <Text
                        style={getStyle(
                          styling.styles.guestLoginForgotPassTextStyle,
                          styling.styles.tabletGuestLoginForgotPassTextStyle,
                        )}
                        onPress={() => this.setState({view: LOGIN.loginView})}>
                        {TEXT.cancelForgotPassword}
                      </Text>
                    </View>
                  </TouchableWithoutFeedback>
                </ImageBackground>
              </TouchableWithoutFeedback>
            );
          }
        }
      }
    }
  }

  keyboardDismiss() {
    // console.log('GuestLogin: TKT_11: keyboardDismiss()');
    Keyboard.dismiss();
  }

  getPassword() {
    return get(this.state.username.toString())
      .then(item => {
        if (item) {
          this.setState({
            valFromDB: item,
          });
        } else {
          // console.log('GuestLogin: TKT_13: getPassword: false');
          this.setState({
            valFromDB: '',
          });
        }
      })
      .catch(error => {
        this.setState({
          valFromDB: '',
        });
      });
  }

  registerOrLogin(screen) {
    this.setState({
      view: screen,
      valFromDB: '',
      plus: '+',
      passwordInput: '',
      userName: '',
      email: '',
      companyName: null,
      showConfirm: false,
      authenticationCode: '',
    });
  }

  imCompany() {
    if (this.state.plus == '+') {
      this.setState({
        plus: '-',
      });
    } else {
      this.setState({
        plus: '+',
      });
    }
  }

  getCompanyComps() {
    if (this.state.plus == '-') {
      return (
        <TextInput
          clearButtonMode="always"
          autoCapitalize="words"
          autoCorrect={false}
          style={getStyle(
            styling.styles.guestLoginTextInputStyle,
            styling.styles.tabletGuestLoginTextInput,
          )}
          multiline={false}
          placeholderTextColor={colors.gray}
          placeholder={TEXT.companyName}
          underlineColorAndroid={colors.trans}
          value={this.state.companyName}
          onChangeText={text => {
            this.setState({companyName: text});
          }}
          //	borderWidth={1}
        />
      );
    }
  }

  render() {
    const keyboardVerticalOffset = -60;
    return (
      <KeyboardAvoidingView
        style={styles.keyboardAvoidStyle}
        behavior="padding"
        enabled
        keyboardVerticalOffset={keyboardVerticalOffset}>
        {this.getComponents()}

        {this.loadingData()}
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  input: {
    width: 350,
    height: 55,
    backgroundColor: '#42A5F5',
    margin: 10,
    padding: 8,
    color: 'white',
    borderRadius: 14,
  },

  loaderStyle: {
    position: 'absolute',
    top: getTextSize(200),
    alignSelf: 'center',
    backgroundColor: colors.popUpButton,
    height: getTextSize(120),
    width: getTextSize(260),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,

    // display: 'flex',
  },

  tabletLoaderStyle: {
    position: 'absolute',
    top: getTextSize(200),
    alignSelf: 'center',
    backgroundColor: colors.popUpButton,
    height: getTextSize(100),
    width: getTextSize(200),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 40,

    // display: 'flex',
  },

  loaderTextStyle: {
    fontFamily: styling.textFont, // 'PlayfairDisplay-Regular',
    alignSelf: 'center',
    fontSize: getTextSize(15),
  },

  keyboardAvoidStyle: {
    height: Dimensions.get('window').height, // '100%',
    width: '100%',
    // backgroundColor: ''
  },
});

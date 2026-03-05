import { updateEmail, put, get, updateAccess, updateCo } from '../Cortex';
import { LOGIN } from '../constants/login';
import { Auth } from 'aws-amplify';
import * as strings from '../screens/strings';

let passwordFromDB;
let userNameFromDB;

export async function login(userNameInput, passwordInput) {
  userNameFromDB = await get(strings.emailPlaceHolder.toString());
  passwordFromDB = await get(strings.passwordTxt.toString());

  try {
    console.log('tkt try', userNameInput, 'passwordInput', passwordInput);
    await Auth.signIn(userNameInput, passwordInput);
    updateEmail(userNameInput);
    getDataFromAWS(userNameInput);

    const resp = {
      returnState: {
        userName: '',
        passwordInput: '',
        valFromDB: '',
        email: '',
        view: LOGIN.loginView,
        plus: '+',
        showConfirm: false,
        authenticationCode: '',
        loading: false,
      },
    };
    console.log('tkt here?');
    return 0;
  } catch (error) {
    console.log('tkt catch err', error);
    return errorHandling(error, userNameInput, passwordInput);
  }
}

function errorHandling(error, userNameInput, passwordInput) {
  const err = JSON.stringify(error);

  if (err.includes('UserNotConfirmedException')) {
    if (userNameInput === userNameFromDB && passwordInput === passwordFromDB) {
      return 1;
    } else {
      return 2;
    }
  } else {
    if (err.includes('UserNotFoundException')) {
      return 3;
    } else {
      return 4;
    }
  }
}

async function getDataFromAWS(userName) {
  const user = await Auth.currentAuthenticatedUser();
  if (user) {
    const payloadJSON = user.signInUserSession.idToken.payload;
    let group = payloadJSON['cognito:groups'];

    if (!group) {
      group = strings.registered;
    } else {
      group = group.toString();
      group = group.replace(/'/g, '');
    }

    const atts = user.attributes;
    const name = atts.name.toString();
    const company = atts['custom:companyName'].toString();

    await put(strings.username.toString(), name.toString());
    await put(strings.accessLevel.toString(), group.toString());
    await put(strings.companyName.toString(), company);
    await put(strings.emailPlaceHolder.toString(), userName.toString());

    updateAccess(group);
    updateCo(company);
  }
  return true;
}

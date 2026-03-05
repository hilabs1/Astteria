
import { LOGIN } from '../constants/login';
import { Auth } from 'aws-amplify';

export async function notifyEmail () {
	return Auth.forgotPassword(this.state.userName)
		.then((data) => {
			this.setState({
				view: LOGIN.confirmForgotPasswordView,
				loading: false
			});
			return true;
		})
		.catch((err) => {
			return false;
		});
}

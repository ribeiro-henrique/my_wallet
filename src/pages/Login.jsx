import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import validator from 'validator';
import { addEmail } from '../redux/actions';

class Login extends React.Component {
  state = {
    email: '',
    password: '',
    disableBtn: true,
  };

  handleChange = ({ target: { name, value } }) => {
    /* const emailRegex = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i; // validação do email
    const isEmailValid = emailRegex.test(value);

    const isPasswordValid = value.length >= 6; */

    this.setState(
      {
        [name]: value,
      },
      this.validateFields,
    );
  };

  validateFields = () => {
    const SEIS = 6;
    const { email, password } = this.state;
    const validatioon = validator.isEmail(email);
    const validaPass = password.length >= SEIS;
    this.setState({
      disableBtn: !(validaPass && validatioon),
    });
  };

  handleWallet = () => {
    const { email } = this.state;
    const { history, dispatch } = this.props;
    dispatch(addEmail(email));
    history.push('/carteira');
  };

  render() {
    const { email, password, disableBtn } = this.state;

    return (
      <div className="flex min-h-screen justify-center items-center bg-white">
        <div className="max-w-md w-full">
          <img
            className="mx-auto h-10 w-auto"
            src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
            alt="Your Company"
          />
          <h2 className="mt-6 text-center text-2xl font-bold text-gray-900">
            My Wallet
            <br />
            Conversor de Moeda
          </h2>

          <form className="mt-8 space-y-6" action="#" method="POST">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-900">
                Email address
              </label>
              <div className="mt-1">
                <input
                  data-testid="email-input"
                  onChange={ this.handleChange }
                  value={ email }
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium text-gray-900">
                  Password
                </label>
                <div className="text-sm">
                  <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
                    Forgot password?
                  </a>
                </div>
              </div>
              <div className="mt-1">
                <input
                  data-testid="password-input"
                  onChange={ this.handleChange }
                  value={ password }
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
            </div>

            <div>
              <button
                type="button"
                disabled={ disableBtn }
                onClick={ this.handleWallet }
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Sign in
              </button>
            </div>
          </form>

          <p className="mt-6 text-center text-sm text-gray-500">

            {' '}
            <a href="#" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
              Criar usuário
            </a>
          </p>
        </div>
      </div>
    );
  }
}

Login.propTypes = {
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default connect()(Login);

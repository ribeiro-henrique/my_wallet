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
    /*     const emailRegex = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i; // validação do email
    const isEmailValid = emailRegex.test(value);

    const isPasswordValid = value.length >= SEIS; */

    this.setState({
      [name]: value,
    }, this.validateFields);
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
      <form>
        <label htmlFor="email-login">
          E-mail:
          <input
            data-testid="email-input"
            onChange={ this.handleChange }
            value={ email }
            type="email"
            name="email"
            id="email-login"
            placeholder="example@example.com"
          />
        </label>
        <label htmlFor="password-login">
          Senha:
          <input
            data-testid="password-input"
            onChange={ this.handleChange }
            value={ password }
            type="password"
            name="password"
            id="password-login"
            placeholder="1234567"
          />
        </label>
        <button
          disabled={ disableBtn }
          onClick={ this.handleWallet }
        >
          Entrar
        </button>
      </form>
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

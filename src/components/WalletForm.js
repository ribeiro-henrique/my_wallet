import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { walletCurrencies, getExpensesWallet } from '../redux/actions';

class WalletForm extends Component {
  state = {
    id: 0,
    value: '',
    currency: 'EUR',
    method: '',
    tag: '',
    description: '',
  };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(walletCurrencies());
  }

  handleChange = ({ target: { name, value } }) => {
    this.setState({
      [name]: value,
    });
  };

  handleClick = () => {
    const { dispatch } = this.props;
    this.setState((prevState) => ({ // pegar um initial state zerado
      ...prevState,
      id: prevState.id + 1,
    }));
    return dispatch(getExpensesWallet(this.state));
  };

  render() {
    const { currencies } = this.props;
    const { value, currency, method, tag, description } = this.state;
    return (
      <form>
        <input
          data-testid="value-input"
          type="text"
          value={ value }
          name="value"
          onChange={ this.handleChange }
          placeholder="Valor gasto"
        />
        <br />
        <input
          data-testid="description-input"
          onChange={ this.handleChange }
          type="text"
          value={ description }
          name="description"
          placeholder="Descrição dos gastos"
        />
        <br />
        <label htmlFor="coins-select">
          Moeda:
          <br />
          <select
            data-testid="currency-input"
            onChange={ this.handleChange }
            id="coins-select"
            value={ currency }
            name="currency"
          >
            {
              currencies.map((e) => (
                <option
                  key={ e }
                  value={ e }
                >
                  { e }
                </option>
              ))
            }
          </select>
        </label>
        <br />
        <br />
        <label>
          Método de pagamento:
          <br />
          <select
            data-testid="method-input"
            onChange={ this.handleChange }
            value={ method }
            name="method"
          >
            <option
              value="Dinheiro"
            >
              Dinheiro
            </option>
            <option
              value="Cartão de crédito"
            >
              Cartão de crédito
            </option>
            <option
              value="Cartão de débito"
            >
              Cartão de débito
            </option>
          </select>
        </label>
        <br />
        <br />
        <label>
          Categoria de despesa:
          <br />
          <select
            data-testid="tag-input"
            onChange={ this.handleChange }
            name="tag"
            value={ tag }
          >
            <option
              value="Alimentação"
            >
              Alimentação
            </option>
            <option
              value="Lazer"
            >
              Lazer
            </option>
            <option
              value="Trabalho"
            >
              Trabalho
            </option>
            <option
              value="Transporte"
            >
              Transporte
            </option>
            <option
              value="Saúde"
            >
              Saúde
            </option>
          </select>
        </label>
        <br />
        <br />
        <button
          type="button"
          onClick={ this.handleClick }
        >
          Adicionar despesa
        </button>
      </form>
    );
  }
}

WalletForm.propTypes = {
  dispatch: PropTypes.func.isRequired,
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
}.isRequired;

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
});

export default connect(mapStateToProps)(WalletForm);

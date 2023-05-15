import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { walletCurrencies, expensesWallet } from '../redux/actions';

class WalletForm extends Component {
  state = {
    value: '',
    currrency: 'EUR',
    method: '',
    tag: '',
    description: '',
  };

  componentDidMount() {
    const { currencies } = this.props;
    const { dispatch } = this.props;
    dispatch(walletCurrencies(currencies));
  }

  handleChange = ({ target: { name, value } }) => {
    this.setState({
      [name]: value,
    });
  };

  handleClick = () => {

  };

  render() {
    const { currencies } = this.props;
    const { value, currrency, method, tag, description } = this.state;
    return (
      <form>
        <input
          data-testid="value-input"
          type="text"
          value={ value }
          name="value"
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
            value={ currrency }
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
              name="Dinheiro"
              value="Dinheiro"
            >
              Dinheiro
            </option>
            <option
              name="Cartão de crédito"
              value="Cartão de crédito"
            >
              Cartão de crédito
            </option>
            <option
              name="Cartão de débito"
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
              name="Alimentação"
              value="Alimentação"
            >
              Alimentação
            </option>
            <option
              name="Lazer"
              value="Lazer"
            >
              Lazer
            </option>
            <option
              name="Trabalho"
              value="Trabalho"
            >
              Trabalho
            </option>
            <option
              name="Transporte"
              value="Transporte"
            >
              Transporte
            </option>
            <option
              name="Saúde"
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

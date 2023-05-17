import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  walletCurrencies, getExpensesWallet, saveEditedExpenses } from '../redux/actions';

const ALIMENTACAO = 'Alimentação';

class WalletForm extends Component {
  state = {
    id: 0,
    value: '',
    currency: 'USD',
    method: 'Dinheiro',
    tag: ALIMENTACAO,
    description: '',
    edited: false,
  };

  // usar o componentDidUpdate no meu walletForm

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(walletCurrencies());
  }

  componentDidUpdate() {
    const { edited } = this.state;
    const { editor, expenses, idToEdit } = this.props;
    if (editor && !edited) {
      this.setState({
        value: expenses[idToEdit].value,
        description: expenses[idToEdit].description,
        currency: expenses[idToEdit].currency,
        method: expenses[idToEdit].method,
        tag: expenses[idToEdit].tag,
        edited: true,
      });
    }
  }

  handleChange = ({ target: { name, value } }) => {
    this.setState({
      [name]: value,
    });
  };

  handleClick = () => {
    const { dispatch } = this.props;
    this.setState((prevState) => ({ // pegar um initial state zerado
      value: '',
      method: 'Dinheiro',
      currency: 'USD',
      tag: ALIMENTACAO,
      description: '',
      id: prevState.id + 1,
    }));
    const dispatchState = {
      ...this.state,
    };
    delete dispatchState.edited;
    // console.log(this.state);
    return dispatch(getExpensesWallet(dispatchState));
  };

  handleEdit = (id) => {
    const { dispatch, expenses } = this.props;
    const { value, currency, method, tag, description } = this.state;
    const accExpenses = {
      id,
      value,
      currency,
      method,
      tag,
      description,
      exchangeRates: expenses[id].exchangeRates, // garantir a atualidade do fetch
    };
    const newExpenses = expenses
      .map((e) => (e.id === id ? accExpenses : e)); // muda os valores do meu id específico
    dispatch(saveEditedExpenses(newExpenses));
    this.setState({
      id: 0,
      value: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: ALIMENTACAO,
      description: '',
      edited: false,
    });
  };

  render() {
    const { currencies, editor, idToEdit } = this.props;
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
        {
          editor ? (
            <button
              type="button"
              onClick={ () => this.handleEdit(idToEdit) } // vou passar param, name
            >
              Editar despesa
            </button>
          ) : (
            <button
              type="button"
              onClick={ this.handleClick }
            >
              Adicionar despesa
            </button>
          )
        }

      </form>
    );
  }
}

// implementar lógica para alternar entre os btn através do valor do editor

WalletForm.propTypes = {
  dispatch: PropTypes.func.isRequired,
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
}.isRequired;

const mapStateToProps = ({ wallet: { currencies, editor, expenses, idToEdit } }) => ({
  currencies,
  idToEdit,
  editor,
  expenses,
});

export default connect(mapStateToProps)(WalletForm);

import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { walletFetch } from '../redux/actions';

class WalletForm extends Component {
  componentDidMount() {
    const { currencies } = this.props;
    const { dispatch } = this.props;
    dispatch(walletFetch(currencies));
  }

  render() {
    const { currencies } = this.props;
    console.log(currencies);
    return (
      <section>
        <h3 data-testid="value-input">
          Valor da Despesa
        </h3>
        <h3 data-testid="description-input">
          Descrição da Despesa
        </h3>
        <select data-testid="currency-input">
          {
            currencies.map((e) => (
              <option key={ e } value={ e }>
                { e }
              </option>
            ))
          }
        </select>
        <br />
        <br />
        <select data-testid="method-input">
          <option>
            Dinheiro
          </option>
          <option>
            Cartão de crédito
          </option>
          <option>
            Cartão de débito
          </option>
        </select>
        <br />
        <br />
        <select data-testid="tag-input">
          <option>
            Alimentação
          </option>
          <option>
            Lazer
          </option>
          <option>
            Trabalho
          </option>
          <option>
            Transporte
          </option>
          <option>
            Saúde
          </option>
        </select>
      </section>
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

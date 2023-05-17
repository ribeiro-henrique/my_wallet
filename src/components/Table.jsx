import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { removeExpensesTable } from '../redux/actions';

class Table extends Component {
  handleClick = (id) => {
    const { dispatch } = this.props;
    dispatch(removeExpensesTable(id));
  };

  render() {
    const { expenses } = this.props;
    console.log(expenses);

    return (
      <table>
        <thead>
          <tr>
            <th>
              Descrição
            </th>
            <th>
              Tag
            </th>
            <th>
              Método de pagamento
            </th>
            <th>
              Valor
            </th>
            <th>
              Moeda
            </th>
            <th>
              Câmbio utilizado
            </th>
            <th>
              Valor convertido
            </th>
            <th>
              Moeda de conversão
            </th>
            <th>
              Editar
            </th>
          </tr>
        </thead>
        <tbody>
          {
            expenses.map((e) => (
              <tr key={ e.id }>
                <td>
                  { e.description }
                </td>
                <td>
                  { e.tag }
                </td>
                <td>
                  { e.method }
                </td>
                <td>
                  { Number(e.value).toFixed(2) }
                </td>
                <td>
                  { e.exchangeRates[e.currency].name}
                </td>
                <td>
                  { Number(e.exchangeRates[e.currency].ask).toFixed(2) }
                </td>
                <td>
                  {(e.value * e.exchangeRates[e.currency].ask).toFixed(2)}
                </td>
                <td>
                  Real
                </td>
                <button>
                  Editar
                </button>
                <td>
                  <button
                    type="button"
                    data-testid="delete-btn"
                    onClick={ () => this.handleClick(e.id) } // evita que a func seja chamada diretamente ao carregar
                  >
                    Excluir
                  </button>
                </td>
              </tr>
            ))
          }

        </tbody>
      </table>
    );
  }
}

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

Table.propTypes = {
  dispatch: PropTypes.func.isRequired,
  expenses: PropTypes.arrayOf(PropTypes.shape({
    currency: PropTypes.string,
  })).isRequired,
};

export default connect(mapStateToProps)(Table);

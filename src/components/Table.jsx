import React, { Component } from 'react';
import { connect } from 'react-redux';

class Table extends Component {
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
              Editar/Excluir
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
                  { Number(e.exchangeRates[e.currency].ask) }
                </td>
                <td>
                  { Number(e.value * e.exchangeRates[e.currency].ask).toFixed(2) }
                </td>
                <td>
                  Real
                </td>
                <td>
                  Editar
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

export default connect(mapStateToProps)(Table);

// import PropTypes from 'prop-types';
// import React, { Component } from 'react';
// import { connect } from 'react-redux';
// import { removeExpensesTable, editExpenses } from '../redux/actions';

// class TableSimple extends Component {
//   handleClick = (id) => {
//     const { dispatch } = this.props;
//     dispatch(removeExpensesTable(id));
//   };

//   clickHandle = (id) => {
//     const { dispatch } = this.props;
//     dispatch(editExpenses(id));
//   };

//   render() {
//     const { expenses } = this.props;
//     console.log(expenses);

//     return (
//       <table className="table-auto">
//         <thead>
//           <tr>
//             <th>
//               Descrição
//             </th>
//             <th>
//               Tag
//             </th>
//             <th>
//               Método de pagamento
//             </th>
//             <th>
//               Valor
//             </th>
//             <th>
//               Moeda
//             </th>
//             <th>
//               Câmbio utilizado
//             </th>
//             <th>
//               Valor convertido
//             </th>
//             <th>
//               Moeda de conversão
//             </th>
//             <th>
//               Editar/Excluir
//             </th>
//           </tr>
//         </thead>
//         <tbody>
//           {
//             expenses.map((e) => (
//               <tr key={ e.id }>
//                 <td>
//                   { e.description }
//                 </td>
//                 <td>
//                   { e.tag }
//                 </td>
//                 <td>
//                   { e.method }
//                 </td>
//                 <td>
//                   { Number(e.value).toFixed(2) }
//                 </td>
//                 <td>
//                   { e.exchangeRates[e.currency].name}
//                 </td>
//                 <td>
//                   { Number(e.exchangeRates[e.currency].ask).toFixed(2) }
//                 </td>
//                 <td>
//                   {(e.value * e.exchangeRates[e.currency].ask).toFixed(2)}
//                 </td>
//                 <td>
//                   Real
//                 </td>
//                 <td>
//                   <button
//                     type="button"
//                     data-testid="edit-btn"
//                     onClick={ () => this.clickHandle(e.id) }
//                   >
//                     Editar despesa
//                   </button>
//                   <button
//                     type="button"
//                     data-testid="delete-btn"
//                     onClick={ () => this.handleClick(e.id) } // evita que a func seja chamada diretamente ao carregar
//                   >
//                     Excluir
//                   </button>
//                 </td>
//               </tr>
//             ))
//           }

//         </tbody>
//       </table>
//     );
//   }
// }

// const mapStateToProps = (state) => ({
//   expenses: state.wallet.expenses,
// });

// TableSimple.propTypes = {
//   dispatch: PropTypes.func.isRequired,
//   expenses: PropTypes.arrayOf(PropTypes.shape({
//     currency: PropTypes.string,
//   })).isRequired,
// };

// export default connect(mapStateToProps)(TableSimple);

import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { removeExpensesTable, editExpenses } from '../redux/actions';

class TableSimple extends Component {
  handleClick = (id) => {
    const { dispatch } = this.props;
    dispatch(removeExpensesTable(id));
  };

  clickHandle = (id) => {
    const { dispatch } = this.props;
    dispatch(editExpenses(id));
  };

  render() {
    const { expenses } = this.props;

    return (
      <table className="min-w-full divide-y divide-purple-200">
        <thead>
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-purple-500 uppercase tracking-wider">
              Tag
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-purple-500 uppercase tracking-wider">
              Método de pagamento
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-purple-500 uppercase tracking-wider">
              Valor
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-purple-500 uppercase tracking-wider">
              Moeda
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-purple-500 uppercase tracking-wider">
              Câmbio utilizado
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-purple-500 uppercase tracking-wider">
              Valor convertido
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-purple-500 uppercase tracking-wider">
              Moeda de conversão
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-purple-500 uppercase tracking-wider">
              Editar/Excluir
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-purple-200">
          {expenses.map((e) => (
            <tr key={ e.id }>
              <td className="px-6 py-4 whitespace-nowrap text-gray-600 bg-white-400">
                {e.tag}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-gray-600 bg-white-400">
                {e.method}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-gray-600 bg-white-400">
                {Number(e.value).toFixed(2)}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-gray-600 bg-white-400">
                {e.exchangeRates[e.currency].name}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-gray-600 bg-white-400">
                {Number(e.exchangeRates[e.currency].ask).toFixed(2)}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-gray-600 bg-white-400">
                {(e.value * e.exchangeRates[e.currency].ask).toFixed(2)}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-gray-600 bg-white-400">
                Real
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-gray-600 bg-white-400">
                <button
                  type="button"
                  data-testid="edit-btn"
                  onClick={ () => this.clickHandle(e.id) }
                  className="text-indigo-600 hover:text-indigo-900"
                >
                  Editar despesa
                </button>
                <button
                  type="button"
                  data-testid="delete-btn"
                  onClick={ () => this.handleClick(e.id) }
                  className="ml-2 text-red-600 hover:text-red-900"
                >
                  Excluir
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
}

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

TableSimple.propTypes = {
  dispatch: PropTypes.func.isRequired,
  expenses: PropTypes.arrayOf(PropTypes.shape({
    currency: PropTypes.string,
  })).isRequired,
};

export default connect(mapStateToProps)(TableSimple);

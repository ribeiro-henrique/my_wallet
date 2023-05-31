import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Header extends React.Component {
  render() {
    const { userEmail, expenses } = this.props;

    const accExp = expenses.reduce((acc, arr) => (
      acc + (
        Number(arr.value) * Number(arr.exchangeRates[arr.currency].ask)
      )
    ), 0);

    const accExpFixed = accExp.toFixed(2);

    return (
      <header className="bg-indigo-600 text-white p-4">
        <article>
          <h3 data-testid="email-field" className="text-xl font-bold">
            Bem vindo:
            {' '}
            {userEmail}
          </h3>
          <section>
            Total de despesas:
            <h4 data-testid="total-field" className="text-lg font-semibold">
              {accExpFixed}
            </h4>
          </section>
          <section>
            <h4 data-testid="header-currency-field" className="text-lg font-semibold">
              BRL
            </h4>
          </section>
        </article>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  userEmail: state.user.email,
  expenses: state.wallet.expenses,
});

Header.propTypes = {
  userEmail: PropTypes.string.isRequired,
  expenses: PropTypes.array.isRequired,
};

export default connect(mapStateToProps)(Header);

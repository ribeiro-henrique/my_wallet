import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Header extends React.Component {
  render() {
    const { userEmail } = this.props;
    return (
      <header>
        <article>
          <h3 data-testid="email-field">
            Bem vindo:
            {' '}
            { userEmail }

          </h3>
          <section>
            Total de despesas:
            <h4 data-testid="total-field">
              0
            </h4>
          </section>
          <section>
            <h4 data-testid="header-currency-field">
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
});

Header.propTypes = {
  userEmail: PropTypes.string.isRequired,
}.isRequired;

export default connect(mapStateToProps)(Header);

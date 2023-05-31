import React from 'react';
import Header from '../components/Header';
import TableSimple from '../components/Table';
import WalletForm from '../components/WalletForm';
import './Wallet.css';

class Wallet extends React.Component {
  render() {
    return (
      <div className="wallet-content max-w-screen-lg ml-0">
        <div className="flex">
          <div className="header-wallet-form-container">
            <Header />
            <WalletForm />
          </div>
          <div className="ml-4 max-w-full">
            <TableSimple />
          </div>
        </div>
      </div>
    );
  }
}

export default Wallet;

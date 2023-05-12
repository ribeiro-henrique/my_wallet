import React from 'react';
import { Route } from 'react-router-dom';
import Login from './pages/Login';

function App() {
  return (
    <div className="app-container">
      <h1>Hello, TrybeWallet!</h1>
      <Route exact path="/" component={ Login } />
    </div>
  );
}

export default App;

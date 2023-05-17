// ACTIONS TYPES
export const ADD_EMAIL = 'ADD_EMAIL';
export const WALLET_FETCH = 'WALLET_FETCH ';
export const EXPENSES_WALLET = 'EXPENSES_WALLET';
export const REMOVE_EXPENSES = 'REMOVE_EXPENSES';

// ACTIONS CREATORS
export const addEmail = (email) => ({
  type: ADD_EMAIL,
  payload: email,
});

// divisória req 1, 3

export const walletFetch = (filteredCoins) => ({
  type: WALLET_FETCH,
  payload: filteredCoins,
});

// divisória req 3

export const walletCurrencies = () => async (dispatch) => { // action que retorna func
  /* const USDT = 'USDT'; */
  const URL = await fetch('https://economia.awesomeapi.com.br/json/all');
  const results = await URL.json();
  const filteredCoins = Object.keys(results).filter((k) => k !== 'USDT');
  dispatch(walletFetch(filteredCoins));
};

// divisória req 4

export const setExpensesWallet = (payload) => ({
  type: EXPENSES_WALLET,
  payload,
});

export const getExpensesWallet = (stateWalletForm) => async (dispatch) => { // action que retorna func
  const URL = await fetch('https://economia.awesomeapi.com.br/json/all');
  const results = await URL.json();
  dispatch(setExpensesWallet({ ...stateWalletForm, exchangeRates: results }));
};

// divisória req 8

export const removeExpensesTable = (payload) => ({
  type: REMOVE_EXPENSES,
  payload,
});

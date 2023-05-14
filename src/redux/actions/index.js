// ACTIONS TYPES
export const ADD_EMAIL = 'ADD_EMAIL';
export const WALLET_FETCH = 'WALLET_FETCH ';

// ACTIONS CREATORS
export const addEmail = (email) => ({
  type: ADD_EMAIL,
  payload: email,
});

export const walletFetch = (currencies) => ({
  type: WALLET_FETCH,
  payload: currencies,
});

export const walletCurrencies = () => async (dispatch) => {
  const USDT = 'USDT';
  const URL = await fetch('https://economia.awesomeapi.com.br/json/all');
  const results = await URL.json();
  const filteredCoins = Object.keys(results).filter((k) => k !== USDT);
  dispatch(walletFetch(filteredCoins));
};

import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouterAndRedux } from './renderWith';

import App from '../../App';

describe('Trying to get the max tests coverage', () => {
  it('Verifica se há os campos para login na tela inicial', () => {
    const { history } = renderWithRouterAndRedux(<App />);

    const { pathname } = history.location;
    expect(pathname).toBe('/');

    screen.getByTestId('email-input');

    screen.getByLabelText(/senha:/i);

    screen.getByRole('button', {
      name: /entrar/i,
    });
  });
  it('Verifica se inicialmente o btn está disabled', () => {
    renderWithRouterAndRedux(<App />);

    const getBtn = screen.getByRole('button', {
      name: /entrar/i,
    });
    expect(getBtn).toBeDisabled();
  });
  it('Verifica os inputs com valores diversos', () => {
    renderWithRouterAndRedux(<App />);

    const typeEmail = 'testeToBeFail';
    const typePass = '123';

    userEvent.type(screen.getByTestId('email-input'), typeEmail);
    userEvent.type(screen.getByLabelText(/senha:/i), typePass);

    const getBtn = screen.getByRole('button', {
      name: /entrar/i,
    });
    expect(getBtn).toBeDisabled();
  });
});

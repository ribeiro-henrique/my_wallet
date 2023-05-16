import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouterAndRedux } from './renderWith';

import App from '../../App';

const EMAIL_INPUT = 'email-input'; // lint reclamou do uso excessivo

describe('Trying to get the max tests coverage', () => {
  it('Verifica se há os campos para login na tela inicial', () => {
    const { history } = renderWithRouterAndRedux(<App />);

    const { pathname } = history.location;
    expect(pathname).toBe('/');

    screen.getByTestId(EMAIL_INPUT);

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
  it('Verifica os inputs com valores incorretos', () => {
    renderWithRouterAndRedux(<App />);

    const typeEmail = 'testeToBeFail';
    const typePass = '123';

    userEvent.type(screen.getByTestId(EMAIL_INPUT), typeEmail);
    userEvent.type(screen.getByLabelText(/senha:/i), typePass);

    const getBtn = screen.getByRole('button', {
      name: /entrar/i,
    });
    expect(getBtn).toBeDisabled();
  });
  it('Verifica os inputs com valores corretos', () => {
    renderWithRouterAndRedux(<App />);

    const typeEmail = 'hesr.ribeiro@gmail.com';
    const typePass = '123456789';

    userEvent.type(screen.getByTestId(EMAIL_INPUT), typeEmail);
    userEvent.type(screen.getByLabelText(/senha:/i), typePass);

    const getBtn = screen.getByRole('button', {
      name: /entrar/i,
    });
    expect(getBtn).toBeEnabled();
  });
  it('Verifica se acessa o comp Wallet corretamente', () => {
    const { history } = renderWithRouterAndRedux(<App />);

    const typeEmail = 'hesr.ribeiro@gmail.com';
    const typePass = '123456789';

    userEvent.type(screen.getByTestId(EMAIL_INPUT), typeEmail);
    userEvent.type(screen.getByLabelText(/senha:/i), typePass);

    const getBtn = screen.getByRole('button', {
      name: /entrar/i,
    });
    expect(getBtn).toBeEnabled();
    userEvent.click(getBtn);

    const { pathname } = history.location;
    expect(pathname).toBe('/carteira');

    const getUser = screen.getByRole('heading', {
      name: /bem vindo: hesr\.ribeiro@gmail\.com/i,
    });
    expect(getUser).toBeInTheDocument();
  });
});

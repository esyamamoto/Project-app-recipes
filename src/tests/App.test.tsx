import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderwithrouter';

import Login from '../components/Login';

test('login sendo renderizado', () => {
  // Este arquivo pode ser modificado ou deletado sem problemas
  renderWithRouter(<Login />);

  const loginButton = screen.getByTestId('login-submit-btn');
  expect(loginButton).toBeInTheDocument();
  const emailInput = screen.getByTestId('email-input');
  expect(emailInput).toBeInTheDocument();
  const loginTexto = screen.getByText('Login');
  expect(loginTexto).toBeInTheDocument();
  const passwordInput = screen.getByTestId('password-input');
  expect(passwordInput).toBeInTheDocument();
});

test('validando email e senha', async () => {
  renderWithRouter(<Login />);

  const loginButton = screen.getByTestId('login-submit-btn');

  const emailInput = screen.getByTestId('email-input');

  const passwordInput = screen.getByTestId('password-input');

  await userEvent.type(emailInput, 'itsmenunes@gmail.com');
  await userEvent.type(passwordInput, '1234567');
  await userEvent.click(loginButton);
});

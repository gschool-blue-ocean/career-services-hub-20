import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import App from '../client/src/components/App/App';

describe('Career Service Application', () => {
  test('should log in and display the main page', () => {
    render(<App />);
    
    const emailInput = screen.getByTestId('email');
    const passwordInput = screen.getByTestId('password');
    const loginButton = screen.getByTestId('login-button');

    fireEvent.change(emailInput, { target: { value: 'bob_white@galvanize.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password' } });
    fireEvent.click(loginButton);

    const mainPageElement = screen.getByTestId('body_container');
    expect(mainPageElement).toBeInTheDocument();
  });
});

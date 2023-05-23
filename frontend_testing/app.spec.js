import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import App from '../client/src/components/App/App';

describe('Career Service Application', () => {
  test('should log in and display the main page', () => {
    render(<App />);
    
    //If the classNames for the emailInput, passwordInput, loginButton variables are changed on the logInPage.jsx file they need to be updated here as well or the test will fail.
    const emailInput = screen.getByTestId('email');
    const passwordInput = screen.getByTestId('password');
    const loginButton = screen.getByTestId('login-button');

    fireEvent.change(emailInput, { target: { value: 'bob_white@galvanize.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password' } });
    fireEvent.click(loginButton);

    //If the className for the mainPageElement variables is changed on the CareerServicesHub.jsx file it will need to be updated here as well or the test will fail.
    const mainPageElement = screen.getByTestId('body_container');
    expect(mainPageElement).toBeInTheDocument();
  });
});

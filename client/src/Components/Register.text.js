import { screen, render } from '@testing-library/react';
import Register from './Register';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from '../Store/store'; 

describe('Register Component', () => {
  const renderRegister = () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <Register />
        </BrowserRouter>
      </Provider>
    );
  };

  it('renders name input', () => {
    renderRegister();
    const nameInput = screen.getByPlaceholderText(/Enter your name/i);
    expect(nameInput).toBeInTheDocument();
  });

  it('renders email input', () => {
    renderRegister();
    const emailInput = screen.getByPlaceholderText(/Enter your email/i);
    expect(emailInput).toBeInTheDocument();
  });

  it('renders password input', () => {
    renderRegister();
    const passwordInput = screen.getByPlaceholderText(/Enter your password/i);
    expect(passwordInput).toBeInTheDocument();
  });

  it('renders confirm password input', () => {
    renderRegister();
    const confirmPasswordInput = screen.getByPlaceholderText(/Confirm your password/i);
    expect(confirmPasswordInput).toBeInTheDocument();
  });

  it('renders register button', () => {
    renderRegister();
    const button = screen.getByRole('button', { name: /register/i });
    expect(button).toBeInTheDocument();
  });
});

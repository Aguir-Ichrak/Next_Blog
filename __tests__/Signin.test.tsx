import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import LoginPage from '../app/auth/sign-in/page';
import { useRouter } from 'next/navigation';
import axios from 'axios';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

const mockRouter = { push: jest.fn() };
(useRouter as jest.Mock).mockReturnValue(mockRouter);

jest.mock('axios', () => ({
    post: jest.fn(), 
  }));

describe('LoginPage', () => {
  const mockRouter = { push: jest.fn() };

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue(mockRouter);
    (axios.post as jest.Mock).mockResolvedValue({ data: { token: 'token' } });
    localStorage.clear();
  });

  it('renders the login form', () => {
    render(<LoginPage />);
    expect(screen.getByRole('heading', { name: /login/i })).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/email/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /login/i })).toBeInTheDocument();
    expect(screen.getByText(/don't have an account?/i)).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /sign up/i })).toBeInTheDocument();
  });


  it('handles email and password input changes', () => {
    render(<LoginPage />);
    const emailInput = screen.getByPlaceholderText(/email/i) as HTMLInputElement;
    const passwordInput = screen.getByPlaceholderText(/password/i) as HTMLInputElement;

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });

    expect(emailInput.value).toBe('test@example.com');
    expect(passwordInput.value).toBe('password123');

  });

  it('submits the form with valid credentials and redirects', async () => {
    render(<LoginPage />);
    const emailInput = screen.getByPlaceholderText(/email/i);
    const passwordInput = screen.getByPlaceholderText(/password/i);
    const loginButton = screen.getByRole('button', { name: /login/i });

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.click(loginButton);

    expect(loginButton).toBeDisabled(); 

    await waitFor(() => {
      expect(localStorage.getItem('token')).toBe('token');
    });

    expect(localStorage.getItem('token')).toBe('token');
    expect(screen.getByText(/login successful!/i)).toBeInTheDocument();
    expect(axios.post).toHaveBeenCalledTimes(1);
    expect(axios.post).toHaveBeenCalledWith("http://localhost:3000/auth/login", { email: 'test@example.com', password: 'password123' });  });

  it('displays an error message for invalid credentials', async () => {
    (axios.post as jest.Mock).mockRejectedValue({
      response: { data: { message: 'Invalid credentials' } },
    });

    render(<LoginPage />);
    const emailInput = screen.getByPlaceholderText(/email/i);
    const passwordInput = screen.getByPlaceholderText(/password/i);
    const loginButton = screen.getByRole('button', { name: /login/i });

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'wrongpassword' } });
    fireEvent.click(loginButton);

    await waitFor(() => {
      expect(screen.getByText(/invalid credentials/i)).toBeInTheDocument();
    });
    expect(loginButton).not.toBeDisabled();
  });

  it('displays a generic error message if the API returns an unexpected error', async () => {
    (axios.post as jest.Mock).mockRejectedValue({}); 

    render(<LoginPage />);
    const emailInput = screen.getByPlaceholderText(/email/i);
    const passwordInput = screen.getByPlaceholderText(/password/i);
    const loginButton = screen.getByRole('button', { name: /login/i });

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'wrongpassword' } });
    fireEvent.click(loginButton);

    await waitFor(() => {
      expect(screen.getByText(/something went wrong/i)).toBeInTheDocument();
    });
  });

  it('navigates to signup page', () => {
    render(<LoginPage />);
    const signUpLink = screen.getByRole('link', { name: /sign up/i });
    expect(signUpLink).toHaveAttribute('href', '/auth/register');
  });

});
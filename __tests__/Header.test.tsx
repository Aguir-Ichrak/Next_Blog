import { render, screen, fireEvent } from '@testing-library/react';
import Header from '../app/components/Header';
import { useRouter } from 'next/navigation';

jest.mock('next/navigation', () => ({
    useRouter: jest.fn(),
}));

describe('Header', () => {
  const mockRouter = { push: jest.fn() };

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue(mockRouter);
    localStorage.clear();
  });

  it('renders the header elements correctly', () => {
    render(<Header />);
    expect(screen.getByText(/ElepziaBlog/i)).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /home/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /create/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /profile/i })).toBeInTheDocument();
    expect(screen.getByRole('btnmenu')).toBeInTheDocument();
  });

  it('toggles the mobile menu when the button is clicked', async () => { 
    render(<Header />);
    const menuButton = screen.getByRole('btnmenu');

    expect(screen.queryByRole('navigation', { name: /mobile menu/i })).not.toBeInTheDocument();

    fireEvent.click(menuButton);

        expect(screen.getByRole('navigation', { name: /mobile menu/i })).toBeInTheDocument();

    fireEvent.click(menuButton);

        expect(screen.queryByRole('navigation', { name: /mobile menu/i })).not.toBeInTheDocument();
});

  it('calls handleLogout and redirects to login on logout click', () => {
    localStorage.setItem('token', 'token'); 
    render(<Header />);

    const logoutButton = screen.getByRole('btn', { name: /logout/i }); 
    fireEvent.click(logoutButton);

    expect(localStorage.getItem('token')).toBeNull(); 
    expect(mockRouter.push).toHaveBeenCalledWith('/auth/sign-in');
  });

it('navigates to the correct routes when links are clicked', () => {
    localStorage.setItem('token', 'token');
    render(<Header />);

    const logoLink = screen.getByText(/ElepziaBlog/i);
    fireEvent.click(logoLink);
    expect(mockRouter.push).toHaveBeenCalledWith('/');

    const homeLink = screen.getByRole('link', { name: /home/i });
    fireEvent.click(homeLink);
    expect(mockRouter.push).toHaveBeenCalledWith('/');

    const addBlogLink = screen.getByRole('link', { name: /create/i });
    fireEvent.click(addBlogLink);
    expect(mockRouter.push).toHaveBeenCalledWith('/blog/create-blog');

    const profileLink = screen.getByRole('link', { name: /profile/i });
    fireEvent.click(profileLink);
    expect(mockRouter.push).toHaveBeenCalledWith('/auth/profile');
});
});
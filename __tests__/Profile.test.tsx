import { render, screen, waitFor } from '@testing-library/react';
import { notFound } from 'next/navigation';
import Profile from '../app/auth/profile/page';

jest.mock('next/navigation', () => ({
    notFound: jest.fn(),
}));

global.fetch = jest.fn();

describe('Profile Component', () => {
    jest.mock('next/navigation', () => ({
        notFound: jest.fn(() => {  }),
      }))
      beforeEach(() => {
        (notFound as jest.MockedFunction<typeof notFound>).mockClear();
        localStorage.clear();
      });


    it('renders loading state initially', () => {
        render(<Profile />);
        expect(screen.getByText('Loading...')).toBeInTheDocument();
    });

    it('fetches and displays user data', async () => {
        const mockUserData = {
            username: 'testuser',
            email: 'test@example.com',
            role: 'Software Engineer',
        };

        (fetch as jest.Mock).mockResolvedValue({
            ok: true,
            json: () => Promise.resolve(mockUserData),
        });

        localStorage.setItem('token', 'mockedToken');

        render(<Profile />);

        await waitFor(() => {
            expect(screen.getByRole('heading', { name: mockUserData.username })).toBeInTheDocument();
            expect(screen.getByText(mockUserData.email)).toBeInTheDocument();
            expect(screen.getByText(mockUserData.role)).toBeInTheDocument();
            expect(screen.getByText(`Meet ${mockUserData.username}, a passionate individual with a strong background in technology and a deep interest in making an impact in the industry. They are currently working as an ${mockUserData.role}.`)).toBeInTheDocument();
        });


    });

    it('handles fetch failure and calls notFound', async () => {
        (fetch as jest.Mock).mockRejectedValue(new Error('Failed to fetch'));
        localStorage.setItem('token', 'mockedToken');

        render(<Profile />);

        await waitFor(() => {
            expect(notFound).toHaveBeenCalledTimes(1);
        });
    });

    it('redirects to notFound if no token', () => {
        render(<Profile />);
        expect(notFound).toHaveBeenCalledTimes(1);
    });

    it('handles non-ok response and calls notFound', async () => {
        (fetch as jest.Mock).mockResolvedValue({ ok: false });
        localStorage.setItem('token', 'mockedToken');

        render(<Profile />);

        await waitFor(() => {
            expect(notFound).toHaveBeenCalledTimes(1);
        });
    });

});
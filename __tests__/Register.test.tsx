import {
  render,
  screen,
  fireEvent,
  waitFor,
} from "@testing-library/react";
import SignupForm from "../app/auth/register/page";
import axios from "axios";
import { useRouter } from "next/navigation";

jest.mock("axios");
jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

describe("SignupForm Component", () => {
  const mockRouter = { push: jest.fn() };
  const mockAxiosPost = jest.mocked(axios.post);

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue(mockRouter);
    mockAxiosPost.mockResolvedValue({ data: {} });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders the form correctly", () => {
    render(<SignupForm />);
    expect(
      screen.getByRole("heading", { name: /Signup/i })
    ).toBeInTheDocument();
    expect(screen.getByLabelText(/Username/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
    expect(screen.getByTestId("password")).toBeInTheDocument();
    expect(screen.getByTestId("confirmpassword")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Signup/i })).toBeInTheDocument();
    expect(screen.getByText(/Already Registered?/i)).toBeInTheDocument();
  });

  it("handles input changes", async () => {
    render(<SignupForm />);
    const usernameInput = screen.getByLabelText(
      /Username/i
    ) as HTMLInputElement;
    const emailInput = screen.getByLabelText(/Email/i) as HTMLInputElement;
    const passwordInput = screen.getByTestId("password") as HTMLInputElement;
    const confirmPasswordInput = screen.getByTestId(
      "confirmpassword"
    ) as HTMLInputElement;
    const submitButton = screen.getByRole("button", { name: /Signup/i });

    fireEvent.change(passwordInput, { target: { value: "password123" } });
    fireEvent.change(confirmPasswordInput, {
      target: { value: "password123" },
    });
    fireEvent.change(usernameInput, { target: { value: "testuser" } });
    fireEvent.change(emailInput, { target: { value: "test@example.com" } });

    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(usernameInput.value).toBe("");
      expect(emailInput.value).toBe("");
      expect(passwordInput.value).toBe("");
      expect(confirmPasswordInput.value).toBe("");
    });
  });

it("handles successful signup", async () => {
    jest.useFakeTimers();
    (axios.post as jest.Mock).mockResolvedValue({ data: {} });
    render(<SignupForm />);
    fireEvent.change(screen.getByLabelText(/Username/i), {
        target: { value: "testuser" },
    });
    fireEvent.change(screen.getByLabelText(/Email/i), {
        target: { value: "test@example.com" },
    });
    fireEvent.change(screen.getByTestId("password"), {
        target: { value: "password123" },
    });
    fireEvent.change(screen.getByTestId("confirmpassword"), {
        target: { value: "password123" },
    });
    fireEvent.click(screen.getByRole("button", { name: /Signup/i }));

    await waitFor(() => {
        expect(axios.post).toHaveBeenCalledTimes(1);
        expect(axios.post).toHaveBeenCalledWith(
            "http://localhost:3000/auth/register",
            {
                username: "testuser",
                email: "test@example.com",
                password: "password123",
                role: "user",
            }
        );
        expect(
            screen.getByText(/Signup successful! You can now log in./i)
        ).toBeInTheDocument();
    });

    jest.advanceTimersByTime(2000);
    await waitFor(() => {
        expect(mockRouter.push).toHaveBeenCalledWith("/auth/sign-in");
    });

    jest.useRealTimers();
});

    it('displays a generic error message for unexpected errors', async () => {
      mockAxiosPost.mockRejectedValue({}); 
        render(<SignupForm />);
        fireEvent.change(screen.getByLabelText(/Username/i), { target: { value: 'testuser' } });
        fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: 'test@example.com' } });
        fireEvent.change(screen.getByTestId("password"), { target: { value: 'password123' } });
        fireEvent.change(screen.getByTestId("confirmpassword"), { target: { value: 'password123' } });
        fireEvent.click(screen.getByRole('button', { name: /Signup/i }));

        await waitFor(() => {
            expect(screen.getByText(/Something went wrong./i)).toBeInTheDocument();
        });
    });
});

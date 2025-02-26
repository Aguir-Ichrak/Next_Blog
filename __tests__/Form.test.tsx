import { render, screen, fireEvent } from '@testing-library/react';
import Form from '../app/components/Form';
import { useRouter } from 'next/navigation';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

describe('Form Component', () => {
  const mockRouter = {
    back: jest.fn(),
  };

  const mockBlog = {
    title: '',
    content: '',
    tags: [],
    category: '',
    image: '',
  };

  const mockSetBlog = jest.fn();
  const mockHandleSubmit = jest.fn();

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue(mockRouter);
    mockSetBlog.mockClear();
    mockHandleSubmit.mockClear();
  });

  it('renders the form with correct labels and placeholders', () => {
    render(
      <Form
        type="Create"
        blog={mockBlog}
        setBlog={mockSetBlog}
        submitting={false}
        handleSubmit={mockHandleSubmit}
      />
    );

    expect(screen.getByText('Create Your Blog')).toBeInTheDocument();
    expect(screen.getByLabelText('Title')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Enter blog title')).toBeInTheDocument();
    expect(screen.getByLabelText('Content')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Write your blog content here')).toBeInTheDocument();
    expect(screen.getByLabelText('Tags')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Enter tags, separated by commas')).toBeInTheDocument();
    expect(screen.getByLabelText('Select Category')).toBeInTheDocument();
    expect(screen.getByLabelText('Upload Image')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Create' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Cancel' })).toBeInTheDocument();


  });

  it('updates the blog title when input changes', () => {
    render(
      <Form
        type="Create"
        blog={mockBlog}
        setBlog={mockSetBlog}
        submitting={false}
        handleSubmit={mockHandleSubmit}
      />
    );

    fireEvent.change(screen.getByLabelText('Title'), { target: { value: 'Test Blog Title' } });
    expect(mockSetBlog).toHaveBeenCalledWith({ ...mockBlog, title: 'Test Blog Title' });
  });

  it('updates the blog content when textarea changes', () => {
    render(
        <Form
          type="Create"
          blog={mockBlog}
          setBlog={mockSetBlog}
          submitting={false}
          handleSubmit={mockHandleSubmit}
        />
      );
  
      fireEvent.change(screen.getByLabelText('Content'), { target: { value: 'Test Blog content' } });
      expect(mockSetBlog).toHaveBeenCalledWith({ ...mockBlog, content: 'Test Blog content' });

  });

  it('updates the blog tags when input changes', () => {
    render(
        <Form
          type="Create"
          blog={mockBlog}
          setBlog={mockSetBlog}
          submitting={false}
          handleSubmit={mockHandleSubmit}
        />
      );
    fireEvent.change(screen.getByLabelText('Tags'), { target: { value: 'tag1, tag2' } });
    expect(mockSetBlog).toHaveBeenCalledWith({ ...mockBlog, tags: ['tag1', 'tag2'] });
  });

  it('updates the blog category when select changes', () => {
    render(
        <Form
          type="Create"
          blog={mockBlog}
          setBlog={mockSetBlog}
          submitting={false}
          handleSubmit={mockHandleSubmit}
        />
      );
    fireEvent.change(screen.getByRole('combobox'), { target: { value: 'Scientific' } });
    expect(mockSetBlog).toHaveBeenCalledWith({ ...mockBlog, category: 'Scientific' });
  });


  it('handles image upload and updates image preview', async () => {
    render(
      <Form
        type="Create"
        blog={mockBlog}
        setBlog={mockSetBlog}
        submitting={false}
        handleSubmit={mockHandleSubmit}
      />
    );

    const file = new File(['(empty)'], 'test.jpg', { type: 'image/jpeg' });
    const input = screen.getByLabelText('Upload Image');
    const originalCreateObjectURL = global.URL.createObjectURL;

    global.URL.createObjectURL = jest.fn(() => 'mocked-image-url');

    fireEvent.change(input, { target: { files: [file] } });

    expect(mockSetBlog).toHaveBeenCalledWith({...mockBlog, image: 'mocked-image-url'});
    global.URL.createObjectURL = originalCreateObjectURL;
  });


  it('calls router.back when cancel button is clicked', () => {
    render(
      <Form
        type="Create"
        blog={mockBlog}
        setBlog={mockSetBlog}
        submitting={false}
        handleSubmit={mockHandleSubmit}
      />
    );

    fireEvent.click(screen.getByRole('button', { name: 'Cancel' }));
    expect(mockRouter.back).toHaveBeenCalledTimes(1);
  });

  it('displays error message when error prop is provided', () => {
    render(
      <Form
        type="Create"
        blog={mockBlog}
        setBlog={mockSetBlog}
        submitting={false}
        handleSubmit={mockHandleSubmit}
        error="Failed to create blog."
      />
    );
    expect(screen.getByText('Failed to create blog.')).toBeInTheDocument();
  });
});
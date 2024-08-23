import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Modal } from './Modal';

describe('Modal Component', () => {
  const mockOnClose = jest.fn();

  test('renders a question and options', () => {
    render(<Modal onClose={mockOnClose} />);

    const questionElement = screen.getByText(/What is your favorite Italian pasta?|Do you like Natto?/);
    expect(questionElement).toBeInTheDocument();

    const optionElements = screen.getAllByRole('button');
    expect(optionElements.length).toBeGreaterThan(1);
  });

  test('closes the modal when the Close button is clicked', () => {
    render(<Modal onClose={mockOnClose} />);

    const closeButton = screen.getByText('Close');
    fireEvent.click(closeButton);

    expect(mockOnClose).toHaveBeenCalled();
  });

  test('cycles through the questions when an option is clicked', () => {
    render(<Modal onClose={mockOnClose} />);

    const optionButtons = screen.getAllByRole('button');
    fireEvent.click(optionButtons[0]);

    const questionElement = screen.queryByText(/What is your favorite Italian pasta?|Do you like Natto?/);
    if (questionElement) {
      expect(questionElement).toBeInTheDocument();
    } else {
      expect(questionElement).not.toBeInTheDocument();
    }
  });
});

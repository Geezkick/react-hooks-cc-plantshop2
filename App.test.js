import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import App from './App';

test('renders Plantsy header', () => {
  render(<App />);
  const header = screen.getByText(/plantsy/i);
  expect(header).toBeInTheDocument();
});

test('filters plants by search', async () => {
  render(<App />);
  
  // Wait for initial plants to load
  await waitFor(() => screen.getByText(/aloe/i));

  // Simulate search input
  const searchInput = screen.getByRole('textbox');
  fireEvent.change(searchInput, { target: { value: 'Aloe' } });

  // Check if Aloe is displayed, and other plants are filtered out
  expect(screen.getByText(/aloe/i)).toBeInTheDocument();
  expect(screen.queryByText(/zz plant/i)).not.toBeInTheDocument();
});

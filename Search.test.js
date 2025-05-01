import { render, screen, fireEvent } from '@testing-library/react';
import Search from './Search';

test('calls onSearchChange when text is typed', () => {
  const handleSearchChange = jest.fn();
  render(<Search search="" onSearchChange={handleSearchChange} />);
  
  fireEvent.change(screen.getByRole('textbox'), { target: { value: 'Aloe' } });
  
  expect(handleSearchChange).toHaveBeenCalledWith('Aloe');
});
n
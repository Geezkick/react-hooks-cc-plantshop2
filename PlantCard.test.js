import { render, screen, fireEvent } from '@testing-library/react';
import PlantCard from './PlantCard';

const mockPlant = {
  id: 1,
  name: 'Aloe',
  image: './images/aloe.jpg',
  price: 15.99,
  soldOut: false
};

test('renders PlantCard with correct details', () => {
  render(<PlantCard plant={mockPlant} />);
  const plantName = screen.getByText(/aloe/i);
  expect(plantName).toBeInTheDocument();

  const price = screen.getByText(/\$15.99/i);
  expect(price).toBeInTheDocument();

  const image = screen.getByAltText(/aloe/i);
  expect(image).toBeInTheDocument();
});

test('toggles sold-out state when button clicked', () => {
  const handleToggleSoldOut = jest.fn();
  render(<PlantCard plant={mockPlant} onToggleSoldOut={handleToggleSoldOut} />);
  
  const button = screen.getByText(/sold out/i);
  fireEvent.click(button);
  
  expect(handleToggleSoldOut).toHaveBeenCalledTimes(1);
});

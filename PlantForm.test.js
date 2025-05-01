import { render, screen, fireEvent } from '@testing-library/react';
import PlantForm from './PlantForm';

test('calls onAddPlant when form is submitted', () => {
  const handleAddPlant = jest.fn();
  render(<PlantForm onAddPlant={handleAddPlant} />);
  
  fireEvent.change(screen.getByLabelText(/name/i), { target: { value: 'Ficus' } });
  fireEvent.change(screen.getByLabelText(/image/i), { target: { value: './images/ficus.jpg' } });
  fireEvent.change(screen.getByLabelText(/price/i), { target: { value: 20 } });

  fireEvent.click(screen.getByText(/add plant/i));

  expect(handleAddPlant).toHaveBeenCalledWith({
    name: 'Ficus',
    image: './images/ficus.jpg',
    price: 20
  });
});

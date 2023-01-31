import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { fireEvent } from '@testing-library/react';
import App from '../App';
import useFetch, { tableFetch } from '../hooks/tableFetch'

describe('test the whole aplication', () => {
  it('should check the elements on screen', () => {
    render(<App />);
    const titulo = screen.getByRole('heading', {
      name: /projeto - star wars planet search/i,
    });
    const table = screen.getByRole('table');
    const button = screen.getByRole('button', {
      name: /filtrar/i,
    });
    const input = screen.getByRole('textbox');
    userEvent.type(input, 'tato');

    expect(titulo).toBeInTheDocument();
    expect(table).toBeInTheDocument();
    expect(button).toBeInTheDocument();
    expect(input.value).toBe('tato');
  });

  it('renders correctly', async () => {
    const { getByTestId } = render(<App />);

    expect(getByTestId('name-filter')).toBeInTheDocument();
    expect(getByTestId('column-filter')).toBeInTheDocument();
    expect(getByTestId('comparison-filter')).toBeInTheDocument();
    expect(getByTestId('value-filter')).toBeInTheDocument();
    expect(getByTestId('button-filter')).toBeInTheDocument();
    expect(getByTestId('button-remove-filters')).toBeInTheDocument();
  });

  it('filters planet by name', async () => {
    const { getByTestId } = render(<App />);

    const textFilterInput = getByTestId('name-filter');
    fireEvent.change(textFilterInput, { target: { value: 'alderaan' } });

    expect(textFilterInput.value).toBe('alderaan');
  });

  it('filters planet by column and value', async () => {
    const { getByTestId } = render(<App />);

    const columnFilterSelect = getByTestId('column-filter');
    fireEvent.change(columnFilterSelect, { target: { value: 'population' } });

    const comparisonFilterSelect = getByTestId('comparison-filter');
    fireEvent.change(comparisonFilterSelect, { target: { value: 'maior que' } });

    const valueFilterInput = getByTestId('value-filter');
    fireEvent.change(valueFilterInput, { target: { value: '1000000000' } });

    const buttonFilterButton = getByTestId('button-filter');
    userEvent.click(buttonFilterButton);

    expect(columnFilterSelect.value).toBe('orbital_period');
    expect(comparisonFilterSelect.value).toBe('maior que');
    expect(valueFilterInput.value).toBe('1000000000');

    const columnFilterSelect2 = getByTestId('column-filter');
    fireEvent.change(columnFilterSelect2, { target: { value: 'rotation_period' } });

    const comparisonFilterSelect2 = getByTestId('comparison-filter');
    fireEvent.change(comparisonFilterSelect2, { target: { value: 'igual a' } });

    const valueFilterInput2 = getByTestId('value-filter');
    fireEvent.change(valueFilterInput2, { target: { value: '12' } });

    const buttonFilterButton2 = getByTestId('button-filter');
    userEvent.click(buttonFilterButton2);    

    expect(columnFilterSelect2.value).toBe('orbital_period');
    expect(comparisonFilterSelect2.value).toBe('igual a');
    expect(valueFilterInput2.value).toBe('12');
  });

  jest.mock('../hooks/tableFetch', () => ({
    useFetch: () => ({
      tableFetch: jest.fn(() => Promise.resolve([
        { name: 'Alderaan', population: '2000000000' },
        { name: 'Tatooine', population: '200000' },
        { name: 'Coruscant', population: '1000000000000' },
      ])),
    }),
  }));

  it('changes the state when button is clicked', () => {
    const { getByTestId } = render(<App />);
    const select = getByTestId("button-filter");
    userEvent.click(select);
    const filter = getByTestId("filter");
    expect(filter).toBeInTheDocument();
    const btnFilter = screen.getByRole('button', {
      name: /x/i
    });
    expect(btnFilter).toBeInTheDocument();
    userEvent.click(btnFilter);
    expect(filter).not.toBeInTheDocument();
  });

});

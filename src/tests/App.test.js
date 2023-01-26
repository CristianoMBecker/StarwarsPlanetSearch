import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';

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
});

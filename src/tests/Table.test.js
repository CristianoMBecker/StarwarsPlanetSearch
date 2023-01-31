import React from "react";
import { cleanup, fireEvent, getByText, render, screen, waitFor} from '@testing-library/react';
import App from '../App';
import testData from '../../cypress/mocks/testData';
import { act } from 'react-dom/test-utils';
import userEvent from '@testing-library/user-event';

  describe('a', () => {
    it('s', async () => {
      render(<App />);
      const inputTextEl = await screen.findByRole('textbox')
      expect(inputTextEl).toBeInTheDocument()
      expect(inputTextEl).toHaveValue('')
  
      const colunmFilter = await screen.findByTestId('column-filter')
      expect(colunmFilter).toBeInTheDocument()
      expect(colunmFilter).toHaveValue('population')
  
      const  comparisonFilter = await screen.findByTestId('comparison-filter')
      expect(comparisonFilter).toBeInTheDocument()
      expect(comparisonFilter).toHaveValue('maior que')
    })

    it('se ao clicar em filtrar a tabela é filtrada', async () => {
      jest.spyOn(global, 'fetch').mockResolvedValueOnce({
        ok: 'true',
        json: jest.fn().mockResolvedValue(testData),
      });
  
      act(() => {
        render(<App/>);  
      })
      
      const colunmFilter = await screen.findByTestId('column-filter')
      const  comparisonFilter = await screen.findByTestId('comparison-filter')
      const filterBtn = await screen.findByRole('button', {  name: /filtrar/i})
      const inputNumber = await screen.findByRole('spinbutton')
      
      const table = await screen.findByRole('table')
      expect(table).toBeInTheDocument()
      
      const nameEl = await screen.findByRole('cell', {  name: /endor/i})
      expect(nameEl).toBeInTheDocument()
  
      userEvent.selectOptions(colunmFilter, ['diameter'])
      userEvent.selectOptions(comparisonFilter, ['maior que'])
      userEvent.type(inputNumber, '9000')
  
  
      fireEvent.click(filterBtn)
      
      await waitFor(() => {
        const names = screen.queryAllByTestId('planet-name')
        expect(names).toHaveLength(7)
      })
  
      // Add filter with "equal to"
  
      userEvent.selectOptions(colunmFilter, ['population'])
      userEvent.selectOptions(comparisonFilter, ['igual a'])
      userEvent.type(inputNumber, '200000')
  
      fireEvent.click(filterBtn)
  
      await waitFor(() => {
        const names = screen.queryAllByTestId('planet-name')
        expect(names).toHaveLength(0)
      })
    })
  })    

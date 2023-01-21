import { useState } from 'react';

function useFetch() {
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState(null);

  const tableFetch = async () => {
    try {
      setIsLoading(true);

      const response = await fetch('https://swapi.dev/api/planets');

      if (!response.ok) {
        const apiError = new Error(
          'Houve uma falha na requisição para a API',
        );
        throw apiError;
      }

      const data = await response.json();
      return data.results;
    } catch (error) {
      setErrors(error);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    tableFetch, isLoading, errors,
  };
}

export default useFetch;

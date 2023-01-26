import React, { useEffect, useState } from 'react';
import useFetch from '../hooks/tableFetch';

function Table() {
  const { tableFetch } = useFetch();
  const [planetData, setPlanetData] = useState([]);
  const [isFetched, setFetched] = useState(false);
  const [text, setText] = useState('');
  const [number, setNumber] = useState('0');
  const [columns, setColumns] = useState('population');
  const [comparison, setComparison] = useState('maior que');
  const [filters, setFilters] = useState([]);

  async function getPlanets() {
    const planets = await tableFetch();
    setPlanetData(planets);
    setFetched(true);
  }

  const textFilter = () => {
    if (text.length > 0) {
      setPlanetData(planetData.filter((planet) => planet.name.toLowerCase()
        .includes(text.toLowerCase())));
    } else {
      getPlanets();
    }
  };

  const buttonFilter = () => {
    if (comparison === 'igual a') {
      setPlanetData(planetData.filter((planet) => planet[columns] === number));
    }
    if (comparison === 'menor que') {
      setPlanetData(planetData.filter((planet) => planet[columns] < +number));
    }
    if (comparison === 'maior que') {
      setPlanetData(planetData.filter((planet) => planet[columns] > +number));
    }
    setFilters([...filters, `${columns} ${comparison} ${number}`]);
  };

  const handleChange = ({ target }) => {
    setText((target.value).toLowerCase());
  };

  useEffect(() => {
    getPlanets();
  }, []);

  useEffect(() => {
    textFilter();
  }, [text]);

  console.log(filters);

  return (
    <main>
      <label htmlFor="filterText">
        <input
          type="text"
          data-testid="name-filter"
          value={ text }
          name="text"
          onChange={ handleChange }
        />
        <select
          name="columns"
          id="columns"
          value={ columns }
          data-testid="column-filter"
          onChange={ ({ target }) => setColumns(target.value) }
        >
          <option value="population">population</option>
          <option value="orbital_period">orbital_period</option>
          <option value="diameter">diameter</option>
          <option value="rotation_period">rotation_period</option>
          <option value="surface_water">surface_water</option>
        </select>
        <select
          name="comparison-filter"
          data-testid="comparison-filter"
          value={ comparison }
          onChange={ ({ target }) => setComparison(target.value) }
        >
          <option value="maior que">maior que</option>
          <option value="menor que">menor que</option>
          <option value="igual a">igual a</option>

        </select>
        <input
          type="number"
          name="value-filter"
          data-testid="value-filter"
          value={ number }
          onChange={ ({ target }) => setNumber(target.value) }
        />
        <button
          type="button"
          data-testid="button-filter"
          onClick={ buttonFilter }
        >
          FILTRAR
        </button>
      </label>
      {
        filters
        && (
          filters.map((filter, index) => (
            <div key={ index } data-testid="filter">
              <h5>
                { filter }
                <button
                  type="button"
                  name={ columns }
                >
                  X
                </button>
              </h5>
            </div>
          )))
      }
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Rotation Period</th>
            <th>Orbital Period</th>
            <th>Diameter</th>
            <th>Climate</th>
            <th>Gravity</th>
            <th>Terrain</th>
            <th>Surface Water</th>
            <th>Population</th>
            <th>Films</th>
            <th>Created</th>
            <th>Edited</th>
            <th>URL</th>
          </tr>
        </thead>
        {
          isFetched
            ? (
              <tbody>
                {
                  planetData
                    .map((planet, index) => (
                      <tr key={ index }>
                        <td>{ planet.name }</td>
                        <td>{ planet.rotation_period }</td>
                        <td>{ planet.orbital_period }</td>
                        <td>{ planet.diameter }</td>
                        <td>{ planet.climate }</td>
                        <td>{ planet.gravity }</td>
                        <td>{ planet.terrain }</td>
                        <td>{ planet.surface_water }</td>
                        <td>{ planet.population }</td>
                        <td>{ planet.films }</td>
                        <td>{ planet.created }</td>
                        <td>{ planet.edited }</td>
                        <td>{ planet.URL }</td>
                      </tr>
                    ))
                }
              </tbody>
            )
            : <td>Loading...</td>
        }
      </table>
    </main>
  );
}

export default Table;

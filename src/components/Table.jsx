import React, { useEffect, useState } from 'react';
import useFetch from '../hooks/tableFetch';

function Table() {
  const { tableFetch } = useFetch();
  const [planetData, setPlanetData] = useState([]);
  const [isFetched, setFetched] = useState(false);
  const [text, setText] = useState('');

  async function getPlanets() {
    const planets = await tableFetch();
    setPlanetData(planets);
    setFetched(true);
  }

  const handleChange = ({ target }) => {
    setText((target.value).toLowerCase());
  };

  useEffect(() => {
    getPlanets();
  }, []);

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
      </label>
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
                    .filter((planet) => planet.name.toLowerCase()
                      .includes(text.toLowerCase()))
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

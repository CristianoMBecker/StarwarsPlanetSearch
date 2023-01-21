import React, { useEffect, useState } from 'react';
import useFetch from '../hooks/tableFetch';

function Table() {
  const { tableFetch } = useFetch();
  const [planetData, setPlanetData] = useState([]);
  const [isFetched, setFetched] = useState(false);

  async function getPlanets() {
    const planets = await tableFetch();
    setPlanetData(planets);
    setFetched(true);
  }

  useEffect(() => {
    getPlanets();
  }, []);

  return (
    <main>
      <h1>Projeto - Star Wars Planet Search</h1>
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
          && (
            <tbody>
              {
                planetData.map((planet, index) => (
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
        }
      </table>
    </main>
  );
}

export default Table;

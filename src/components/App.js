import React from 'react';
import '../styles/App.scss';
// import { useEffect, useState } from 'react';
// import callToApi from '../services/api';

const App = () => {
  return (
    <div>
      <h1>Hola mundo</h1>
    </div>
  );
};

export default App;

//FETCH
// const App = () => {
//   // Estados

//   const [starWarsData, setStarWarsData] = useState({});

//   // Llamar a la api con useEffect

//   useEffect(() => {
//     // Dentro de useEffect llamamos a la API
//     callToApi().then((response) => {
//       // Cuando la API responde guardamos los datos en el estado para que se vuelva a renderizar el componente
//       setStarWarsData(response);
//     });
//     // Aquí ponemos un array vacío porque solo queremos que se llame a la API la primera vez
//   }, []);

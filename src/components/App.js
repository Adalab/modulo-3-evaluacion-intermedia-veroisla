import '../styles/App.scss';
import friends from '../data/friends.json';
import { useState } from 'react';

function App() {
  //ESTADOS, data, nuevaTarjeta y búsqeuda filtrado usuaria

  const [data, setData] = useState(friends);
  const [newquote, setNewQuote] = useState({
    quote: '',
    character: '',
  });
  const [search, setsearch] = useState('');

  //FUNCIONES

  //PREVENIR ENVÍO POR DEFECTO FORM
  const handleSubmit = (ev) => {
    ev.preventDefault();
  };

  //AÑADIR NUEVOS DATOS
  const handleNewQuote = (ev) => {
    setNewQuote({
      ...newquote,
      [ev.target.name]: ev.target.value,
    });
  };

  //BOTÓN AÑADIR / PINTAR DATOS INTRODUCIDOS POR USUARIA

  const handleClick = (ev) => {
    ev.preventDefault();
    //Data quédate con lo que tienes y añade lo que esté en newquote
    setData([...data, newquote]);
    //Para que el input se quede otra vez vacío
    setNewQuote({
      quote: '',
      character: '',
    });
  };

  //GUARDAR EL VALOR DEL INPUT, DE FILTRAR POR FRASE
  const handleSearch = (ev) => {
    setsearch(ev.target.value);
  };

  //RENDERIZAR LISTA
  const htmlData = data

    .filter((oneQuote) =>
      oneQuote.quote.toLocaleLowerCase().includes(search.toLowerCase())
    )

    .map((phrase, index) => {
      return (
        <li key={index}>
          <p>{phrase.quote}</p>
          <p>{phrase.character}</p>
        </li>
      );
    });

  return (
    <>
      <header>
        <h1> Frases de Friends</h1>
        <form>
          <label htmlFor="search">Filtrar por frase</label>
          <input
            type="search"
            name="search"
            //Controlo el valor del input y creo función que gaurde el valor de la usuaria
            value={search}
            onChange={handleSearch}
          ></input>
          {/* <label htmlFor="search">Filtrar por personaje</label>
          <input type="search" name="search"></input> */}
        </form>
      </header>
      <main>
        <ul>{htmlData}</ul>
        <form onSubmit={handleSubmit}>
          <h3>Añadir una nueva frase</h3>
          <label htmlFor="quote">Añade tu frase favorita:</label>
          <input
            type="text"
            name="quote"
            placeholder="Escribe tu frase"
            onChange={handleNewQuote}
            value={newquote.quote}
          ></input>
          <label htmlFor="character">¿Qué personaje dijo esta frase?</label>
          <input
            type="text"
            name="character"
            placeholder="Personaje"
            onChange={handleNewQuote}
            value={newquote.character}
          ></input>
          <button type="button" onClick={handleClick}>
            Añadir
          </button>
        </form>
      </main>
    </>
  );
}

export default App;

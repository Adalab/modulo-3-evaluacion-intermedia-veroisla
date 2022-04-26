import '../styles/App.scss';
import friends from '../data/friends.json';
import { useState } from 'react';

function App() {
  //ESTADOS, data, nuevaTarjeta, búsqueda por frase y búsqueda por personaje

  const [data, setData] = useState(friends);
  const [newquote, setNewQuote] = useState({
    quote: '',
    character: '',
  });
  const [search, setsearch] = useState('');
  const [searchByName, setSearchByName] = useState('');

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

  //GUARDAR EL VALOR DEL INPUT, FILTRAR POR PERSONAJE

  const handleSearchByName = (ev) => {
    setSearchByName(ev.target.value);
  };

  //RENDERIZAR LISTA
  const htmlData = data

    .filter((oneQuote) =>
      oneQuote.quote.toLocaleLowerCase().includes(search.toLowerCase())
    )

    .filter((oneQuote) =>
      oneQuote.character.toLowerCase().includes(searchByName.toLowerCase())
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
            //Controlo el valor del input y creo función que guarde el valor de la usuaria
            value={search}
            onChange={handleSearch}
          ></input>
          <label htmlFor="searchByName">Filtrar por personaje</label>
          <select
            name="searchByName"
            value={searchByName}
            onChange={handleSearchByName}
          >
            <option value="">Todos</option>
            <option value="Ross">Ross</option>
            <option value="Monica">Monica</option>
            <option value="Joey">Joey</option>
            <option value="Phoebe">Phoebe</option>
            <option value="Chandler">Chandler</option>
            <option value="Rachel">Rachel</option>
          </select>
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

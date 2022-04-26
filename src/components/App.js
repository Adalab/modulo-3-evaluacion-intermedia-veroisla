import '../styles/App.scss';
import friends from '../data/friends.json';
import { useState } from 'react';

function App() {
  //ESTADOS

  const [data, setData] = useState(friends);

  //PARA CREAR NUEVA TARJETA
  const [newquote, setNewQuote] = useState({
    quote: '',
    character: '',
  });

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

  //BOTÓN AÑADIR

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

  //RENDERIZAR LISTA
  const htmlData = data.map((phrase, index) => {
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
      </header>
      <main>
        <ul>{htmlData}</ul>
        <form onSubmit={handleSubmit}>
          <h3>Añadir una nueva frase</h3>
          <label htmlFor="quote">Frase</label>
          <input
            type="text"
            name="quote"
            placeholder="Busca tu frase preferida!"
            onChange={handleNewQuote}
            value={newquote.quote}
          ></input>
          <label htmlFor="character">Personaje</label>
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

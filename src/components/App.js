import '../styles/App.scss';
import friends from '../data/friends.json';
import { useEffect, useState } from 'react';

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

  //AÑADIR TARJETA

  const handleNewQuote = (ev) => {
    setNewQuote({
      ...newquote,
      [ev.target.name]: ev.target.value,
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
          <button type="button">Añadir</button>
        </form>
      </main>
    </>
  );
}

export default App;

import '../styles/App.scss';
// import friends from '../data/friends.json';
import { useEffect, useState } from 'react';
import titleFriends from '../images/title.png';
import getQuotes from '../services/fetch';
import localStorage from '../services/localStorage';

function App() {
  // useEffect(
  //   () =>
  //     getQuotes().then((datafromApi) => {
  //       setData(datafromApi);
  //     }),
  //   []
  // );

  //ESTADOS, data, nuevaTarjeta, búsqueda por frase y búsqueda por personaje

  const [data, setData] = useState(localStorage.get('data', [])); //dame lo que tienes en el LS, y si no tienes nada dame un array vacio
  const [newquote, setNewQuote] = useState({
    quote: '',
    character: '',
  });
  const [search, setsearch] = useState('');
  const [searchByName, setSearchByName] = useState('');

  useEffect(() => {
    if (data.length === 0) {
      // si data es igual 0 (no hay nada en el LS), entonces te llamo a la api, y si no te cojo lo del LS
      getQuotes().then((datafromApi) => {
        localStorage.set('data', datafromApi);
        setData(datafromApi);
      });
    }
  }, []);

  //FUNCIONES

  //-PREVENIR ENVÍO POR DEFECTO FORM
  const handleSubmit = (ev) => {
    ev.preventDefault();
  };

  //-AÑADIR NUEVOS DATOS
  const handleNewQuote = (ev) => {
    setNewQuote({
      ...newquote,
      [ev.target.name]: ev.target.value,
    });
  };

  //-BOTÓN AÑADIR / PINTAR DATOS INTRODUCIDOS POR USUARIA

  const handleClick = (ev) => {
    ev.preventDefault(); //Data quédate con lo que tienes y añade lo que esté en newquote
    const newTarget = [...data, newquote]; //creo un listado de tarjetas
    localStorage.set('data', newTarget); //gaurdo ese listado en el LS
    setData(newTarget); //Actualiza mi variable data, con los datos de newTarget.

    setNewQuote({
      //Para que el input se quede otra vez vacío
      quote: '',
      character: '',
    });
  };

  //-GUARDAR EL VALOR DEL INPUT, DE FILTRAR POR FRASE
  const handleSearch = (ev) => {
    setsearch(ev.target.value);
  };

  //-GUARDAR EL VALOR DEL INPUT, FILTRAR POR PERSONAJE

  const handleSearchByName = (ev) => {
    setSearchByName(ev.target.value);
  };

  //-RENDERIZAR LISTA
  const htmlData = data

    .filter((oneQuote) =>
      oneQuote.quote.toLocaleLowerCase().includes(search.toLowerCase())
    )

    .filter((oneQuote) =>
      oneQuote.character.toLowerCase().includes(searchByName.toLowerCase())
    )

    .map((phrase, index) => {
      return (
        <li key={index} className="target">
          <p className="target__quote">
            {phrase.quote}
            <span className="target__line"> -</span>
          </p>
          <p className="target__character">{phrase.character}</p>
        </li>
      );
    });

  return (
    <>
      <div className="wrapper">
        <header className="header">
          <h1>
            <img
              className="header__title"
              alt="friends title"
              src={titleFriends}
            />
          </h1>

          <form className="header__form">
            <label htmlFor="search" className="label">
              Filtrar por frase
            </label>
            <input
              className="input"
              type="search"
              name="search"
              //Controlo el valor del input y creo función que guarde el valor de la usuaria
              value={search}
              onChange={handleSearch}
            ></input>
            <label htmlFor="searchByName" className="label">
              Filtrar por personaje
            </label>
            <select
              name="searchByName"
              value={searchByName}
              onChange={handleSearchByName}
              className="input input__cursor"
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

        <main className="main">
          <ul className="target__ul">{htmlData}</ul>
          <form onSubmit={handleSubmit} className="form">
            <h3 className="newQuote">Añadir una nueva frase</h3>
            <div className="newQuote__inputs">
              <label htmlFor="quote" className="label">
                Añade tu frase favorita:
              </label>
              <input
                type="text"
                name="quote"
                placeholder="Escribe tu frase"
                onChange={handleNewQuote}
                value={newquote.quote}
                className="input"
              ></input>
              <label htmlFor="character" className="label">
                ¿Qué personaje dijo esta frase?
              </label>
              <input
                type="text"
                name="character"
                placeholder="Personaje"
                onChange={handleNewQuote}
                value={newquote.character}
                className="input"
              ></input>
            </div>
            <button
              type="button"
              onClick={handleClick}
              className="newQuote__button"
            >
              Añadir una frase
            </button>
          </form>
        </main>
      </div>
    </>
  );
}

export default App;

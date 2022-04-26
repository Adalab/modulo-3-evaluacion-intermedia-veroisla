import '../styles/App.scss';
import friends from '../data/friends.json';
import { useEffect, useState } from 'react';

function App() {
  //ESTADOS

  const [data, setData] = useState(friends);

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
      </main>
    </>
  );
}

export default App;

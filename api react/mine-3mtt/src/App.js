// src/App.js
import React, { useEffect, useState } from 'react';
import ListComponent from './components/ListComponent';

const App = () => {
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('https://rickandmortyapi.com/api/character')
      .then((res) => {
        if (!res.ok) {
          throw new Error('Failed to fetch characters');
        }
        return res.json();
      })
      .then((data) => {
        setCharacters(data.results);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p style={{ color: 'red' }}>Error: {error}</p>;

  return (
    <div>
      <h1>Rick and Morty Characters</h1>
      <ListComponent
        items={characters}
        renderItem={(character) => (
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <img
              src={character.image}
              alt={character.name}
              style={{ width: '50px', borderRadius: '50%' }}
            />
            <div>
              <strong>{character.name}</strong> <br />
              <small>{character.species} — {character.status}</small>
            </div>
          </div>
        )}
      />
    </div>
  );
};

export default App;

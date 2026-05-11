import { useState, useEffect } from 'react';
import { fetchThingsToDo } from '../api/nps';

const useThingsToDo = (parkCode) => {
  const [thingsToDo, setThingsToDo] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!parkCode) return;

    const load = async () => {
      try {
        setLoading(true);
        const data = await fetchThingsToDo(parkCode);
        setThingsToDo(data);
      } catch (err) {
        console.error('useThingsToDo:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [parkCode]); // re-fetches if parkCode changes

  return { thingsToDo, loading, error };
};

export default useThingsToDo;
import { useState, useEffect } from 'react';
import { fetchAllParks } from '../api/nps';

/**
 * Fetches all NPS parks once on mount.
 * @returns {{ parks: Array, loading: boolean, error: string|null }}
 */
const useParks = () => {
  const [parks, setParks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const load = async () => {
      try {
        const data = await fetchAllParks();
        setParks(data);
      } catch (err) {
        console.error('useParks:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  return { parks, loading, error };
};

export default useParks;
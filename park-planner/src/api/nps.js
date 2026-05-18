const NPS_API_KEY = import.meta.env.VITE_NPS_API_KEY;
const NPS_BASE_URL = 'https://developer.nps.gov/api/v1';

/**
 * Base fetch wrapper — handles errors and returns parsed JSON data array.
 * @param {string} endpoint  - e.g. '/parks', '/activities/parks'
 * @param {URLSearchParams|object} params - query params (api_key added automatically)
 */
const npsFetch = async (endpoint, params = {}) => {
  const url = new URL(`${NPS_BASE_URL}${endpoint}`);
  Object.entries(params).forEach(([k, v]) => url.searchParams.set(k, v));
  url.searchParams.set('api_key', NPS_API_KEY);

  const res = await fetch(url.toString(), {
    headers: { accept: 'application/json' },
  });

  if (!res.ok) throw new Error(`NPS API error ${res.status}: ${res.statusText}`);
  return res.json(); // returns full response: { total, limit, start, data: [...] }
};

/**
 * Fetches every park in one request by first reading the total count.
 * @returns {Promise<Array>} array of park objects
 */
//Checking how many parks exist then setting the limit so we don't miss additions.
export const fetchAllParks = async () => {
  const { total } = await npsFetch('/parks', { limit: 1 });
  const { data } = await npsFetch('/parks', { limit: total, start: 0 });
  return data;
};

/**
 * Fetches things to do, optionally filtered by park code.
 * @param {string} [parkCode] - e.g. 'yose', 'grca'
 * @returns {Promise<Array>}
 */
export const fetchThingsToDo = async (parkCode = '') => {
  const params = { limit: 500, start: 0 };
  if (parkCode) params.parkCode = parkCode;
  const { data } = await npsFetch('/thingstodo', params);
  return data;
};

// /**
//  * Fetches campgrounds, optionally filtered by park code.
//  * @param {string} [parkCode]
//  * @returns {Promise<Array>}
//  */
// export const fetchCampgrounds = async (parkCode = '') => {
//   const params = { limit: 500, start: 0 };
//   if (parkCode) params.parkCode = parkCode;
//   const { data } = await npsFetch('/campgrounds', params);
//   return data;
// };

// /**
//  * Fetches entrance fees for a specific park.
//  * Fees are embedded in the park object — this is a convenience wrapper.
//  * @param {string} parkCode
//  * @returns {Promise<Array>} array of fee objects
//  */
// export const fetchParkFees = async (parkCode) => {
//   const { data } = await npsFetch('/parks', { parkCode, fields: 'entranceFees' });
//   return data[0]?.entranceFees ?? [];
// };
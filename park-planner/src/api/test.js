import { fetchAllParks } from './nps';

const test = async () => {
  const parks = await fetchAllParks();
  console.log('Total parks:', parks.length);
  console.log('First park:', parks[0]);
}

test();
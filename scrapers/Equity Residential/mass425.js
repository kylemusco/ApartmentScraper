const Equity = require('../equity');

const url = 'https://www.equityapartments.com/washington-dc/gallery-place-mt-vernon-triangle/425-mass-apartments##unit-availability-tile';
const name = '425 Mass Apartments';

module.exports = new Equity(name, url);
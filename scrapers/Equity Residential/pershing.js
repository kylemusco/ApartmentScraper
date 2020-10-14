const Equity = require('../equity');

const url = 'https://www.equityapartments.com/arlington/courthouse/2201-pershing-apartments##unit-availability-tile';
const name = '2201 Pershing Apartments';

module.exports = new Equity(name, url);
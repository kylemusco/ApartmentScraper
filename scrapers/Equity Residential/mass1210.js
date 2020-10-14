const Equity = require('../equity');

const url = 'https://www.equityapartments.com/washington-dc/northwest-dc/1210-mass-apartments##unit-availability-tile';
const name = '1210 Mass Apartments';

module.exports = new Equity(name, url);
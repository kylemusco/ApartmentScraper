const Equity = require('../equity');

const url = 'https://www.equityapartments.com/arlington/rosslyn/1800-oak-apartments##unit-availability-tile';
const name = '1800 Oak Apartments';

module.exports = new Equity(name, url);
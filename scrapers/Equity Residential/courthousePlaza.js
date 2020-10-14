const Equity = require('../equity');

const url = 'https://www.equityapartments.com/arlington/courthouse/courthouse-plaza-apartments##unit-availability-tile';
const name = 'Courthouse Plaza';

module.exports = new Equity(name, url);
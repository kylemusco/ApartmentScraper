const Equity = require('../equity');

const url = 'https://www.equityapartments.com/arlington/courthouse/sheffield-court-apartments##unit-availability-tile';
const name = 'Sheffield Court';

module.exports = new Equity(name, url);
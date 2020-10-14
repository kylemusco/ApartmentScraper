const Equity = require('../equity');

const url = 'https://www.equityapartments.com/arlington/courthouse/the-prime-at-arlington-courthouse-apartments##unit-availability-tile';
const name = 'The Prime';

module.exports = new Equity(name, url);
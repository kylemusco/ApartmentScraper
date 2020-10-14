const Equity = require('../equity');

const url = 'https://www.equityapartments.com/washington-dc/noma/100k-apartments##unit-availability-tile';
const name = '100k Apartments';

module.exports = new Equity(name, url);
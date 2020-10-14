const Equity = require('../equity');

const url = 'https://www.equityapartments.com/washington-dc/georgetown/2400-m-apartments##unit-availability-tile';
const name = '2400 M Apartments';

module.exports = new Equity(name, url);
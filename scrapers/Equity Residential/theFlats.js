const Equity = require('../equity');

const url = 'https://www.equityapartments.com/washington-dc/dupont-circle/the-flats-at-dupont-circle-apartments##unit-availability-tile';
const name = 'The Flats at Dupont Circle Apartments';

module.exports = new Equity(name, url);
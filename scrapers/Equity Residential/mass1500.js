const Equity = require('../equity');

const url = 'https://www.equityapartments.com/washington-dc/dupont-circle/1500-mass-apartments##unit-availability-tile';
const name = '1500 Mass Apartments';

module.exports = new Equity(name, url);
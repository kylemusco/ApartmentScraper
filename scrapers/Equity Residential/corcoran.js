const Equity = require('../equity');

const url = 'https://www.equityapartments.com/washington-dc/dupont-circle/corcoran-house-at-dupont-circle-apartments##unit-availability-tile';
const name = 'Corcoran House at Dupont Circle Apartments';

module.exports = new Equity(name, url);
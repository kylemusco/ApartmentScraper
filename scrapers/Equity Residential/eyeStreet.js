const Equity = require('../equity');

const url = 'https://www.equityapartments.com/washington-dc/mt-vernon-triangle/455-eye-street-apartments##unit-availability-tile';
const name = '455 Eye Street Apartments';

module.exports = new Equity(name, url);
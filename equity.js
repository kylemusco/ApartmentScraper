require('babel-register');
require('babel-polyfill');

const {runScraper} = require('./scrapers/index');

runScraper();

// const Equity = require('./scrapers/equity');

// const COURTHOUSE_URL = 'https://www.equityapartments.com/arlington/courthouse/courthouse-plaza-apartments##unit-availability-tile';

// let courthouse = new Equity('Courthouse Plaza 2',COURTHOUSE_URL);

// courthouse.getListings();
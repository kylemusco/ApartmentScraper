// This is needed for 'import' notation in dependencies
require('babel-register');
require('babel-polyfill');

const sqft          = require('../analytics/sqft');
const roomData      = require('./data/truncatedData');
const expect        = require('chai').expect;

describe('Average Price', () => {
    it('Calculates average price for all floors', () => {
       // Price / Size = $ per sqft
       // 2033 / 710 = 2.863
       // 2065 / 674 = 3.064
       // 2085 / 710 = 2.937
       // 2033 / 710 = 2.863
       // 2065 / 674 = 3.064
       // 2085 / 710 = 2.937
       // 2085 / 704 = 2.962
       // 2085 / 707 = 2.949
       // 2097 / 707 = 2.966

       // Sum = 26.605
       // Avg = 26.605 / 9 = 2.956

       expect(sqft.averagePrice(roomData)).to.equal(2.96);
    });

    it('Calculates average price for single floor', () => {
        // Floor 1
        // 2085 / 704 = 2.962

        expect(sqft.averagePrice(roomData, 1)).to.equal(2.96);
    });

    it('Calculates average price for range of floors', () => {
        // Floors 1-3
        // 2085 / 710 = 2.937
        // 2085 / 710 = 2.937
        // 2085 / 704 = 2.962
        // 2085 / 707 = 2.949

        // Sum = 11.785
        // Avg = 11.785 / 4 = 2.946

        expect(sqft.averagePrice(roomData, 1, 3)).to.equal(2.95);
    });
});
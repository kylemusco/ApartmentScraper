// This is needed for 'import' notation in dependencies
require('babel-register');
require('babel-polyfill');

const utils       = require('../services/utilities');
const expect      = require('chai').expect;
const roomData    = require('./data/truncatedData');

describe('Utilities', () => {
    describe('Combine listings', () => {
      it('Combines 3 days of room data', () => {
        // Expected result
        const combinedListings = [
          {
              "price": 2033,
              "beds": 1,
              "baths": 1,
              "size": 710,
              "floor": 7,
              "image": "4066-FP-5021-1-1-710.png"
          },{
              "price": 2065,
              "beds": 1,
              "baths": 1,
              "size": 674,
              "floor": 10,
              "image": "4066-FP-5013-1-1-674.png"
          },{
              "price": 2085,
              "beds": 1,
              "baths": 1,
              "size": 710,
              "floor": 2,
              "image": "4066-FP-5021-1-1-710.png"
          },{
              "price": 2033,
              "beds": 1,
              "baths": 1,
              "size": 710,
              "floor": 7,
              "image": "4066-FP-5021-1-1-710.png"
            },{
              "price": 2065,
              "beds": 1,
              "baths": 1,
              "size": 674,
              "floor": 10,
              "image": "4066-FP-5013-1-1-674.png"
            },{
              "price": 2085,
              "beds": 1,
              "baths": 1,
              "size": 710,
              "floor": 2,
              "image": "4066-FP-5021-1-1-710.png"
            },{
              "price": 2085,
              "beds": 1,
              "baths": 1,
              "size": 704,
              "floor": 1,
              "image": "4066-FP-5018-1-1-704.png"
            },{
              "price": 2085,
              "beds": 1,
              "baths": 1,
              "size": 707,
              "floor": 3,
              "image": "4066-FP-5020-1-1-707.png"
            },{
              "price": 2097,
              "beds": 1,
              "baths": 1,
              "size": 707,
              "floor": 4,
              "image": "4066-FP-5020-1-1-707.png"
            }
        ];

        expect(utils.combineListings(roomData)).to.eql(combinedListings);
      });

      it('Returns empty array if data is undefined', () => {
        expect(utils.combineListings()).to.eql([]);
      });
    });

    describe('Separate by floors', () => {
      it('Separates listing data by floors', () => {
          // Expected result
          const floors = {
              1: [
                  {
                      "price": 2085,
                      "beds": 1,
                      "baths": 1,
                      "size": 704,
                      "floor": 1,
                      "image": "4066-FP-5018-1-1-704.png"
                  }
              ],
              2: [
                  {
                      "price": 2085,
                      "beds": 1,
                      "baths": 1,
                      "size": 710,
                      "floor": 2,
                      "image": "4066-FP-5021-1-1-710.png"
                  },
                  {
                    "price": 2085,
                    "beds": 1,
                    "baths": 1,
                    "size": 710,
                    "floor": 2,
                    "image": "4066-FP-5021-1-1-710.png"
                }
              ],
              3: [
                  {
                      "price": 2085,
                      "beds": 1,
                      "baths": 1,
                      "size": 707,
                      "floor": 3,
                      "image": "4066-FP-5020-1-1-707.png"
                  }
              ],
              4: [
                {
                    "price": 2097,
                    "beds": 1,
                    "baths": 1,
                    "size": 707,
                    "floor": 4,
                    "image": "4066-FP-5020-1-1-707.png"
                }
              ],
              7: [
                  {
                      "price": 2033,
                      "beds": 1,
                      "baths": 1,
                      "size": 710,
                      "floor": 7,
                      "image": "4066-FP-5021-1-1-710.png"
                  },
                  {
                    "price": 2033,
                    "beds": 1,
                    "baths": 1,
                    "size": 710,
                    "floor": 7,
                    "image": "4066-FP-5021-1-1-710.png"
                }
              ],
              10: [
                {
                    "price": 2065,
                    "beds": 1,
                    "baths": 1,
                    "size": 674,
                    "floor": 10,
                    "image": "4066-FP-5013-1-1-674.png"
                },
                {
                  "price": 2065,
                  "beds": 1,
                  "baths": 1,
                  "size": 674,
                  "floor": 10,
                  "image": "4066-FP-5013-1-1-674.png"
              }
              ]
          };

          const listings = utils.combineListings(roomData);

          expect(utils.separateByFloor(listings)).to.eql(floors);
      });

      it('Returns empty object when passed empty array', () => {
        expect(utils.separateByFloor([])).to.eql({});
      });

      it('Returns empty object when passed undefined array', () => {
        expect(utils.separateByFloor()).to.eql({});
      });
    });
});
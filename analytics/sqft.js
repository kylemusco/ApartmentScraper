import utils from '../services/utilities';

class SQFT {
    constructor() {}

    // Returns average price per square foot for floor range
    // Uses:
    //  averagePrice()     Returns average for all floors
    //  averagePrice(0,3)  Returns average for floors 0 through 3
    //  averagePrice(3)    Returns average for floor 3
    averagePrice(roomData, startFloor, endFloor, room) {
        try {
            // All floors
            let listings = utils.combineListings(roomData);

            // Filter out range
            if( startFloor !== undefined && endFloor !== undefined ) {
                listings = listings.filter( listing => listing.floor >= startFloor && listing.floor <= endFloor);

            // Filter out single floor
            } else if( startFloor !== undefined ) {
                listings = listings.filter( listing => listing.floor === startFloor );
            }

            // Filter out room id
            if( room !== undefined ) {
                listings = listings.filter( listing => listing.image.includes(room) )
            }

            if( listings === undefined || listings.size === 0 ) return -1;

            let sum = 0;
            for( const listing of listings ) {
                // Price / Size = $ per sqft
                sum += (listing.price / listing.size);
            }

            return parseFloat(Number.parseFloat(sum/listings.length).toFixed(2));

        } catch(err) {
            console.error(err);
            return -1;
        }
    }

    // Returns average square footage
    averageSize(roomData, startFloor, endFloor) {

    }
}

module.exports = new SQFT();
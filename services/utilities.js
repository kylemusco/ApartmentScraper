class Utilities {

    // Takes array of daily listings and combines into single array
    combineListings(data) {
        if( data === undefined ) return [];

        let listings = [];
        for( const day of data ) {
            listings = listings.concat(day.listings);
        }

        return listings;
    }

    // Takes array of room listings and returns object defined as:
    // {
    //     1: [],
    //     2: [],
    //     3: [],
    //     etc...
    // }
    separateByFloor(listings) {
        if( listings === undefined ) return {};

        let floors = {};
        for( const listing of listings ) {
            if( listing.floor in floors ) {
                floors[listing.floor] = floors[listing.floor].concat(listing);
            } else {
                floors[listing.floor] = [listing];
            }
        }

        return floors;
    }
}

module.exports = new Utilities();
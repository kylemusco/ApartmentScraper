class Graph {
    constructor() {}

    // Returns object where date is key and price is value
    pricesForRoom(roomData, floor, roomId) {
        try {
            let prices = {};

            // Iterates through each day
            for( const entry of roomData ) {

                // Filter out roomId and floor
                let listings = entry.listings.filter(listing => listing.image.includes(roomId) && listing.floor === floor);

                if( listings.length > 0 ) {
                    if( entry.time === undefined ) {
                        console.log(entry);
                    }

                    // Remove time from datetime
                    

                    prices[entry.time] = listings[0].price;
                }
            }

            return prices;
 
        } catch(err) {
            console.error(err);
        }
    }

    vacancies(roomData) {
        let vacancies = {}

        for( const listing of roomData ) {
            if(listing.time) {
                vacancies[listing.time] = listing.listings.length;
            }
        }

        return vacancies;
    }
}

module.exports = new Graph();
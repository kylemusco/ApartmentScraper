import request  from 'request-promise';
import cheerio  from 'cheerio';
import moment   from 'moment';
import mongo    from '../services/mongo';

class Dittmar {
    constructor(name, url) {
        this.name = name;
        this.url = url;
    }

    async getListings() {
        // Grab HTML from Courthouse Plaza site
        const html = await request({
            uri: this.url,
            rejectUnauthorized: false
        });

        let listings = [];

        // Load site into cheerio
        let $ = cheerio.load(html);

        // Get room listings by type (Studio, 1bed, 2bed, 3bed)
        $('.fp-group-list').each((i,el) => {
            // Get rooms for room type
            const rooms = $(el).find('.fp-group-item');
            rooms.each((i,el) => {
                let listing = {
                    price: this.parsePrice($(el).find('.rent').find('.fp-col-text').html()),
                    beds: this.parseBeds($(el).find('.bed-bath').find('.fp-col-text').html()),
                    size: this.parseSqft($(el).find('.sq-feet').find('.fp-col-text').html()),
                    image: this.parseImage($(el).find('.image-link').html())
                }
                
                listings.push(listing);
            });
        });

        // Create listing object
        const listing = {
            time: moment().format(),
            listings: listings
        };

        await mongo.update({name: this.name}, { $push: {'queries': listing }});

        console.log(`${moment(new Date()).format("YYYY-MM-DDThh:mm:ss")}: Updated ${this.name}`);
    }

    parsePrice(price) {
        const split = price.split('$');
        return parseInt(split[1].replace(',','').replace('/month',''));
    }

    parseBeds(html) {
        const split = html.split('<');
        return parseInt(split[0].replace('Studio&#xA0;/ 1','0'));
    }

    parseSqft(html) {
        const split = html.split('<');
        return parseInt(split[0]);
    }

    parseImage(html) {
        let split = html.split('<img src="');
        split = split[1].split('" alt');
        return split[0];
    }
}

module.exports = Dittmar;
import request  from 'request-promise';
import cheerio  from 'cheerio';
import fs       from 'fs';
import moment   from 'moment';
import mongo    from '../services/mongo';

class Equity {
    constructor(name, url) {
        this.name = name;
        this.url = url;
    }

    async getListings() {
        // Grab HTML from Courthouse Plaza site
        const html = await request(this.url);

        let listings = [];

        // Load site into cheerio
        let $ = cheerio.load(html);

        // Get room listings 
        $('div.unit-expanded-card').each((i,el)=> {
            let details = $(el).find('.specs');
            let image = $(el).find('img').attr('src');
            this.getImage(image);

            let listing = {
                price:  this.parsePrice(details.find('.pricing').html()),
                beds:   this.getNumber(details.children().eq(1).html(), 0),
                baths:  this.getNumber(details.children().eq(1).html(), 1),
                size:   this.getNumber(details.children().eq(2).html(), 0),
                floor:  this.getNumber(details.children().eq(2).html(), 1),
                image:  this.getFilename(image)
            }

            listings.push(listing);
        });

        // Create listing object
        let listing = {
            time: moment().format(),
            listings: listings
        };

        await mongo.update({name: this.name}, { $push: {'queries' :listing }});

        console.log(`${moment(new Date()).format("YYYY-MM-DDThh:mm:ss")}: Updated ${this.name}`);
    }

    parsePrice(price) {
        return parseFloat(price.replace('$','').replace(',',''));
    }

    getNumber(str, index) {
        let matches = str.match(/[0-9]+/g);
        let num = matches !== null ? parseInt(matches[index]) : 0;

        return isNaN(num)? -1 : num
    }

    getFilename(url) {
        return url.split('/')[url.split('/').length-1].split('.')[0] + '.png';
    }

    getImage(url) {
        let filepath = `${__dirname}/../images/${this.getFilename(url)}`;
    
        if(!fs.existsSync(filepath)) {
            request(url).pipe(fs.createWriteStream(filepath));
        }
    }
}

module.exports = Equity;
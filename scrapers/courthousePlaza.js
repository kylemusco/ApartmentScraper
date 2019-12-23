import request  from 'request-promise';
import cheerio  from 'cheerio';
import fs       from 'fs';
import moment   from 'moment';
import mongo    from '../services/mongo';

const COURTHOUSE_URL = 'https://www.equityapartments.com/arlington/courthouse/courthouse-plaza-apartments##unit-availability-tile';

const getCourthousePlaza = async () => {
    // Grab HTML from Courthouse Plaza site
    //const html = await request(COURTHOUSE_URL);
    const html = fs.readFileSync('test.html');

    let listings = [];

    // Load site into cheerio
    let $ = cheerio.load(html);

    // Get room listings 
    $('div.unit-expanded-card').each((i,el)=> {
        let details = $(el).find('.specs');
        let image = $(el).find('img').attr('src');
        getImage(image);

        let listing = {
            price:  parsePrice(details.find('.pricing').html()),
            beds:   getNumber(details.children().eq(1).html(), 0),
            baths:  getNumber(details.children().eq(1).html(), 1),
            size:   getNumber(details.children().eq(2).html(), 0),
            floor:  getNumber(details.children().eq(2).html(), 1),
            image:  getFilename(image)
        }

        listings.push(listing);
    });

    // Create listing object
    let listing = {
        time: moment().format(),
        listings: listings
    };

    mongo.update({name: 'Courthouse Plaza'}, { $push: {'queries' :listing }});
}

const parsePrice = (price) => {
    return parseFloat(price.replace('$','').replace(',',''));
}

const getNumber = (str, index) => {
    let matches = str.match(/[0-9]+/g);
    return matches !== null ? parseInt(matches[index]) : 0
}

const getFilename = (url) => {
    return url.split('/')[url.split('/').length-1].split('.')[0] + '.png';
}

const getImage = (url) => {
    let filepath = __dirname + '/../images/' + getFilename(url);

    if(!fs.existsSync(filepath)) {
        request(url).pipe(fs.createWriteStream(filepath));
    }
}

export default getCourthousePlaza;
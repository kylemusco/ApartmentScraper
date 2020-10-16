import express          from 'express';
import bodyParser       from 'body-parser';
import helmet           from 'helmet';
import {runScraper}     from './scrapers';
import {SIZE_LIMIT} from './configs';
import schedule from 'node-schedule';
import mongo    from './services/mongo';

// Analytics
import sqft from './analytics/sqft';
import graph from './analytics/graph';

// Run scraper everyday at midnight
schedule.scheduleJob('0 0 * * *', () => { runScraper(); })

const app = express();
app.set('json spaces', 2);
app.use(helmet());
app.use(bodyParser.urlencoded({ limit: SIZE_LIMIT, extended: true }));
app.use(bodyParser.json({ limit: SIZE_LIMIT }));

// Main route: Displays price data
app.get('/', async (req,res) => {
    let listings = await mongo.find({});
   
   res.send(listings);
});

// Return sqft pricing data
app.get('/analytics/:building', async (req,res) => {
    let building = req.params.building || 'Courthouse Plaza';

    let listings = await mongo.find({name: building});
    if(listings.length === 0) {
        return res.status(404).send(`${building} not found`);
    }

    listings = listings[0].queries;

    // Layout that matches my own
    let roomId = '4066-FP-5018-1-1-704';
    
    const results = {
        //'ourRoom': sqft.averagePrice(courthousePlazaData, 3, undefined, roomId) * 704,
        // 'priceRange': graph.pricesForRoom(courthousePlazaData, 3, roomId),
        'vacancies': graph.vacancies(listings),
        'listings': listings
    };

    res.send(results);
});

app.get('/scrape', (req,res) => {
    runScraper();
    res.send(200);
});
    
app.listen(3000);



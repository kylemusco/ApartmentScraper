import express          from 'express';
import bodyParser       from 'body-parser';
import helmet           from 'helmet';
import {runScraper}     from './scrapers';
import {SIZE_LIMIT} from './configs';
import schedule from 'node-schedule';
import mongo    from './services/mongo';

const app = express();

// Run scraper everyday at midnight
schedule.scheduleJob('0 0 * * *', () => { runScraper(); })

app.set('json spaces', 2);
app.use(helmet());
app.use(bodyParser.urlencoded({ limit: SIZE_LIMIT, extended: true }));
app.use(bodyParser.json({ limit: SIZE_LIMIT }));
    
// Main route: Displays price data
app.get('/', async (req,res) => {
    let results = await mongo.find({name: 'Courthouse Plaza'});

    res.send(results);
});

app.get('/scrape', (req,res) => {
    runScraper();
    res.send(200);
});
    
app.listen(3000);



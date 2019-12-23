import express from 'express';
import bodyParser from 'body-parser';
import helmet from 'helmet';
import {runScraper} from './scrapers';
import {SIZE_LIMIT} from './configs';

const app = express();

const dailyScrape = setInterval(
    runScraper, 86400000
);

app.set('json spaces', 2);
app.use(helmet());
app.use(bodyParser.urlencoded({ limit: SIZE_LIMIT, extended: true }));
app.use(bodyParser.json({ limit: SIZE_LIMIT }));
    
// Main route: Displays price data
app.get('/', (req,res) => {
    runScraper();
    
    res.send(200);
});
    
app.listen(3000);



// Arlington
import CourthousePlaza from './Equity Residential/courthousePlaza';
import Wilson from './Equity Residential/wilson';
import SheffieldCourt from './Equity Residential/sheffieldCourt';
import Pershing from './Equity Residential/pershing';
import ThePrime from './Equity Residential/thePrime';
import Oak from './Equity Residential/oak';

// Washington DC
import EyeStreet from './Equity Residential/eyeStreet';
import Mass425 from './Equity Residential/mass425';
import Mass1210 from './Equity Residential/mass1210';
import Mass1500 from './Equity Residential/mass1500';
import k100 from './Equity Residential/100k';
import theFlats from './Equity Residential/theFlats';
import M from './Equity Residential/m';


const runScraper = async () => {
    // Equity Residential apartments

    // Arlington
    await CourthousePlaza.getListings();
    await Wilson.getListings();
    await SheffieldCourt.getListings();
    await Pershing.getListings();
    await ThePrime.getListings();
    await Oak.getListings();

    // Washington DC
    await EyeStreet.getListings();
    await Mass425.getListings();
    await Mass1210.getListings();
    await Mass1500.getListings();
    await k100.getListings();
    await theFlats.getListings();
    await M.getListings();

};

export {runScraper};
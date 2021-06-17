const Dittmar = require('../dittmar');

const url = 'https://rentcp.prospectportal.com/arlington-va-apartments/courtland-park/?&is_responsive_snippet=1&snippet_type=website&occupancy_type=1&locale_code=&is_collapsed=0&include_paragraph_content=0&host_domain=www.rentdittmar.com';
const name = 'Courtland Park';

module.exports = new Dittmar(name, url);
const fetch = require('node-fetch');
const cheerio = require('cheerio');

const Zoom = {
    name: 'Zoom',
    baseUrl: "https://www.zoom.com.br/search?q",
    async getProductsByTerm(term){

        try {
            const response = await fetch(`${this.baseUrl}=${term}`);

            const body = await response.text();

            const $ = cheerio.load(body);
            const listOfProducts = [];

            $('div.card.card--prod').each((index, element) => {
            
                const product = {
                    title: $(element).find('a.name').text(),
                    price: $(element).find('span.mainValue').text(),
                    provider: this.name
                }
                listOfProducts.push(product)
            })             
            return listOfProducts
        }catch(err){
            console.log(err);
            return {
                error:true,
                details: err.message
            }
        }
    }
}
module.exports = Zoom;



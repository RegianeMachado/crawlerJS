const fetch = require('node-fetch');
const cheerio = require('cheerio');

const MercadoLivre = {
    name: 'Mercado Livre',
    baseUrl: 'https://lista.mercadolivre.com.br',
    async getProductsByTerm(term){

        try {
            const response = await fetch(`${this.baseUrl}/${term}`);

            const body = await response.text();

            const $ = cheerio.load(body);

            $('ol.ui-search-layout li').each((index, element) => {
                let priceHtml = $(element).find('span.ui-search-price__part').text();

                const listOfProducts = [];

                let product = {
                    title: $(element).find('div.ui-search-item__group--title h2').text(),
                    price: priceHtml.slice(0, priceHtml.lastIndexOf('R$')),
                    provider: this.name
                }
                listOfProducts.push(product)
            })

            return listOfProducts
           
        } catch (err) {
            console.log(err);

            return {
                error: true,
                details: err.message
                } 
         }
        }
    }

module.exports = MercadoLivre;
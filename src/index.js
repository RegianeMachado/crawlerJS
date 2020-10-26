'use strict'
const http = require('http');
const MercadoLivre = require('./services/MercadoLivre');
const Zoom = require('./services/Zoom');
const Cache = require('./utils/cache');

const listServices = [MercadoLivre, Zoom];

const app = http.createServer(async (req, res) => {

    let term = req.url.replace('/', '');

    if(term.length <= 0) {

        res.writeHead(400, {'Content-Type': 'application/json; charset=utf-8'});

        res.write(JSON.stringify("Termo de busca não informado"))
        return res.end()
    }

    const cacheProducts = Cache.getCache(term);

    if(cacheProducts){
        res.writeHead(200, {'Content-Type': 'application/json; charset=utf-8'});
        res.write(cacheProducts)
        return res.end()
    }    
 
    const servico =  listServices.forEach(service => service.getProductsByTerm(term)   );
    const products =  await servico;
 
    if(products.error){
        res.writeHead(503, {'Content-Type': 'application/json; charset=utf-8'});

        res.write(JSON.stringify(products.details))
        return res.end()
    }

    Cache.setCache(term, JSON.stringify(products));

    res.writeHead(200, {'Content-Type': 'application/json; charset=utf-8'});    
    res.write(JSON.stringify(products));

    return res.end()

})

app.listen(3000);
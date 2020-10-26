const http = require('http');
const MercadoLivre = require('./services/MercadoLivre');
const Cache = require('./utils/cache')

const app = http.createServer(async (req, res) => {

    let term = req.url.replace('/', '');

    if(term.length <= 0) {

        res.writeHead(400, {'Content-Type': 'application/json; charset=utf-8'});

        res.write(JSON.stringify("Termo de busca não informado"))
        return res.end()
    }

    const products = await MercadoLivre.getProductsByTerm(term);
    
    if(products.error){
        res.writeHead(503, {'Content-Type': 'application/json; charset=utf-8'});

        res.write(JSON.stringify(products.details))
        return res.end()
    }

    res.writeHead(200, {'Content-Type': 'application/json; charset=utf-8'});

    res.write(JSON.stringify(products))
    return res.end()

})

app.listen(3000);
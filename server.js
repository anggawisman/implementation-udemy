const fs = require('fs'); //file system required
const http = require('http');
const url = require('url');

const tempReplace = require('./modules/tempReplace');




const tempOverview = fs.readFileSync (`${__dirname}/templates/overview.html`, 'utf-8');
const tempProduct = fs.readFileSync (`${__dirname}/templates/product.html`, 'utf-8');
const tempTempProduct = fs.readFileSync (`${__dirname}/templates/temp-product.html`, 'utf-8');

const data = fs.readFileSync(`${__dirname}/data/data.json`, 'utf8');

const dataObj = JSON.parse(data);



const server = http.createServer((req, res) => { 

    const {query, pathname} = url.parse(req.url, true)
    
    
    if (pathname === '/' || pathname === '/overview') {
        res.writeHead(200, {'Content-Type': 'text/html'});
        
        const dataHtml = dataObj.map(el => tempReplace(tempTempProduct, el)).join('');

        const result = tempOverview.replace('{%dataTable%}', dataHtml);        
        
        res.end(result);
        
    } else {
        res.writeHead(404, {
            'Content-type': 'text/html',
            'my-own-header': 'hello-world'

        }); //Sends a response header to the request. The status code is a 3-digit HTTP status code, like 404
        res.end('<h1>Page not found!</h1>');
    }



});


server.listen( 8000, '127.0.0.1', () => {
    console.log('Server running at http://127.0.0.1:8000/');
}); //
//there are core modules
const http = require('http');
const url = require('url'); //ctrl + d to select same name 
const fs = require('fs')
//this is created module
const replaceTemplate = require('../starter/MODULES/replaceTemplate')

//read data from /dev-data/dats.json file
var data = fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8')

var productData = JSON.parse(data)



const overviewHTML = fs.readFileSync(`${__dirname}/templates/overview.html`, 'utf-8')
const templateOverviewCard = fs.readFileSync(`${__dirname}/templates/template-overview.html`, 'utf-8')
const templateProduct = fs.readFileSync(`${__dirname}/templates/template-product.html`, 'utf-8')




const server = http.createServer((request, response) => {

    const {
        query,
        pathname
    } = url.parse(request.url, true)


    //OVERVIEW
    if (pathname === '/overview' || pathname === '/') {

        //load html template-overview
        response.writeHead(200, {
            'Content-type': 'text/html',
            'my-own-header': 'Hello World'
        })
        const cardsHTML = productData.map(product => replaceTemplate(templateOverviewCard, product)).join('')
        //used join to convert array into string
        const output = overviewHTML.replace('{%PRODUCT_CARDS%}', cardsHTML)

        return response.end(output)
    }
    //PRODUCTS
    else if (pathname === "/product/") {
        response.writeHead(200, {
            'Content-type': "text/html",
            'my-own-header': "Hello"
        })
        const product = productData[query.id]
        const output = replaceTemplate(templateProduct, product)
        response.end(output)
    }




    //API
    else if (pathname === "/api") {
        response.writeHead(404, {
            'Content-type': 'application/json',
            'my-own-header': 'Hello world '
        })
        response.end(data)
    }

    //PAGE NOT FOUND
    else {
        response.writeHead(404, {
            'Content-type': 'text/html',
            'my-own-header': 'Hello world '
        }) //first arg takes staus code, 2nd takes header. Header is piece of info about response server is sending 
        response.end('<h1>page not found</h1>')
    }


})

server.listen(3000, '127.0.0.1', () => {
    console.log('server has been started at port 3000')
})


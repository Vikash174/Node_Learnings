import { createServer } from 'http';
import { parse } from 'url';
import { readFileSync } from 'fs';
import slugify from 'slugify';
// const {slugify} = pkg;

import replaceTemplate from './modules/replaceTemplate.js';

const overviewTemplate = readFileSync(
  `./templates/template-overview.html`,
  'utf-8'
);
const productTemplate = readFileSync(
  `./templates/template-product.html`,
  'utf-8'
);
const cardTemplate = readFileSync(`./templates/template-card.html`, 'utf-8');
const data = readFileSync(`./dev-data/data.json`, 'utf-8');
const dataObject = JSON.parse(data);

const slugs = dataObject.map((el) => slugify(el.productName, { lower: true }));
// console.log(slugs);

const server = createServer((req, res) => {
  const { query, pathname } = parse(req.url, true);

  //OverView Page
  if (pathname === '/' || pathname === '/overview') {
    res.writeHead(200, {
      'Content-type': 'text/html',
    });

    const cardsHtml = dataObject
      .map((el) => replaceTemplate(cardTemplate, el))
      .join('');
    const output = overviewTemplate.replace('{%PRODUCT_CARD%}', cardsHtml);
    res.end(output);
  }

  //PRODUCT PAGE
  else if (pathname === '/product') {
    const product = dataObject[query.id];
    const output = replaceTemplate(productTemplate, product);

    res.writeHead(200, {
      'Content-type': 'text/html',
    });
    res.end(output);
  }

  // API PAGE
  else if (pathname === '/api') {
    // console.log(parsedData);
    res.writeHead(200, {
      'Content-type': 'application/json',
    });
    res.end(data);
  }

  // NOT FOUND
  else {
    res.writeHead(404, {
      'Content-type': 'text/html',
    });
    res.end('<h1>Page Not found</h1>');
  }
});

server.listen(8000, '127.0.0.1', () => {
  console.log('Server started listing!!');
});

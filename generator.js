/*eslint no-console: ['error', { allow: ['warn','log'] }] */

var faker = require('./faker.min');
var request = require('request');

(function myLoop (i) {
  setTimeout(function () {

    var options  = {
      method: 'POST',
      url: 'http://localhost:3001/api/book',
      headers: {
        'Postman-Token': 'cc95ed9c-0b96-44f9-9d1f-ea2c59f098eb',
        'Cache-Control': 'no-cache',
        'Content-Type': 'application/json'
      },
      body: {
        'name':faker.fake('{{name.jobTitle}}'),
        'author':faker.fake('{{name.findName}}'),
        'review':faker.fake('{{lorem.sentences}}'),
        'pages':faker.fake('{{random.number}}'),
        'rating':`${i}`,
        'price':faker.fake('{{commerce.price}}'),
        'ownerID': faker.fake('{{random.uuid}}')
      },
      json: true
    };

    console.log(options);

    request(options, function (error, response, body) {
      if (error) {
      throw new Error(error);
      }

      console.log(body);
    });

    if (--i) {
      myLoop(i);
    }
  }, 100);
})(1000);

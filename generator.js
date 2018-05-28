/*eslint no-console: ['error', { allow: ['warn','log'] }] */

var faker = require('./faker.min');
var request = require('request');

var dotCounter = 0;

(function myLoop () {

  setTimeout(function () {

    var options = {
      method: 'POST',
      url: 'http://localhost:3001/api/register',
      headers:
        {'Postman-Token': '70e26f5e-cff8-4a31-89d7-fee00dbfcdc1',
          'Cache-Control': 'no-cache',
          'Content-Type': 'application/json'},
      body:{
        email: faker.fake('{{internet.email}}'),
        password: 'helloworld',
        name: faker.fake('{{name.firstName}}'),
        lastname: faker.fake('{{name.lastName}}')
      },
      json: true
    };

    request(options, function (error, response, body) {
      if (error) {
        throw new Error(error);
      }

      (function myLoop1 () {
        setTimeout(function () {
          var options  = {
            method: 'POST',
            url: 'http://localhost:3001api/book',
            headers: {
              'Postman-Token': 'cc95ed9c-0b96-44f9-9d1f-ea2c59f098eb',
              'Cache-Control': 'no-cache',
              'Content-Type': 'application/json'
            },
            body: {
              'name': faker.fake('{{name.jobTitle}}'),
              'author': faker.fake('{{name.findName}}'),
              'review': faker.fake('{{lorem.sentences}}'),
              'pages': faker.fake('{{random.number}}'),
              'rating': dotCounter,
              'price': faker.fake('{{commerce.price}}'),
              'ownerID': body.userID
            },
            json: true
          };
          console.log(body.userID, 'hell');

          request(options, function (error, response, body1) {
            if (error) {
              throw new Error(error);
            }

            console.log(body1);
          });

          if (dotCounter++ < 1000) {
            myLoop1();
          }
        }, 7000);
      })();

      if (dotCounter++ < 1000) {
        myLoop();
      }

    });

  }, 500);
})();


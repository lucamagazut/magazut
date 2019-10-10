'use strict';

module.exports = function(app) {
  const express = require('express');
  let operatorsRouter = express.Router();

  operatorsRouter.get('/', function(req, res) {
    res.send({
      data:[
        {
          id:0,
          type:'operator',
          attributes:{
            name:'None',
            surname:'None'
          }
        },
        {
          id:1,
          type:'operator',
          attributes:{
            name:'Luca',
            surname:'forgiarini'
          }
        },
        {
          id:2,
          type:'operator',
          attributes:{
            name:'Daniele',
            surname:'carnielutti'
          }
        },
        {
          id:3,
          type:'operator',
          attributes:{
            name:'Marco',
            surname:'caco'
          }
        }
      ]
    });
  });

  operatorsRouter.post('/', function(req, res) {
    res.status(201).end();
  });

  operatorsRouter.get('/:id', function(req, res) {
    res.send({
      'operators': {
        id: req.params.id
      }
    });
  });

  operatorsRouter.put('/:id', function(req, res) {
    res.send({
      'operators': {
        id: req.params.id
      }
    });
  });

  operatorsRouter.delete('/:id', function(req, res) {
    res.status(204).end();
  });

  // The POST and PUT call will not contain a request body
  // because the body-parser is not included by default.
  // To use req.body, run:

  //    npm install --save-dev body-parser

  // After installing, you need to `use` the body-parser for
  // this mock uncommenting the following line:
  //
  //app.use('/api/operators', require('body-parser').json());
  app.use('/api/operators', operatorsRouter);
};

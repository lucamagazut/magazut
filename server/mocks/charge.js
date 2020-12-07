'use strict';

module.exports = function(app) {
  const express = require('express');
  let chargeRouter = express.Router();

  chargeRouter.get('/', function(req, res) {
    var queryObj = req.query;
    // res.status(404).end();
    // return;
    res.send({
      data:[
        {
          id:queryObj.id,
          type:'contraption',
          attributes:{
            available_qt:0,
            orderState:1
          }
        }
      ]
    });
  });

  chargeRouter.post('/', function(req, res) {
    res.status(201).end();
  });

  chargeRouter.get('/:id', function(req, res) {
    res.send({
      'charge': {
        id: req.params.id
      }
    });
  });

  chargeRouter.put('/:id', function(req, res) {
    res.send({
      'charge': {
        id: req.params.id
      }
    });
  });

  chargeRouter.delete('/:id', function(req, res) {
    res.status(204).end();
  });

  // The POST and PUT call will not contain a request body
  // because the body-parser is not included by default.
  // To use req.body, run:

  //    npm install --save-dev body-parser

  // After installing, you need to `use` the body-parser for
  // this mock uncommenting the following line:
  //
  //app.use('/api/charge', require('body-parser').json());
  app.use('/api/charge', chargeRouter);
};

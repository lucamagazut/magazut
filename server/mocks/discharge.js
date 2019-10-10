'use strict';

module.exports = function(app) {
  const express = require('express');
  let dischargeRouter = express.Router();

  dischargeRouter.get('/', function(req, res) {
    var queryObj = req.query;

    res.send({
      data:[
        {
          id:queryObj.id,
          type:'contraption',
          attributes:{
            availableQt:0,
            orderState:1
          }
        }
      ]
    });
  });

  dischargeRouter.post('/', function(req, res) {
    res.status(201).end();
  });

  dischargeRouter.get('/:id', function(req, res) {
    res.send({
      'discharge': {
        id: req.params.id
      }
    });
  });

  dischargeRouter.put('/:id', function(req, res) {
    res.send({
      'discharge': {
        id: req.params.id
      }
    });
  });

  dischargeRouter.delete('/:id', function(req, res) {
    res.status(204).end();
  });

  // The POST and PUT call will not contain a request body
  // because the body-parser is not included by default.
  // To use req.body, run:

  //    npm install --save-dev body-parser

  // After installing, you need to `use` the body-parser for
  // this mock uncommenting the following line:
  //
  //app.use('/api/discharge', require('body-parser').json());
  app.use('/api/discharge', dischargeRouter);
};

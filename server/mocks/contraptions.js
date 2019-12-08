'use strict';

module.exports = function(app) {
  const express = require('express');
  let contraptionsRouter = express.Router();

  contraptionsRouter.get('/', function(req, res) {
    console.log(req.query)
    var queryObj = req.query;
    var resObj;


    res.send({
      'data': [
        {
          "id":1,
          "type": "contraption",
          "attributes":{
            "denomination": "utensile per tornio",
            "subType": 1,
            "idCode": "asd3333k3kk3k3k",
            "availableQt": 2,
            "purchaseRequest":"una scatola da 10pz",
            "minQt": 1,
            "state": 0,
            "ut-long": 10,
            "ut-thick": 0,
            "ut-rad-ins": 0,
            "ut-dia": 0,
            "ut-deg": 0
          },
          relationships:{
            material:{
              data:{
                type:'work-material',id:1
              }
            },
            machine:{
              data:{
                type:'machine',id:1
              }
            },
            type:{
              data:{
                type:'contraption-type',id:1
              }
            }
          }
        },
        {
          "id":2,
          "type": "contraption",
          "attributes":{
            "denomination": "utensile per strozza",
            "subType": 1,
            "idCode": "dmng1123r44k332",
            "availableQt": 5,
            "purchaseRequest":"una scatola da 10pz",
            "minQt": 1,
            "state": 1,
            "ut-long": 0,
            "ut-thick": 0,
            "ut-rad-ins": 0.2,
            "ut-dia": 0,
            "ut-deg": 0
          },
          relationships:{
            material:{
              data:{
                type:'work-material',id:3
              }
            },
            machine:{
              data:{
                type:'machine',id:3
              }
            },
            type:{
              data:{
                type:'contraption-type',id:3
              }
            }
          }
        },
        {
          "id":4,
          "type": "contraption",
          "attributes":{
            "denomination": "utensile per aaaaaaaaaaaA asaSA asaSA",
            "subType": 1,
            "idCode": "asd3333k3kk3k3k",
            "purchaseRequest":"una scatola da 10pz",
            "availableQt": 2,
            "minQt": 1,
            "state": 2,
            "ut-long": 10,
            "ut-thick": 0,
            "ut-rad-ins": 0,
            "ut-dia": 0,
            "ut-deg": 0
          },
          relationships:{
            material:{
              data:{
                type:'work-material',id:2
              }
            },
            machine:{
              data:{
                type:'machine',id:1
              }
            },
            type:{
              data:{
                type:'contraption-type',id:4
              }
            }
          }
        },
        {
          "id":12,
          "type": "contraption",
          "attributes":{
            "denomination": "utensile per CANI",
            "subType": 1,
            "idCode": "asd3333k3kk3k3k",
            "purchaseRequest":"una scatola da 10pz",
            "availableQt": 1,
            "minQt": 2,
            "state": 3,
            "ut-long": 10,
            "ut-thick": 0,
            "ut-rad-ins": 0,
            "ut-dia": 0,
            "ut-deg": 0
          },
          relationships:{
            material:{
              data:{
                type:'work-material',id:4
              }
            },
            machine:{
              data:{
                type:'machine',id:4
              }
            },
            type:{
              data:{
                type:'contraption-type',id:4
              }
            }
          }
        },
        {
          "id":112,
          "type": "contraption",
          "attributes":{
            "denomination": "utensile per CANI",
            "subType": 1,
            "purchaseRequest":"una scatola da 10pz",
            "idCode": "asd3333k3kk3k3k",
            "availableQt": 0,
            "minQt": 2,
            "state": 4,
            "ut-long": 10,
            "ut-thick": 0,
            "ut-rad-ins": 0,
            "ut-dia": 0,
            "ut-deg": 0
          },
          relationships:{
            material:{
              data:{
                type:'work-material',id:4
              }
            },
            machine:{
              data:{
                type:'machine',id:4
              }
            },
            type:{
              data:{
                type:'contraption-type',id:4
              }
            }
          }
        },
        {
          "id":132,
          "type": "contraption",
          "attributes":{
            "denomination": "utensile per CANI",
            "subType": 1,
            "purchaseRequest":"una scatola da 10pz",
            "idCode": "asd3333k3kk3k3k",
            "availableQt": 1,
            "minQt": 2,
            "state": 2,
            "ut-long": 10,
            "ut-thick": 0,
            "ut-rad-ins": 0,
            "ut-dia": 0,
            "ut-deg": 0
          },
          relationships:{
            material:{
              data:{
                type:'work-material',id:4
              }
            },
            machine:{
              data:{
                type:'machine',id:4
              }
            },
            type:{
              data:{
                type:'contraption-type',id:4
              }
            }
          }
        }



      ]
    })


  });

  contraptionsRouter.post('/', function(req, res) {

    res.status(201);

    res.send({
      'data':
        {
          "id":152,
          "type": "contraption",
          "attributes":{
            "denomination": "nuovo ut",
            "subType": 1,
            "purchaseRequest":"una scatola da 10pz",
            "idCode": "abbarabba",
            "availableQt": 222,
            "minQt": 1,
            "orderState": 1,
            "ut-long": 10,
            "ut-thick": 0,
            "ut-rad-ins": 0,
            "ut-dia": 0,
            "ut-deg": 0
          },
          relationships:{
            material:{
              data:{
                type:'work-material',id:2
              }
            },
            machine:{
              data:{
                type:'machine',id:2
              }
            },
            type:{
              data:{
                type:'contraption-type',id:2
              }
            }
          }
        }



    });
  });

  contraptionsRouter.get('/:id', function(req, res) {
    res.send({
      'contraptions': {
        id: req.params.id
      }
    });
  });

  contraptionsRouter.put('/:id', function(req, res) {
    res.send({
      'contraptions': {
        id: req.params.id
      }
    });
  });

  contraptionsRouter.delete('/:id', function(req, res) {
    res.status(204).end();
  });

  // The POST and PUT call will not contain a request body
  // because the body-parser is not included by default.
  // To use req.body, run:

  //    npm install --save-dev body-parser

  // After installing, you need to `use` the body-parser for
  // this mock uncommenting the following line:
  //
  //app.use('/api/contraptions', require('body-parser').json());
  app.use('/api/contraptions', contraptionsRouter);
};

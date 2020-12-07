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
            "id_code": "asd3333k3kk3k3k",
            "available_qt": 2,
            "purchaseRequest":"una scatola da 10pz",
            "minimum_qt": 1,
            "state": 0,
            "geometry_length": 10,
            "geometry_thickness": 0,
            "geometry_radius": 0,
            "geometry_diameter": 0,
            "geometry_degree": 0
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
            "id_code": "dmng1123r44k332",
            "available_qt": 5,
            "purchaseRequest":"una scatola da 10pz",
            "minimum_qt": 1,
            "state": 1,
            "geometry_length": 0,
            "geometry_thickness": 0,
            "geometry_radius": 0.2,
            "geometry_diameter": 0,
            "geometry_degree": 0
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
            "id_code": "asd3333k3kk3k3k",
            "purchaseRequest":"una scatola da 10pz",
            "available_qt": 2,
            "minimum_qt": 1,
            "state": 2,
            "geometry_length": 10,
            "geometry_thickness": 0,
            "geometry_radius": 0,
            "geometry_diameter": 0,
            "geometry_degree": 0
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
            "id_code": "asd3333k3kk3k3k",
            "purchaseRequest":"una scatola da 10pz",
            "available_qt": 1,
            "minimum_qt": 2,
            "state": 3,
            "geometry_length": 10,
            "geometry_thickness": 0,
            "geometry_radius": 0,
            "geometry_diameter": 0,
            "geometry_degree": 0
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
            "id_code": "asd3333k3kk3k3k",
            "available_qt": 0,
            "minimum_qt": 2,
            "state": 4,
            "geometry_length": 10,
            "geometry_thickness": 0,
            "geometry_radius": 0,
            "geometry_diameter": 0,
            "geometry_degree": 0
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
            "id_code": "asd3333k3kk3k3k",
            "available_qt": 1,
            "minimum_qt": 2,
            "state": 2,
            "geometry_length": 10,
            "geometry_thickness": 0,
            "geometry_radius": 0,
            "geometry_diameter": 0,
            "geometry_degree": 0
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
            "id_code": "abbarabba",
            "available_qt": 222,
            "minimum_qt": 1,
            "orderState": 1,
            "geometry_length": 10,
            "geometry_thickness": 0,
            "geometry_radius": 0,
            "geometry_diameter": 0,
            "geometry_degree": 0
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
    res.send({data:
      {
        id: req.params.id,
        "type": "contraption",
        "attributes":{
          "denomination": "utensile per CANI",
          "subType": 1,
          "id_code": "asd3333k3kk3k3k",
          "purchaseRequest":"una scatola da 10pz",
          "available_qt": 1,
          "minimum_qt": 2,
          "state": 3,
          "geometry_length": 10,
          "geometry_thickness": 0,
          "geometry_radius": 0,
          "geometry_diameter": 0,
          "geometry_degree": 0
        }
      }});
  });

  contraptionsRouter.put('/:id', function(req, res) {
    res.send({data:
      {
        id: req.params.id,
        "type": "contraption",
        "attributes":{
          "denomination": "utensile per CANI",
          "subType": 1,
          "id_code": "asd3333k3kk3k3k",
          "purchaseRequest":"una scatola da 10pz",
          "available_qt": 1,
          "minimum_qt": 2,
          "state": 3,
          "geometry_length": 10,
          "geometry_thickness": 0,
          "geometry_radius": 0,
          "geometry_diameter": 0,
          "geometry_degree": 0
        }
      }});


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

'use strict';

module.exports = function(app) {
  const express = require('express');
  let searchFiltersRouter = express.Router();

  searchFiltersRouter.get('/', function(req, res) {
    res.send({
      data:[
        {
          id:0,
          type:'work-materials',
          attributes:{
            name:'Generico',
            tokens:[]
          }
        },
        {
          id:1,
          type:'work-materials',
          attributes:{
            name:'Acciaio Normale',
            tokens:["acciao", "c40","ferro", "fe"]
          }
        },
        {
          id:2,
          type:'work-materials',
          attributes:{
            name:'Acciaio Inox',
            tokens:["inox", "inossidabile"]
          }
        },
        {
          id:3,
          type:'work-materials',
          attributes:{
            name:'Acciaio Temprato',
            tokens:["cementato","cementati","cemento","tempra","temprato","temprati"]
          }
        },
        {
          id:4,
          type:'work-materials',
          attributes:{
            name:'Alluminio',
            tokens:["alluminio", "alu"]
          }
        },
        {
          id:5,
          type:'work-materials',
          attributes:{
            name:'Rame',
            tokens:["rame"]
          }
        },
        {
          id:6,
          type:'work-materials',
          attributes:{
            name:'Hardox',
            tokens:["hardox", "antiusura"]
          }
        },
        //macchine
        {
          id:0,
          type:'machine',
          'attributes':{
            'name':'Generico',
            tokens:[],
          }
        },
        {
          id:1,
          type:'machine',
          'attributes':{
            'name':'Tornio CNC',
            tokens:["tornio","tornitura"],
          }
        },
        {
          id:2,
          type:'machine',
          'attributes':{
            'name':'Centro di lavoro',
            tokens:["centro","fresa","fresatura"]
          }
        },
        {
          id:3,
          type:'machine',
          'attributes':{
            'name':'Strozza',
            tokens:["strozza","strozzatura"]
          }
        },
        {
          id:4,
          type:'machine',
          'attributes':{
            'name':'Tornio manuale',
            tokens:["tornio manuale"]
          }
        },
        {
          id:5,
          type:'machine',
          'attributes':{
            'name':'Trapano',
            tokens:["trapano","foratura"]
          }
        },
        //types
        {
          id:0,
          type:'contraption-types',
          attributes:{
            name:'Generico',
            tokens:[]
          }
        },
        {
          id:1,
          type:'contraption-types',
          attributes:{
            name:'Inserto',
            tokens:["inserto", "pachetta"]
          }
        },
        {
          id:2,
          type:'contraption-types',
          attributes:{
            name:'Punta',
            tokens:["punta", "foratura"]
          }
        },
        {
          id:3,
          type:'contraption-types',
          attributes:{
            name:'Portautensile',
            tokens:["portautensile"]
          }
        },
        {
          id:4,
          type:'contraption-types',
          attributes:{
            name:'Utensile strozza',
            tokens:["strozza, strozzatrice"]
          }
        },
        //subType
        {
          id:0,
          type:'contraption-sub-types',
          attributes:{
            name:'Generico',
            tokens:[]
          }
        },
        {
          id:1,
          type:'contraption-sub-types',
          attributes:{
            name:"Punta a inserti",
            tokens:["punta inserti"]
          }
        },
        {
          id:2,
          type:'contraption-sub-types',
          attributes:{
            name:"Punta HSS",
            tokens:["punta hss"]
          }
        },
        {
          id:3,
          type:'contraption-sub-types',
          attributes:{
            name:"Punta a cuspide",
            tokens:["punta cuspide", "cuspide"]
          }
        },
        {
          id:4,
          type:'contraption-sub-types',
          attributes:{
            name:"Punta al widia",
            tokens:["punta widia"]
          }
        },
        {
          id:5,
          type:'contraption-sub-types',
          attributes:{
            name:"Fresa integrale",
            tokens:["integrale"]
          }
        },
        //code
        {
          id:0,
          type:"id-code",
          attributes:{
            code:"",
            tokens:[]
          }
        },
        {
          id:1,
          type:"id-code",
          attributes:{
            code:"dnmg",
            tokens:["dnmg", "utensile quadro"]
          }
        },
        {
          id:2,
          type:"id-code",
          attributes:{
            name:"piko",
            tokens:["piko", "velocità"]
          }
        },
        {
          id:4,
          type:"id-code",
          attributes:{
            name:"hss",
            tokens:['hss']
          }
        },
        {
          id:3,
          type:"id-code",
          attributes:{
            name:"dnmg",
            tokens:['dnmg']
          }
        },
        //geometry, ut-long
        {
          id:1,
          type:'ut-long',
          attributes:{
            name:"Geometria-lunghezza",
            tokens:[
              "(l{1}|long{1}|lung{1}|lunghezza{1})[ ]*[0-9]+([ ]|$|mm)"
            ]
          }
        },
        {
          id:1,
          type:'ut-dia',
          attributes:{
            name:"Geometria-diametro",
            tokens:[
              "(d{1}|dia{1}|diametro{1})[ ]*[0-9]+([ ]|$|mm)"
            ]
          }
        },
        {
          id:1,
          type:'ut-deg',
          attributes:{
            name:"Geometria-angolo",
            tokens:[
              "((gradi{1}|deg{1})[ ]*[0-9]+([ ]|$|mm)) | ([0-9]+[ ]*(gradi{1})([ ]|$|mm))"
            ]
          }
        },
        {
          id:1,
          type:'ut-rad-ins',
          attributes:{
            name:"Geometria-raggio inserto",
            tokens:[
              "(r{1}|raggio{1})[ ]*[0-9]+([ ]|$|mm)"
            ]
          }
        },
        {
          id:1,
          type:'ut-thick',
          attributes:{
            name:"Geometria-spessore",
            tokens:[
              "(s{1}|spess{1}|spessore{1}|spesso{1})[ ]*[0-9]+([ ]|$|mm)"
            ]
          }
        }
      ]
    });
  });

  searchFiltersRouter.post('/', function(req, res) {
    res.status(201).end();
  });

  searchFiltersRouter.get('/:id', function(req, res) {
    res.send({
      'search-filters': {
        id: req.params.id
      }
    });
  });

  searchFiltersRouter.put('/:id', function(req, res) {
    res.send({
      'search-filters': {
        id: req.params.id
      }
    });
  });

  searchFiltersRouter.delete('/:id', function(req, res) {
    res.status(204).end();
  });

  // The POST and PUT call will not contain a request body
  // because the body-parser is not included by default.
  // To use req.body, run:

  //    npm install --save-dev body-parser

  // After installing, you need to `use` the body-parser for
  // this mock uncommenting the following line:
  //
  //app.use('/api/search-filters', require('body-parser').json());
  app.use('/api/search-filters', searchFiltersRouter);
};

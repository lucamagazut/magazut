import Route from '@ember/routing/route';

export default Route.extend({
  queryParams: {
    text: {
      refreshModel: true
    }
  },
  findedItems:0,

  setupController: function(controller, model) {
    controller.set('findedItems',this.findedItems);
    controller.set('model', model);
  },
  searchText:null,
  beforeModel: function(transition){
    let searchText = transition.to.queryParams.text;
    this.searchText = searchText || '';
    // if(!searchText || searchText.replace( /\s/g, '') === ""){
    //   transition.abort();
    //   this.searchText = 'cacca';
    // }else{
    //   this.searchText = searchText;
    //   // VAI AL MODEL
    // }
  },
  afterModel(resolvedModel){
    // this.findedItems = resolvedModel.get('length');
  },
  model(){
    // this.parseSearchText();
    let queryApi = this.Parser.getApiQuery(this.store, this.searchText);
    console.log(queryApi)
    return this.store.query('contraption',queryApi);
  },

  Parser:(function(){
    let _parser = {};

    var parseCategories = function(filterObj, textToSearch){
      let k;
      var preQueryObj = {};

      for(k in filterObj){
        // console.log('parsa '+ k);

        preQueryObj[k] = parseArray(filterObj[k], textToSearch);
      }

      let kk;
      var queryObj = {};

      for(kk in preQueryObj){
        if(preQueryObj[kk]){
          if(preQueryObj[kk].id && preQueryObj[kk].id.length !== 0){
            queryObj[kk] = preQueryObj[kk].id.join();
          }

          if(preQueryObj[kk].tokens.length !== 0){
            queryObj['text'] = preQueryObj[kk].tokens.join();
          }

        }
      }


      return queryObj;
    }

    var parseGeometry = function(filterObj, textToSearch){
      let k;
      var queryObj = {};

      for(k in filterObj){
        // console.log('parsa '+ k);
        let text = searchGeometryOccurrences(filterObj[k], textToSearch);

        if(text !== ''){
          queryObj[k] = text;
        }
      }
      return queryObj;
    }

    var parseArray = function (arrayToParse, textToSearch, previusSearch) {
      var i;
      // console.log('entra parsearrai');
      // console.log(arrayToParse);
      // console.log(textToSearch);
      // console.log(previusSearch);
      // console.log('@@@@@@@@@@@@@@@@@@@@@@@@@@@@@');
      var len = arrayToParse.length;
      for(i = 0; i<len; i++){
        let ele = arrayToParse[i];
        if(checkTokenOccurences(ele.tokens, textToSearch)){
          if(ele.subtypes){
            return parseArray(ele.subtypes, textToSearch, {id:ele.id, tokens: []});
          }else if(ele.id){
            return {id:ele.id, tokens: []};
          }
          else{
            return {id:previusSearch.id, tokens: ele.tokens};
          }
        }
      }
      return previusSearch;
    };

    var checkTokenOccurences = function(tokenArray, textToSearch){
      let i;
      let len = tokenArray.length;

      // console.log('confronta '+ JSON.stringify(tokenArray) + '   '+ textToSearch);

      for(i=0; i<len; i++){
        if(textToSearch.includes(tokenArray[i])){
          return true;
        }
      }
      return false;
    };



    let filtersMap =
    {
      filters:{
        contraption_type:[
          {
            name:'punte',
            tokens:['punta'],
            id:[4,5,6,7],
            subtypes:[
              {
                name:'hss',
                id:[4],
                tokens:['hss','superrapido']
              },
              {
                name:'widia',
                id:[5],
                tokens:['widia','dura']
              },
              {
                name:'cuspide',
                id:[6],
                tokens:['cuspide','a cuspide']
              },
              {
                name:'inserti',
                id:[7],
                tokens:['inserti', 'a inserti', 'placchette']
              }
            ]
          },
          {
            name:'frese',
            id:[8,9,10,11,12],
            tokens:['fresa'],
            subtypes:[
              {
                name: 'inserti',
                id:[8],
                tokens:['inserti','placchette'],
                subtypes:[
                  {
                    name:'piko',
                    tokens:['piko']
                  },
                  {
                    name:'Per sgrossatura',
                    tokens:['sgrossa']
                  },
                  {
                    name:'Per finitura',
                    tokens:['finitura']
                  }
                ]
              },
              {
                name:'A candela',
                id:[9,10],
                tokens:['candela','cilindrica'],
                subtypes:[
                  {
                    name:'Widia',
                    id:[9],
                    tokens:['widia','dura']
                  },
                  {
                    name:'HSS',
                    id:[10],
                    tokens:['hss','rapido']
                  }
                ]
              },
              {
                name:'A disco',
                id:[11],
                tokens:['a disco', 'piatta', 'circolare']
              },
              {
                name:'Di Forma',
                id:[12],
                tokens:['forma']
              }
            ]
          },
          {
            name:'Porta utensile',
            id:[2],
            tokens:['porta utensile','portautensile'],
          },
          {
            name:'Utensile',
            id:[13],
            tokens:['utensile'],
          },
          {
            name:'Inserto',
            id:[3],
            tokens:['inserto','inserti'],
            subtypes:[

            ]
          }
        ],
        machine:[
          {
            name:'Tornio',
            id:[6,5],
            tokens:['tornio','torni','tornitura'],
            subtypes:[
              {
                name:'Manuale',
                id:[5],
                tokens:['manuale']
              },
              {
                name:'CNC',
                id:[6],
                tokens:['cnc']
              }
            ]
          },
          {
            name:'Centro di lavoro',
            id:[2],
            tokens:['centro','fresatrice','alesatrice']
          },
          {
            name:'Strozza',
            id:[4],
            tokens:['strozza','strozzatrice','chiavetta']
          },
          {
            name:'Trapano',
            id:[3],
            tokens:['trapano','radiale','foratrice']
          }
        ],
        material:[
          {
            name:'Acciaio',
            id:[2],
            tokens:['acciaio','fe','c40','c45']
          },
          {
            name:'Acciaio Antiusura',
            id:[3],
            tokens:['hardox','antiusura']
          },
          {
            name:'Acciaio Antiusura',
            id:[3],
            tokens:['hardox','antiusura']
          },
          {
            name:'Rame',
            id:[4],
            tokens:['rame']
          },
          {
            name:'Alluminio',
            id:[5],
            tokens:['alluminio','alu']
          },
          {
            name:'Acciaio inox',
            id:[6],
            tokens:['inox','aisi']
          },
          {
            name:'Acciaio Temprato',
            id:[7],
            tokens:['temprato','trattato','cementato','tempra','cemento']
          }
        ]
      },
      geometryFilter:{
        geometry_length:{
          name:"Geometria-lunghezza",
          tokens:[
            "(l{1}|long{1}|lung{1}|lunghezza{1})[ ]*[0-9]+([ ]|$|mm)"
          ]
        },
        geometry_radius:{
          name:"Geometria-raggio inserto",
          tokens:[
            "(r{1}|raggio{1})[ ]*[0-9]+([ ]|$|mm)"
          ]
        },
        geometry_degree:{
          name:"Geometria-angolo",
          tokens:[
            "((gradi{1}|deg{1})[ ]*[0-9]+([ ]|$|mm)) | ([0-9]+[ ]*(gradi{1})([ ]|$|mm))"
          ]
        },
        geometry_thickness:{
          name:"Geometria-spessore",
          tokens:[
            "(s{1}|spess{1}|spessore{1}|spesso{1})[ ]*[0-9]+([ ]|$|mm)"
          ]
        },
        geometry_diameter:{
          name:"Geometria-diametro",
          tokens:[
            "(d{1}|dia{1}|diametro{1})[ ]*[0-9]+([ ]|$|mm)"
          ]
        }

      }

    };

    var searchGeometryOccurrences = function(geometryFilter, normalizedText){
      let regExReplaceText = /[^0-9]/g;
      let result = '';

      geometryFilter.tokens.forEach(token => {
        let regEx = new RegExp(token);
        let searchPos = normalizedText.search(regEx);
        if(searchPos!==-1){
          result = normalizedText.match(regEx)[0].replace(regExReplaceText,'');
        }
      });
      return result;
    };

    _parser.normalizedText = function(testToNormalize){
      return testToNormalize.toLowerCase();
    };


    _parser.getApiQuery = function(emberStore, searchText){
      let normalizedText = _parser.normalizedText(searchText);

      var categoryObj = parseCategories(filtersMap.filters, normalizedText);
      var geometryObj = parseGeometry(filtersMap.geometryFilter, normalizedText);
      let apiObj = {...categoryObj, ...geometryObj};
      // return apiObj;

      console.log('@@@@@@@@@@@@@@@@@@@ò');
      return apiObj;
    };


    return _parser;

  }())
});

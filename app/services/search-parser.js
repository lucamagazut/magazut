import Service from '@ember/service';
import { inject as service } from '@ember/service';

export default Service.extend({
  ajax: service('ajax'),
  searchMap:null,
  getSearchMap(){
    var _t = this;
    if(this.searchMap){
      console.log('mappa già presente');
      return new Promise(function(resolve, reject) {
        resolve(_t.searchMap);
      });
    }
    else{
      return this.ajax.makeGet("/assets/javascripts/search_map.json", {},'GET');
    }
  },

  init(){
    console.log('INIT PARSER ////////////////\n\n');
    var _parser = {};
    var _t = this;

    var parseCategories = function(filterObj, textToSearch){
      var k;
      var preQueryObj = {};

      for(k in filterObj){
        // console.log('parsa '+ k);

        preQueryObj[k] = parseArray(filterObj[k], textToSearch);
      }

      var kk;
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
    };

    var parseGeometry = function(filterObj, textToSearch){
      var k;
      var queryObj = {};

      for(k in filterObj){
        // console.log('parsa '+ k);
        let text = searchGeometryOccurrences(filterObj[k], textToSearch);

        if(text !== ''){
          queryObj[k] = text;
        }
      }
      return queryObj;
    };

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
      var i;
      let len = tokenArray.length;

      // console.log('confronta '+ JSON.stringify(tokenArray) + '   '+ textToSearch);

      for(i=0; i<len; i++){
        if(textToSearch.includes(tokenArray[i])){
          return true;
        }
      }
      return false;
    };

    var searchGeometryOccurrences = function(geometryFilter, normalizedText){
      const regExReplaceText = /[^0-9]/g;
      var result = '';

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

      return new Promise(function(resolve, reject){
        _t.getSearchMap().then(function(searchMap) {
          _t.searchMap = searchMap;
          let categoryObj = parseCategories(searchMap.filters, normalizedText);
          let geometryObj = parseGeometry(searchMap.geometryFilter, normalizedText);
          let apiObj = {...categoryObj, ...geometryObj};
          resolve(apiObj);
        });
      });
    };

    this.Parser = _parser;

  },
  getParser(){
    console.log('GET PARSER ////////////////\n\n');
    return this.Parser;
  }

});

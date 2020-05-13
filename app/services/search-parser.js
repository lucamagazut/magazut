import Service from '@ember/service';
import config from '../config/environment';
import { inject as service } from '@ember/service';

export default Service.extend({
  ajax: service('ajax'),
  searchMap:null,
  getSearchMap(){
    var _t = this;
    if(this.searchMap){
      return new Promise(function(resolve, reject) {
        resolve(_t.searchMap);
      });
    }
    else{
      return this.ajax.makeGet("assets/javascripts/search_map.json", {},'GET');
    }
  },

  init(){
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
            if(preQueryObj[kk].text){
              queryObj['text'] = preQueryObj[kk].text.join();
            }else{
              queryObj['text'] = preQueryObj[kk].tokens.join();
            }
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
          }
          else if(ele.text){
            return {id:ele.id ,tokens: ele.tokens, text:ele.text};
          }
          else if(ele.id){
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
      const regExReplaceText = /[^0-9,.]/g;
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

    var parseId = function(idFilter, normalizedText){
      const regExReplaceText = /[^0-9]/g;
      let regEx = new RegExp(idFilter.token);
      let searchPos = normalizedText.search(regEx);
      var result = '';
      if(searchPos!==-1){
        result = normalizedText.match(regEx)[0].replace(regExReplaceText,'');
      }
      return result;
    };

    var parseIdCode = function(code_idObj, searchText){
      var check = false;
      code_idObj.tokens.forEach((item, i) => {

        if(searchText.includes(item)){
          check = true;
        }
      });
      return check;
    };


    _parser.normalizeText = function(testToNormalize){
      return testToNormalize.toLowerCase();
    };


    _parser.getApiQuery = function(emberStore, searchText, paginationObj){
      let normalizedText = _parser.normalizeText(searchText);

      return new Promise(function(resolve, reject){
        _t.getSearchMap().then(function(searchMap) {
          _t.searchMap = searchMap;
          var apiObj;

          let idFilter = parseId(searchMap.c_id, normalizedText);
          if(idFilter !== ''){
            apiObj = {c_id:idFilter};
          }
          else{
            if(parseIdCode(searchMap['id-code'], searchText)){
              apiObj = {"id-code":searchText};
            }
            else{
              let categoryObj = parseCategories(searchMap.filters, normalizedText);


              console.log(categoryObj);
              if(categoryObj.contraption_type || categoryObj.filter){
                let geometryObj = parseGeometry(searchMap.geometryFilter, normalizedText);
                apiObj = {...categoryObj, ...geometryObj, ...paginationObj};
              }else{
                apiObj = false;
              }
            }

          }

          return resolve(apiObj);
        });
      });
    };

    this.Parser = _parser;

  },
  getParser(){
    return this.Parser;
  }

});

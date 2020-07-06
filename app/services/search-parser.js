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
      let occurencesList = [];

      for(k in filterObj){
        // console.log('parsa '+ k);

        preQueryObj[k] = parseArray(filterObj[k], textToSearch, occurencesList);
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
              queryObj['text'] = preQueryObj[kk].text;
            }else{
              queryObj['text'] = preQueryObj[kk].tokens;
            }
          }
        }
      }
      return [queryObj, occurencesList];
    };

    var parseGeometry = function(filterObj, textToSearch){
      var k;
      var queryObj = {};
      let geometryOccurencesList = [];


      for(k in filterObj){
        // console.log('parsa '+ k);
        let [text, occurence] = searchGeometryOccurrences(filterObj[k], textToSearch);

        if(text !== ''){
          geometryOccurencesList.push(occurence);
          queryObj[k] = text;
        }
      }
      return [queryObj, geometryOccurencesList];
    };

    var parseArray = function (arrayToParse, textToSearch, occurencesList, previusSearch) {
      var i;
      // console.log('entra parsearrai');
      // console.log(arrayToParse);
      // console.log(textToSearch);
      // console.log(previusSearch);
      var len = arrayToParse.length;
      for(i = 0; i<len; i++){
        let ele = arrayToParse[i];
        let occurence = checkTokenOccurences(ele.tokens, textToSearch);
        if(occurence !== ''){
          occurencesList.push(occurence);
          if(ele.subtypes){
            return parseArray(ele.subtypes, textToSearch, occurencesList, {id:ele.id, tokens: []});
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
      let i;
      let len = tokenArray.length;
      let textFinded = '';

      // console.log('confronta '+ JSON.stringify(tokenArray) + '   '+ textToSearch);

      for(i=0; i<len; i++){
        if(textToSearch.includes(tokenArray[i])){
          textFinded = tokenArray[i];
          break;
        }
      }
      return textFinded;
    };

    var searchGeometryOccurrences = function(geometryFilter, normalizedText){
      const regExReplaceText = /[^0-9,.]/g;
      var result = '';
      let occurence = '';

      geometryFilter.tokens.forEach(token => {
        let regEx = new RegExp(token);
        let searchPos = normalizedText.search(regEx);
        if(searchPos!==-1){
          occurence = normalizedText.match(regEx)[0];
          result = occurence.replace(regExReplaceText,'');
        }
      });
      return [result, occurence];
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

        if(searchText.startsWith(item)){
          check = true;
        }
      });
      return check;
    };


    _parser.normalizeText = function(testToNormalize){
      return testToNormalize.toLowerCase();
    };


    var removeOccurences = function(text, categoryOccurencesList, geometryOccurencesList){
      let newText = text + '';

      categoryOccurencesList.forEach((item, i) => {
        newText = newText.replace(item, '');
      });
      geometryOccurencesList.forEach((item, i) => {
        newText = newText.replace(item, '');
      });
      return newText;
    };

    _parser.getApiQuery = function(emberStore, searchText, paginationObj){
      let normalizedText = _parser.normalizeText(searchText);
      let querySearchPureText = normalizedText + '';


      return new Promise(function(resolve, reject){
        _t.getSearchMap().then(function(searchMap) {
          _t.searchMap = searchMap;
          var apiObj;

          let idFilter = parseId(searchMap.c_id, normalizedText);
          if(idFilter !== ''){
            apiObj = {c_id:idFilter};
          }
          else{
            let categoryObj, remainText, categoryOccurencesList, geometryOccurencesList, geometryObj;

            [categoryObj, categoryOccurencesList] = parseCategories(searchMap.filters, normalizedText);

            [geometryObj, geometryOccurencesList]  = parseGeometry(searchMap.geometryFilter, normalizedText);

            let textToSearch = removeOccurences(normalizedText, categoryOccurencesList, geometryOccurencesList);

            categoryObj.text = categoryObj.text || [];
            if(textToSearch != ''){
              categoryObj.text = categoryObj.text.concat(textToSearch.trim().split(' '));
            }

            categoryObj.text = categoryObj.text.join();


            apiObj = {...categoryObj, ...geometryObj, ...paginationObj};

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

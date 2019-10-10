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
    if(!searchText || searchText.replace( /\s/g, '') === ""){
      transition.abort();
    }else{
      this.searchText = searchText;
      // VAI AL MODEL
    }
  },
  afterModel(resolvedModel){
    this.findedItems = resolvedModel.get('length');
  },
  model(){
    // this.parseSearchText();
    let queryApi = this.Parser.getApiQuery(this.store, this.searchText);
    console.log(queryApi)
    return this.store.query('contraption',queryApi);
  },

  Parser:(function(){
    let _parser = {};


    let modelNames = ['machine','contraption-type', 'contraption-sub-type','id-code','work-material'];
    let geometryModelNames = ['ut-long','ut-dia','ut-deg','ut-thick','ut-rad-ins'];

    _parser.searchTextOccurrences = function(emberStore, normalizedText){

      let apiInputs = {};
      modelNames.forEach(modelName => {
        let elements = emberStore.peekAll(modelName);
        elements.forEach(element => {
          let tokens = element.get('tokens');
          tokens.forEach(token => {
            if(normalizedText.indexOf(token)!==-1){
              apiInputs[elements.get('modelName')] = element.get('id');
            }
          });
        });
      });
      return apiInputs;
    };

    _parser.searchGeometryOccurrences = function(emberStore, normalizedText){
      let apiInputs = {};
      let regExReplaceText = /[^0-9]/g;
      geometryModelNames.forEach(modelName => {
        let elements = emberStore.peekAll(modelName);
        elements.forEach(element => {
          let tokens = element.get('tokens');
          tokens.forEach(token => {
            let regEx = new RegExp(token);
            let searchPos = normalizedText.search(regEx);
            if(searchPos!==-1){
              apiInputs[elements.get('modelName')] = normalizedText.match(regEx)[0].replace(regExReplaceText,'');
            }
          });
        });
      });
      return apiInputs;
    };

    _parser.normalizedText = function(testToNormalize){
      return testToNormalize.toLowerCase();
    };

    _parser.getApiQuery = function(emberStore, searchText){
      let normalizedText = _parser.normalizedText(searchText);
      let apiObj = {..._parser.searchTextOccurrences(emberStore, normalizedText), ..._parser.searchGeometryOccurrences(emberStore, normalizedText)};
      return apiObj;
    };


    return _parser;

  }())

});

import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import { computed } from '@ember/object';
import { observer } from '@ember/object';


export default Route.extend({
  queryParams: {
    text: {
      refreshModel: true
    }
  },
  // findedItems:0,
  orderApi: service('order-api'),
  pagination:0,
  itemsForPage:25,
  currentPage: computed('pagination',function(){
    return this.pagination + 1;
  }),

  totalPages:0,

  // activate(){
  //   alert(1)
  // },

  searchParserService: service('search-parser'),

  setupController: function(controller, model) {
    console.log('setuppa');
    controller.set('currentPage',this.currentPage);
    controller.set('totalPages',this.totalPages);

    // controller.set('model', model);
    this._super(controller, model);

  },
  searchText:null,
  onSearchTextChange:observer('searchText', function(){
    this.set('pagination', 0);
  }),

  beforeModel: function(transition){
    let searchText = transition.to.queryParams.text || '';
    this.set('searchText', searchText);
    // if(!searchText || searchText.replace( /\s/g, '') === ""){
    //   transition.abort();
    //   this.searchText = 'cacca';
    // }else{
    //   this.searchText = searchText;
    //   // VAI AL MODEL
    // }
  },
  afterModel(resolvedModel){
    let firstObj = resolvedModel.get('firstObject');
    let pagination = firstObj ? firstObj.get('pagination') : 0;
    let totalItems = firstObj ? firstObj.total_contraptions_found : 0;
    console.log('totalPages '+ Math.ceil(totalItems / this.itemsForPage));
    this.set('totalPages', Math.ceil(totalItems / this.itemsForPage));

    this.set('pagination', pagination);
    console.log('paginazine '+pagination);
    // this.controller.set('currentPage',this.get('pagination'));
    // this.findedItems = resolvedModel.get('length');
  },
  getPaginationObj(){
    return {page:this.get('pagination'), items: this.get('itemsForPage')};
  },
  model(){
    // alert(this.controllerFor("currentUser"))

    var _t = this;
    let pagination = this.get('pagination');

    return new Promise(function(resolve, reject){
      let getQueryPromise = _t.searchParserService.getParser().getApiQuery(_t.store, _t.searchText, _t.getPaginationObj());

      getQueryPromise
      .then(function(queryApi){

        console.log('query api ');
        console.log(queryApi);
        if(queryApi === false){
          reject(new Error('Ricerca non valida'));
        }else{
          resolve(_t.store.query('contraption',queryApi));
        }
        return this;

      })
    })

    // return this.store.query('contraption',queryApi);
  },

  actions:{
    changeOrderStatus(modelId, orderStatusId, getBack){
      var store = this.store;
      console.log(modelId);
      console.log(orderStatusId);
      this.orderApi.send(modelId, orderStatusId).then((resp) => {
        let order_status = resp.data.attributes.order_status;
        store.peekRecord('contraption', modelId).set('order_status',order_status);
        // this.transitionTo('search-contraption.contraptions');
        if(getBack){
          this.send('back');
        }
      },
        (error) =>{
          alert('error')
        }
      );
    },
    onClickContraptionsPrev_b2(items){
      if(this.get('pagination') > 0){
        this.decrementProperty('pagination');
        this.refresh();
      }
    },
    onClickContraptionsNext_b2(items){
      if(items === this.get('itemsForPage')){
        this.incrementProperty('pagination');
        this.refresh();
      }
    },
    error(error){
      this.send('showError', error);
    }
  }

});

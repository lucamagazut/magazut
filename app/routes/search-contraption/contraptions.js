import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default Route.extend({
  queryParams: {
    text: {
      refreshModel: true
    }
  },
  findedItems:0,
  orderApi: service('order-api'),


  searchParserService: service('search-parser'),

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
    var _t = this;

    return new Promise(function(resolve, reject){
      _t.searchParserService.getParser().getApiQuery(_t.store, _t.searchText)
      .then(function(queryApi){
        resolve(_t.store.query('contraption',queryApi));
      });
    })
    // return this.store.query('contraption',queryApi);
  },

  actions:{
    changeOrderStatus(model, order_status_id, getBack){
      this.orderApi.send(model.get('id'), order_status_id).then((resp) => {
        let order_status = resp.data.attributes.order_status;
        model.set('order_status', order_status);
        // this.transitionTo('search-contraption.contraptions');
        if(getBack){
          this.send('back');
        }
      },
        (error) =>{
          alert('error')
        }
      );
    }
  }

});

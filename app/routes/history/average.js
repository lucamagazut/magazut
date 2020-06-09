import Route from '@ember/routing/route';

export default Route.extend({
  history_page:1,
  year:0,

  model(params){
    let currentModel = this.store.query('year-history',{'page':this.get('history_page')});
    this.set('currentModel', currentModel);
    return currentModel;
  },

  setupController: function(controller, model) {
    this.set('currentController', controller);
    controller.set('year', this.get('year'));
    this._super(controller, model);
  },

  getYear(){
    let entries = this.store.peekAll('year-history');
    let year;

    if(entries && entries.length > 0){
      return entries.get('firstObject').get('current_year');
    }
    else{
      return Number(this.get('year')) + (Number(this.get('history_page')) - 1);
    }

  },

  afterModel(){
    this.set('year', this.getYear());
  },

  deactivate(){
    // this.currentModel.destroyRecord();
    this.set('history_page', 1);
    this.get('currentModel').forEach(function(item, i) {
      item.unloadRecord();
    });
  },

  actions:{
    on_history_next(){
      if(this.get('currentModel').length > 0){
        this.set('history_page',  this.history_page+1);
        this.get('currentModel').forEach(function(item, i) {
          item.unloadRecord();
        });
        this.refresh();
      }
    },
    on_history_prev(){
      let page = this.get('history_page');
      if(page > 1){
        this.set('history_page', page - 1);
        this.get('currentModel').forEach(function(item, i) {
          item.unloadRecord();
        });
        this.refresh();
      }
    }
  }
});

import Route from '@ember/routing/route';

export default Route.extend({
  history_page:1,

  model(params){
    let currentModel = this.store.query('monthly-history',{'page':this.get('history_page')});
    this.set('currentModel', currentModel);
    return currentModel;
  },

  setupController: function(controller, model) {
    this.set('currentController', controller);
    controller.set('year', this.get('year'));
    controller.set('monthName', this.get('monthName'));
    controller.set('history_page',this.history_page);
    this._super(controller, model);
  },

  afterModel(){
    let firstEntry = this.store.peekAll('monthly-history').get('firstObject');
    let year = firstEntry.get('current_year');
    this.set('year', year);
    this.set('monthName', firstEntry.get('current_month'));
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

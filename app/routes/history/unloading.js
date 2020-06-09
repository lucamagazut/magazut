import Route from '@ember/routing/route';

export default Route.extend({

  history_page:1,
  total_pages:1,
  items_for_page:0,
  total_items:0,
  items_showed:0,
  current_page:0,

  model(params){
    let currentModel = this.store.query('unloading-history',{'page':this.get('history_page'),  items_for_page:25});
    this.set('currentModel', currentModel);
    return currentModel;
  },

  afterModel(){
    this.set('pagination', this.store.peekAll('pagination').get('firstObject'));
    let pagination = this.store.peekAll('pagination').get('firstObject');
    this.set('pagination', pagination);
    this.set('total_pages', pagination.get('total_pages'));
    this.set('items_for_page', pagination.get('items_for_page'));
    this.set('total_items', pagination.get('total_items'));
    this.set('items_showed', pagination.get('items_showed'));
    this.set('current_page', pagination.get('current_page'));
  },

  setupController: function(controller, model) {
    this.set('currentController', controller);
    controller.set('total_items', this.get('total_items'));
    controller.set('total_pages', this.get('total_pages'));
    controller.set('items_for_page', this.get('items_for_page'));
    controller.set('items_showed', this.get('items_showed'));
    controller.set('current_page', this.get('current_page'));

    this._super(controller, model);
  },

  deactivate(){
    // this.currentModel.destroyRecord();
    this.set('history_page', 1);
  },

  actions:{
    on_history_next(){
      let pagination = this.get('pagination');
      if(pagination.get('is_next')){
        this.set('history_page',  this.history_page+1);
        this.refresh();
      }
    },
    on_history_prev(){
      let pagination = this.get('pagination');
      if(pagination.get('is_prev')){
        this.set('history_page',  this.history_page - 1);
        this.refresh();
      }
    }
  }
});

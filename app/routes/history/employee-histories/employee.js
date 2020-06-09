import Route from '@ember/routing/route';

export default Route.extend({
  history_page:1,
  employee_complete_name:'',
  total_pages:1,
  items_for_page:0,
  total_items:0,
  items_showed:0,
  current_page:0,

  model(params){
    let currentModel = this.store.query('employee-history', {employee_id:params.employee_history_id, page:this.get('history_page'), items_for_page:15});
    this.set('currentModel', currentModel);
    return currentModel;
  },

  setupController: function(controller, model) {
    this.set('currentController', controller);
    controller.set('employee_complete_name', this.get('employee_complete_name'));
    controller.set('total_items', this.get('total_items'));
    controller.set('total_pages', this.get('total_pages'));
    controller.set('items_for_page', this.get('items_for_page'));
    controller.set('items_showed', this.get('items_showed'));
    controller.set('current_page', this.get('current_page'));

    this._super(controller, model);
  },

  afterModel(){
    let pagination = this.store.peekAll('pagination').get('firstObject');
    this.set('pagination', pagination);
    this.set('total_pages', pagination.get('total_pages'));
    this.set('items_for_page', pagination.get('items_for_page'));
    this.set('total_items', pagination.get('total_items'));
    this.set('items_showed', pagination.get('items_showed'));
    this.set('current_page', pagination.get('current_page'));

    let firstModel = this.store.peekAll('employee-history').get('firstObject');
    this.set('employee_complete_name', firstModel.get('employee_complete_name'));
  },

  deactivate(){
    this.set('history_page', 1);
    this.clearMyRecord();
  },

  clearMyRecord(){
    this.get('currentModel').forEach(function(item, i) {
      item.unloadRecord();
    });
  },

  actions:{
    on_history_next(){
      let pagination = this.get('pagination');
      if(pagination.get('is_next')){
        this.set('history_page',  this.history_page+1);
        this.clearMyRecord();
        this.refresh();
      }
    },
    on_history_prev(){
      let pagination = this.get('pagination');
      if(pagination.get('is_prev')){
        this.set('history_page',  this.history_page - 1);
        this.clearMyRecord();
        this.refresh();
      }
    }
  }
});

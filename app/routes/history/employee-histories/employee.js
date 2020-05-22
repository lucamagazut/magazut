import Route from '@ember/routing/route';

export default Route.extend({
  history_page:1,
  employee_complete_name:'',

  model(params){
    let currentModel = this.store.query('employee-history', {employee_id:params.employee_history_id, page:this.get('history_page'), items_for_page:5});
    this.set('currentModel', currentModel);
    return currentModel;
  },

  afterModel(){
    this.set('pagination', this.store.peekAll('pagination').get('firstObject'));
    let firstModel = this.store.peekAll('employee-history').get('firstObject');
    this.set('employee_complete_name', firstModel.get('employee_complete_name'));
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

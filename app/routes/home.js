import Route from '@ember/routing/route';
import EmberObject, {
  observer,
  computed
} from '@ember/object';

export default Route.extend({
  history_list:[],
  history_page:0,
  history_entries:computed('history_list',function(){
    return this.history_list.get('length');
  }),

  setupController: function(controller, model) {
    controller.set('history_list',this.history_list);
    controller.set('history_page',this.history_page);
    controller.set('history_entries',this.history_entries);
    this._super(controller, model);
  },

  setHistiryList(){
    this.set('history_list',this.store.query('unloading-history',{'page':this.history_page}));
  },
  history_list_obs: observer('history_page',function(){
    this.setHistiryList();
  }),

  beforeModel(){
    this.setHistiryList();
  },

  actions:{
    on_history_next(){
      let page = this.history_entries === 15 ? this.history_page + 1 : this.history_page;
      this.set('history_page', page);
    },
    on_history_prev(){
      let page = this.history_page > 0 ? this.history_page - 1 : 0;
      this.set('history_page', page);
    },
    onClickHistory(currentModelId){
      this.transitionTo('search-contraption.contraptions',{queryParams: { text: `{c_id=${currentModelId}}`}});
    }
  }

});

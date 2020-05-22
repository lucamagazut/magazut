import Controller from '@ember/controller';
import EmberObject, {
  observer,
  computed
} from '@ember/object';

export default Controller.extend({
  history_list:computed(function(){
    return this.store.query('unloading-history',{'page':this.get('history_page')});
  }),

  pagination:computed('history_list', function(){
    return this.store.peekAll('pagination').get('firstObject');
  }),

  setHistiryList(){
    this.set('history_list', this.store.query('unloading-history',{'page':this.history_page}));
  },

  history_list_obs: observer('history_page',function(){
    this.setHistiryList();
  }),

  actions:{
    on_history_next(){
      let pagination = this.get('pagination');
      if(pagination.get('is_next')){
        this.set('history_page',  this.history_page+1);
      }
    },
    on_history_prev(){
      let pagination = this.get('pagination');
      if(pagination.get('is_prev')){
        this.set('history_page',  this.history_page - 1);
      }
    }
  }

});

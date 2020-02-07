import Controller from '@ember/controller';
import EmberObject, {
  observer,
  computed
} from '@ember/object';

export default Controller.extend({
  history_page:0,
  history_list: computed('history_page',function(){
    return this.store.query('unloading-history',{'page':this.history_page})
  }),

  history_entries:computed('history_list',function(){
    return this.history_list.get('length');
  }),
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
      this.transitionToRoute('search-contraption.contraptions',{queryParams: { text: `{c_id=${currentModelId}}`}});
    }
  }
});

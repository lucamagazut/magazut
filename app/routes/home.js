import Route from '@ember/routing/route';
import EmberObject, {
  observer,
  computed
} from '@ember/object';

export default Route.extend({
  history_page:0,

  setupController: function(controller, model) {
    // controller.set('history_list',this.history_list);
    controller.set('history_page',this.history_page);
    // controller.set('history_entries',this.history_entries);
    this._super(controller, model);
  },

  // setHistiryList(){
  //   this.set('history_list',this.store.query('unloading-history',{'page':this.history_page}));
  // },

  

  // beforeModel(){
  //   this.setHistiryList();
  // },

  actions:{
    onClickHistory(currentModelId){
      this.transitionTo('search-contraption.contraptions',{queryParams: { text: `{c_id=${currentModelId}}`}});
    }
  }

});

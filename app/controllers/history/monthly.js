import Controller from '@ember/controller';
import EmberObject, {
  observer,
  computed
} from '@ember/object';

export default Controller.extend({
  monthName:"",
  year:"",

  history_list:computed(function(){
    return this.store.query('monthly-history',{'page':this.get('history_page')});
  }),

  setHistiryList(){
    return this.store.query('monthly-history',{'page':this.history_page}).then((item)=>{
      this.set('history_list',item);
      this.set('monthName',item.get('firstObject').get('current_month'));
      this.set('year',item.get('firstObject').get('current_year'));
    });
  },

  history_list_obs: observer('history_page',function(){
    this.setHistiryList();
  }),

  actions:{
    on_history_next(){
      if(this.get('history_list').length > 0){
        this.set('history_page',  this.history_page+1);
      }
    },
    on_history_prev(){
      let page = this.history_page > 0 ? this.history_page - 1 : 0;
      this.set('history_page', page);
    }
  }

});

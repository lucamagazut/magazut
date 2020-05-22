import Controller from '@ember/controller';
import EmberObject, {
  observer,
  computed
} from '@ember/object';

export default Controller.extend({
  year:"",
  items_for_page:'',
  total_pages:'',
  current_page:'',
  items_showed:'',
  contraption_id:0,
  contraption_denomination:'',
  contraption_id_code:'',


  history_list:computed(function(){
    return this.setHistiryList();
  }),

  setHistiryList(){
    const contraption_id = this.get('contraption_id');
    if(contraption_id){
      return this.store.query('contraption-history',{'page':this.get('history_page'), 'contraption_id':this.get('contraption_id'), 'items_for_page':25}).then((item)=>{
        this.set('history_list',item);
        let pagination = this.store.peekAll('pagination').get('firstObject');
        let firstHistoryEntry = this.store.peekAll('contraption_history').get('firstObject')

        this.set('contraption_denomination', firstHistoryEntry.get('contraption_denomination'));
        this.set('contraption_id_code', firstHistoryEntry.get('contraption_id_code'));

        this.set('year', pagination.get('current_year'));
        this.set('items_for_page', pagination.get('items_for_page'));
        this.set('total_pages', pagination.get('total_pages'));
        this.set('total_items', pagination.get('total_items'));
        this.set('current_page', pagination.get('current_page'));
        this.set('items_showed', pagination.get('items_showed'));
        this.set('is_prev', pagination.get('is_prev'));
        this.set('is_next', pagination.get('is_next'));
      });
    }
  },

  history_list_obs: observer('history_page', 'contraption_id',function(){
    this.setHistiryList();
  }),

  actions:{
    on_history_next(){
      if(this.get('is_next')){
        this.set('history_page',  this.history_page+1);
      }
    },
    on_history_prev(){
      if(this.get('is_prev')){
        this.set('history_page',  this.history_page - 1);
      }
    }
  }

});

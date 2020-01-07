import Controller from '@ember/controller';
import { computed } from '@ember/object';

export default Controller.extend({
  queryParams:['text'],
  text:null,
  order_statuses:computed(function(){
    return this.store.peekAll('order_status');
  }),

  actions:{
    showContraption(currentModelId){
      this.transitionToRoute('search-contraption.contraptions.contraption.show',currentModelId);
    },
    onClickOrderStatus(model, order_status_id){
      this.send('changeOrderStatus', model, order_status_id);
    }
  }
});

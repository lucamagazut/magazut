import Controller from '@ember/controller';
import { computed } from '@ember/object';

export default Controller.extend({
  order_statuses:computed(function(){
    return this.store.peekAll('order_status');
  }),
  actions:{
    onClickOrderStatus(model, order_status_id){
      this.send('changeOrderStatus', model, order_status_id);
    }
  }
});

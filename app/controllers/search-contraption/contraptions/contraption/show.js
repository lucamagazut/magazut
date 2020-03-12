import Controller from '@ember/controller';
import { computed } from '@ember/object';

export default Controller.extend({
  order_statuses:computed(function(){
    return this.store.peekAll('order_status');
  }),
  actions:{
    onClickOrderStatus(event){
      let contraptionId = event.target.attributes['data-contraption-id'].value;
      let orderStatusId = event.target.value;
      this.send('changeOrderStatus', contraptionId, orderStatusId);
    }
  }
});

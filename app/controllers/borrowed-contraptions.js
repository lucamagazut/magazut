import Controller from '@ember/controller';
import { computed } from '@ember/object';

export default Controller.extend({
  order_statuses:computed(function(){
    return this.store.peekAll('order_status');
  }),


  actions:{
    showBorrowedContraption(currentModelId){
      this.transitionToRoute('borrowed-contraptions.contraption.show',currentModelId);
    }
  }
});

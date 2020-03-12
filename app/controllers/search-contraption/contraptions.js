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
    onClickOrderStatus(event){
      let contraptionId = event.target.attributes['data-contraption-id'].value;
      let orderStatusId = event.target.value;
      this.send('changeOrderStatus', contraptionId, orderStatusId);
    },
    onClickContraptionsPrev_b1(){
      this.send('onClickContraptionsPrev_b2', this.model.length);
    },
    onClickContraptionsNext_b1(){
      this.send('onClickContraptionsNext_b2', this.model.length);
    }
  }
});

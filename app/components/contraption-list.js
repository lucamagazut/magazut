import Component from '@ember/component';

export default Component.extend({
  actions:{
    onClickContraption(currentModel){
      console.log("compoent sendAction")
      // this.sendAction();
      this.showContraption(currentModel.get('id'));
    },
    onClickOrderStatus(model, order_status_id){
      this.changeOrderStatus(model, order_status_id);
    }
  }
});

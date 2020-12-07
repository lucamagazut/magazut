import Component from '@ember/component';

export default Component.extend({
  actions:{
    onClickBorrowedContraption(currentModel){
      this.showBorrowedContraption(currentModel.get('id'));
    }
  }
});

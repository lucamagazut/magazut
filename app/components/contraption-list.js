import Component from '@ember/component';

export default Component.extend({
  actions:{
    onClickContraption(currentModel){
      this.showContraption(currentModel.get('id'));
    },
    onClickContraptionsNext(){
      this.onClickContraptionsNext_b1();
    },
    onClickContraptionsPrev(){
      this.onClickContraptionsPrev_b1();
    }
  }
});

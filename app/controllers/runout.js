import Controller from '@ember/controller';

export default Controller.extend({
  actions:{
    showContraption(currentModelId){
      // this.transitionToRoute('search-contraption.contraptions.contraption',currentModelId);
      this.transitionToRoute('runout.contraption.show', currentModelId);
      console.log('controller runout2')
    }
  }
});

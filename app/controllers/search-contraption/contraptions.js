import Controller from '@ember/controller';

export default Controller.extend({
  queryParams:['text'],
  text:null,

  actions:{
    showContraption(currentModelId){
      this.transitionToRoute('search-contraption.contraptions.contraption.show',currentModelId);
    }
  }
});

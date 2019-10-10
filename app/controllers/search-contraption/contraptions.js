import Controller from '@ember/controller';

export default Controller.extend({
  queryParams:['text'],
  text:null,
  findedItems:0,

  actions:{
    showContraption(currentModelId){
      this.transitionToRoute('search-contraption.contraptions.contraption',currentModelId);
    }
  }
});

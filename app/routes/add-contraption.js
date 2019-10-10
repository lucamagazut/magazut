import Route from '@ember/routing/route';

export default Route.extend({
  currentModel:null,
  model(){
    this.currentModel = this.store.createRecord('contraption', {
      denomination:'',
      type:0,
      subType:0,
      material:0,
      machine:0,
      idCode:'',
      availableQt:0,
      minQt:0,
      orderState:0,
      'ut-long': 0,
      'ut-thick': 0,
      'ut-rad-ins': 0,
      'ut-dia': 0,
      'ut-deg': 0
    });
    return this.currentModel;
  },
  actions:{
    refreshAfterSuccess(){
      this.refresh();
    }
  },
  deactivate(){
    this.currentModel.destroyRecord();
  }
});

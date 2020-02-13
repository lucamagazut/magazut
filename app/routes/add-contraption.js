import Route from '@ember/routing/route';

export default Route.extend({
  currentModel:null,
  model(){
    this.currentModel = this.store.createRecord('contraption', {
      denomination:'',
      type:1,
      material:1,
      machine:1,
      idCode:'',
      availableQt:0,
      minQt:0,
      order_status:0,
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
      // alert(this.get('routeName'))
      // window.location.reload(true);
      this.refresh();
    }
  },
  deactivate(){
    this.currentModel.destroyRecord();
  }
});

import Route from '@ember/routing/route';

export default Route.extend({
  currentModel:null,
  model(){
    this.currentModel = this.store.createRecord('contraption', {
      denomination:'',
      type:1,
      work_material:1,
      machine:1,
      id_code:'',
      available_qt:0,
      borrowed_qt:0,
      minimum_qt:0,
      order_status:0,
      geometry_length: 0,
      geometry_thickness: 0,
      geometry_radius: 0,
      geometry_diameter: 0,
      geometry_degree: 0
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

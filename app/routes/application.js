import Route from '@ember/routing/route';
import { observer } from '@ember/object';


export default Route.extend({
  showSuccess:false,
  currentController:null,
  beforeModel(){
    this.store.findAll('category');
    this.store.findAll('operator');
  },
  setupController: function(controller, model) {
    this._super(controller, model);
    this.set('currentController',controller);
    controller.set('showSuccess', this.showSuccess);
  },

  // caccana:observer('cane',function(){
  //   alert(this.cane)
  // }),



  actions:{
    back(){window.history.back();},

    showSuccessAlert(){
      const _t = this;
      this.currentController.set('showSuccess', true);
      Ember.run.later((function() {
        console.log('showSuccess false');

        _t.currentController.set('showSuccess', false);
      }), 5000);
    }

  }
});

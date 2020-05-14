import Route from '@ember/routing/route';
import { observer } from '@ember/object';


export default Route.extend({
  showSuccess:false,
  isErrorShowed:false,
  errorText:'',
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
      this.currentController.set('isErrorShowed', false);
      Ember.run.later((function() {
        console.log('showSuccess false');
        _t.currentController.set('showSuccess', false);
      }), 3000);
    },
    showError(error){
      const _t = this;
      this.currentController.set('errorText', error);
      this.currentController.set('showSuccess', false);
      this.currentController.set('isErrorShowed', true);
      Ember.run.later((function() {
        _t.currentController.set('isErrorShowed', false);
      }), 5000);
    }
  }
});

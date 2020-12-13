import Route from '@ember/routing/route';
import { observer } from '@ember/object';


export default Route.extend({
  showSuccess:false,
  isErrorShowed:false,
  errorText:'',
  currentController:null,
  beforeModel(){
    this.store.findAll('category')
    .then(()=>{
      this.store.findAll('operator');
    })
    .catch((error)=>{
      this.transitionTo('/utility/allow-ip')
    });
  },
  setupController: function(controller, model) {
    this._super(controller, model);
    this.set('currentController',controller);
    controller.set('showSuccess', this.showSuccess);
  },

  actions:{
    back(){window.history.back();},

    showSuccessAlert(){
      const _t = this;
      this.currentController.set('showSuccess', true);
      this.currentController.set('isErrorShowed', false);
      Ember.run.later((function() {
        // console.log('showSuccess false');
        _t.currentController.set('showSuccess', false);
      }), 3000);
    },
    showError(error){
      const _t = this;
      let errorText = '';
      if(error.errors){
        errorText = error.errors[0].detail;
      }else{
        errorText = error;
      }
      this.currentController.set('errorText', errorText);
      this.currentController.set('showSuccess', false);
      this.currentController.set('isErrorShowed', true);
      Ember.run.later((function() {
        _t.currentController.set('isErrorShowed', false);
      }), 5000);
    },
    reloadApp(){
      this.transitionTo('search-contraption');
      this.refresh();
    }
  }
});

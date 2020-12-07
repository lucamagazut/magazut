import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default Route.extend({
  chargeApi: service('charge-api'),

  beforeModel(){
    console.log('qui nascondere');
  },

  setupController: function(controller, model) {
    controller.set('chargeQuantity', null);
    this._super(controller, model);
  },

  actions:{
    confirmCharge(){
      let qt = Number(this.get('controller').get('chargeQuantity'));
      if(qt > 0){
        this.chargeApi.send(this.currentModel.get('id'),this.currentModel.get('available_qt'), this.currentModel.get('minimum_qt'), qt).then((resp) => {
          this.currentModel.reload();
          this.transitionTo('search-contraption.contraptions');
          this.send('showSuccessAlert');
        },
          (error) =>{
            this.send('showError', 'Qualcosa è andato storto. Controlla i dati e riprova');
          }
        )
      }
      else{
        this.send('showError', 'Qualcosa è andato storto. Controlla i dati e riprova');
      }
    }
  }
});

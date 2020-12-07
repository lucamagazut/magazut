import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default Route.extend({

  dischargeApi:service('discharge-api'),

  setupController: function(controller, model) {
    controller.set('quantity',1);
    controller.set('selectedOp',0);

    this._super(controller, model);
  },

  actions:{
    confirmDisharge(){
      var _t = this;
      let qt = Number(this.get('controller').get('quantity'));
      let employee_id = Number(this.get('controller').get('selectedOp'));


      if(employee_id !== 0 && qt > 0 & this.currentModel.get('in_store_qt') >= qt){
        this.dischargeApi.send(this.currentModel, employee_id, qt).then((resp) => {
          this.currentModel.reload();
          this.transitionTo('search-contraption.contraptions');
          this.send('showSuccessAlert');
        })
        .catch(function(error){
          _t.send('showError', 'Qualcosa è andato storto. Controlla i dati e riprova');
        });
      }
      else{
        this.send('showError', 'Qualcosa è andato storto. Controlla i dati e riprova');
      }
    }
  }
});

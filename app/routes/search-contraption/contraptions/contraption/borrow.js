import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default Route.extend({

  borrowApi:service('borrow-api'),

  setupController: function(controller, model) {
    controller.set('quantity',1);
    controller.set('selectedOp',0);

    this._super(controller, model);
  },

  actions:{
    confirmBorrowing(){
      var _t = this;
      const qt_to_return = Number(this.get('controller').get('quantity'));
      const in_store_qt = Number(this.currentModel.get('in_store_qt'));
      const employee_id = Number(this.get('controller').get('selectedOp'));
      const store = this.store;

      if(employee_id !== 0 && qt_to_return > 0 && in_store_qt >= qt_to_return){

        this.borrowApi.borrow(this.currentModel, employee_id, qt_to_return).then((resp) => {
          this.currentModel.reload();
          this.transitionTo('search-contraption.contraptions');
          this.send('showSuccessAlert');
        })
        .catch(function(error){
          _t.send('showError', error);
        });

      }
      else{
        this.send('showError', 'Qualcosa è andato storto. Controlla i dati e riprova');
      }
    }
  }
});

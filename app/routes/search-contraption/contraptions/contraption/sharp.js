import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';


export default Route.extend({
  borrowApi:service('borrow-api'),

  setupController: function(controller, model) {
    controller.set('quantity',1);
    this._super(controller, model);
  },
  actions:{
    confirmSharpening(){
      var _t = this;
      let qt_to_return = Number(this.get('controller').get('quantity'));
      let in_store_qt = Number(this.currentModel.get('in_store_qt'));
      let employee_id = 1000;

      if(qt_to_return > 0 && in_store_qt >= qt_to_return){
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

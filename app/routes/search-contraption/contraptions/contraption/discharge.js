import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default Route.extend({

  dischargeApi:service('discharge-api'),
  dischargeValidator(){
    return true;
  },

  isBorrowed:false,

  setupController: function(controller, model) {
    controller.set('isBorrowed',this.isBorrowed);
    this._super(controller, model);
  },

  actions:{
    confirmDisharge(){
      if(this.dischargeValidator()){

        let qt = this.get('controller').get('quantity');
        let isBorrowed = this.get('controller').get('isBorrowed');
        let operator = this.get('controller').get('selectedOp');
        this.dischargeApi.send(this.currentModel.get('id'), qt, operator, isBorrowed).then((resp) => {
          let availableQt = resp.data[0].attributes.availableQt;
          let order_status = resp.data[0].attributes.order_status;
          let borrowed_qt = resp.data[0].attributes.borrowed_qt;

          this.currentModel.set('availableQt', availableQt);
          this.currentModel.set('order_status', order_status);
          this.currentModel.set('borrowed_qt', borrowed_qt);

          // alert('ok');
          this.transitionTo('search-contraption.contraptions');
          this.send('showSuccessAlert');
        })
        .catch(function(error){
          console.log(error);
          alert('Qualcosa è andato storto. Controlla i dati e riprova');
        });

      }
    }
  }
});

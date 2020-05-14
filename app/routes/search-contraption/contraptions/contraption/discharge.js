import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default Route.extend({

  dischargeApi:service('discharge-api'),

  isBorrowed:false,

  setupController: function(controller, model) {
    controller.set('isBorrowed',this.isBorrowed);
    controller.set('quantity',1);
    controller.set('selectedOp',0);

    this._super(controller, model);
  },

  actions:{
    confirmDisharge(){
      var _t = this;
      let qt = Number(this.get('controller').get('quantity'));
      let currentQt = Number(this.currentModel.get('availableQt'));
      let operator = Number(this.get('controller').get('selectedOp'));

      if(operator !== 0 && qt > 0 & currentQt >= qt){

        let isBorrowed = this.get('controller').get('isBorrowed');
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
          _t.send('showError', 'Qualcosa è andato storto. Controlla i dati e riprova');
        });
      }
      else{
        this.send('showError', 'Qualcosa è andato storto. Controlla i dati e riprova');
      }
    }
  }
});

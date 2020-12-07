import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default Route.extend({

  returnApi: service('return-api'),


  setupController: function(controller, model) {
    controller.set('quantity',1);
    controller.set('selectedOp',0);

    this._super(controller, model);
  },

  actions:{
    confirmReturning(){
      alert('cacca')
      var _t = this;
      let qt = Number(this.get('controller').get('quantity'));
      let currentQt = Number(this.currentModel.get('available_qt'));
      let operator = Number(this.get('controller').get('selectedOp'));
      if(operator !== 0 && qt > 0){

        this.returnApi.send(this.currentModel.get('id'), qt, operator).then((resp) => {
          let available_qt = resp.data[0].attributes.available_qt;
          let order_status = resp.data[0].attributes.order_status;
          let borrowed_qt = resp.data[0].attributes.borrowed_qt;

          this.currentModel.set('available_qt', available_qt);
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

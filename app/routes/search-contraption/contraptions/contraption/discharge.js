import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default Route.extend({

  dischargeApi:service('discharge-api'),
  dischargeValidator(){
    return true;
  },

  actions:{
    confirmDisharge(){
      if(this.dischargeValidator()){

        let qt = this.get('controller').get('quantity');
        let operator = this.get('controller').get('selectedOp');
        this.dischargeApi.send(this.currentModel.get('id'), qt, operator).then((resp) => {
          let availableQt = resp.data[0].attributes.availableQt;
          let order_status = resp.data[0].attributes.order_status;
          this.currentModel.set('availableQt', availableQt);
          this.currentModel.set('order_status', order_status);
          alert('ok');
          this.transitionTo('search-contraption.contraptions');
        })
        .catch(function(error){
          console.log(error);
          alert('Qualcosa è andato storto. Controlla i dati e riprova');
        });

      }
    }
  }
});

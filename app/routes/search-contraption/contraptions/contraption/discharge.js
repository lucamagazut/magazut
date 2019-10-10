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
          let orderState = resp.data[0].attributes.orderState;
          this.currentModel.set('availableQt', availableQt);
          this.currentModel.set('orderState', orderState);
          alert('ok');
          this.transitionTo('search-contraption.contraptions');
        })
        .catch(function(error){
          alert(error)
        });

      }
    }
  }
});

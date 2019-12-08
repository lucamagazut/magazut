import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default Route.extend({
  chargeApi: service('charge-api'),
  chargeValidator(){
    //lato server?
    return true;
  },
  beforeModel(){
    console.log('qui nascondere');
  },
  actions:{
    confirmCharge(){
      if(this.chargeValidator()){

        let qt = this.get('controller').get('chargeQuantity');
        this.chargeApi.send(this.currentModel.get('id'), qt).then((resp) => {
          let availableQt = resp.data[0].attributes.availableQt;
          let orderState = resp.data[0].attributes.orderState;
          this.currentModel.set('availableQt', availableQt);
          this.currentModel.set('orderState', orderState);
          alert('ok');
          this.transitionTo('search-contraption.contraptions');
        },
          (error) =>{
            alert('error')
          }
        )
        // .catch((error) =>{
        //   alert('not ok');
        // })


      }
    }
  }
});

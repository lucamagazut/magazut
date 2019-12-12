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
          let order_status = resp.data[0].attributes.order_status;
          this.currentModel.set('availableQt', availableQt);
          this.currentModel.set('order_status', order_status);
          alert('ok');
          this.transitionTo('search-contraption.contraptions');
          // this.transitionTo('search-contraption');
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

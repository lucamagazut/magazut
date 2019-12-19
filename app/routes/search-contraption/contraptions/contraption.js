import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';


export default Route.extend({
  orderApi: service('order-api'),
  model(params){
    return this.store.peekRecord('contraption', params.contraption_id);
  },
  actions:{
    changeStatus(val, getBack){
      this.orderApi.send(this.currentModel.get('id'), val).then((resp) => {
        let order_status = resp.data.attributes.order_status;
        this.currentModel.set('order_status', order_status);
        // this.transitionTo('search-contraption.contraptions');
        if(getBack){
          this.send('back');
        }
      },
        (error) =>{
          alert('error')
        }
      );
    }
  }
});

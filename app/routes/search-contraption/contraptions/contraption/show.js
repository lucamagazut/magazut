import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default Route.extend({
  orderApi: service('order-api'),
  actions:{
    changeStatus(val){
      this.orderApi.send(this.currentModel.get('id'), val).then((resp) => {
        let order_status = resp.data.attributes.order_status;
        this.currentModel.set('order_status', order_status);
      },
        (error) =>{
          alert('error')
        }
      )
    }
  }

});

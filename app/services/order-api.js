import Service from '@ember/service';
import { inject as service } from '@ember/service';

export default Service.extend({
  ajax: service('ajax'),
  send(modelId, order_status){
    return this.ajax.makeGet("http://localhost:3000/api/order", {id:modelId, order_status},'PUT');
  }
});

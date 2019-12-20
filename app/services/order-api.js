import Service from '@ember/service';
import { inject as service } from '@ember/service';
import config from '../config/environment';

export default Service.extend({
  ajax: service('ajax'),
  send(modelId, order_status){
    return this.ajax.makeGet(config.apiHostName + "/order", {id:modelId, order_status},'PUT');
  }
});

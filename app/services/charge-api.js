import Service from '@ember/service';
import { inject as service } from '@ember/service';
import config from '../config/environment';


export default Service.extend({
  ajax: service('ajax'),
  send(modelId, qt){
    return this.ajax.makeGet(config.apiHostName + "/charge", {id:modelId, qt:qt},'PUT');
  }
});

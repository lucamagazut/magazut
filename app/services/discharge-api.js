import Service from '@ember/service';
import { inject as service } from '@ember/service';

export default Service.extend({
  ajax: service('ajax'),
  send(modelId, qt, op){
    return this.ajax.makeGet("/api/discharge", {id:modelId, qt:qt, op: op});
  }
});

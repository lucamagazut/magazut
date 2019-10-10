import Service from '@ember/service';
import { inject as service } from '@ember/service';

export default Service.extend({
  ajax: service('ajax'),
  send(modelId, qt){
    return this.ajax.makeGet("/api/charge", {id:modelId, qt:qt});
  }
});

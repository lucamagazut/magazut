import Service from '@ember/service';
import { inject as service } from '@ember/service';
import config from '../config/environment';


export default Service.extend({
  ajax: service('ajax'),
  send(contraption_id, available_qt, minimum_qt, qt_to_add){
    return this.ajax.makeGet(config.apiHostName + "/charge", {contraption_id:contraption_id, available_qt:available_qt, qt_to_add:qt_to_add, minimum_qt:minimum_qt},'PUT');
  }
});

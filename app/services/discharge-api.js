import Service from '@ember/service';
import { inject as service } from '@ember/service';
import config from '../config/environment';

export default Service.extend({
  ajax: service('ajax'),
  send(model, employee_id, qt_to_remove){

    let queryObj = {
      contraption_id: model.get('id'),
      available_qt: model.get('available_qt'),
      minimum_qt: model.get('minimum_qt'),
      order_status: model.get('order_status'),
      qt_to_remove: qt_to_remove,
      employee_id:employee_id
    };

    return this.ajax.makeGet(config.apiHostName + "/discharge", queryObj, "PUT");
  }
});

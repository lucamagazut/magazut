import Service from '@ember/service';
import { inject as service } from '@ember/service';
import config from '../config/environment';

export default Service.extend({
  ajax: service('ajax'),
  borrow(model, employee_id, qt_to_return){

    let queryObj = {
      contraption_id: model.get('id'),
      available_qt: model.get('available_qt'),
      qt_to_return: qt_to_return,
      employee_id:employee_id,
      borrowed_qt:model.get('borrowed_qt')
    };

    return this.ajax.makeCall(config.apiHostName + "/borrowing", queryObj, "POST");
  },
  return(model, returned_qt){

    let queryObj = {
      borrowed_contraption_id:model.get('id'),
      contraption_id: model.get('contraption_id'),
      available_qt: model.get('available_qt'),
      qt_to_return: model.get('qt_to_return'),
      returned_qt:returned_qt,
      employee_id:model.get('employee_id'),
      borrowed_qt:model.get('borrowed_qt')
    };

    return this.ajax.makeCall(config.apiHostName + "/returning", queryObj, "POST");
  },
  broken(model, broken_qt){

    let queryObj = {
      borrowed_contraption_id:model.get('id'),
      contraption_id: model.get('contraption_id'),
      available_qt: model.get('available_qt'),
      qt_to_return: model.get('qt_to_return'),
      broken_qt:broken_qt,
      employee_id:model.get('employee_id'),
      borrowed_qt:model.get('borrowed_qt')
    };

    return this.ajax.makeCall(config.apiHostName + "/broken", queryObj, "POST");
  },
  changeBorrowedEmployee(model, change_borrowed_qt, change_employee_id){

    let queryObj = {
      borrowed_contraption_id:model.get('id'),
      contraption_id: model.get('contraption_id'),
      available_qt: model.get('available_qt'),
      qt_to_return: model.get('qt_to_return'),
      change_borrowed_qt:change_borrowed_qt,
      change_employee_id:change_employee_id,
      employee_id:model.get('employee_id'),
      borrowed_qt:model.get('borrowed_qt')
    };

    return this.ajax.makeCall(config.apiHostName + "/change_borrowed_employee", queryObj, "POST");
  }

});

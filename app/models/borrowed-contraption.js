import DS from 'ember-data';
import { computed } from '@ember/object';


export default DS.Model.extend({
  contraption_id: DS.attr(),
  denomination: DS.attr(),
  type:DS.attr('number'),
  id_code: DS.attr(),
  order_status:DS.attr(),
  available_qt: DS.attr('number'),
  minimum_qt: DS.attr('number'),
  borrowed_qt: DS.attr('number'),
  qt_to_return:DS.attr('number'),
  employee_id: DS.attr('number'),
  name: DS.attr(),
  second_name: DS.attr(),
  complete_employee_name:computed('name',function(){
    if(!this.name || this.name.toLowerCase() == 'undefined'){
      return '';
    }else{
      return this.second_name + ' ' + this.name;
    }
  }),
  patch_request:DS.attr()
});

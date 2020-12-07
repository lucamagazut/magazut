import DS from 'ember-data';
import { computed } from '@ember/object';


export default DS.Model.extend({
  transaction_time: DS.attr('data-ita'),
  log: DS.attr(),
  http_app_location: DS.attr(),
  http_api_location: DS.attr(),
  involved_quantity: DS.attr(),
  contraption_id: DS.attr(),
  transaction_id: DS.attr(),
  it_short_description: DS.attr(),

  employee_name: DS.attr(),
  employee_second_name: DS.attr(),
  user_id:DS.attr(),
  employee_complete_name:computed('employee_name',function(){
    if(this.employee_name.toLowerCase() == 'undefined'){
      return 'Operatore computer magazzino';
    }else{
      return this.employee_name + ' ' + this.employee_second_name;
    }
  }),

  contraption_denomination: DS.attr(),
  contraption_id_code: DS.attr()
});

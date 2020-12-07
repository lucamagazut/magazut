import DS from 'ember-data';
import { computed } from '@ember/object';

export default DS.Model.extend({
  transaction_time: DS.attr('data-ita'),
  involved_quantity: DS.attr(),
  contraption_id: DS.attr(),
  transaction_id:DS.attr('Number'),
  it_short_description: DS.attr(),
  employee_id: DS.attr('String'),
  employee_name: DS.attr('String'),
  employee_second_name: DS.attr(),
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

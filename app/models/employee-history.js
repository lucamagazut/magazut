import Model from '@ember-data/model';
import DS from 'ember-data';
import moment from 'moment';
import { computed } from '@ember/object';

export default Model.extend({
  quantity: DS.attr('number'),
  contraption_id: DS.attr(),
  contraption_denomination: DS.attr(),
  contraption_id_code: DS.attr(),
  transaction_time:DS.attr('data-ita'),
  transaction_id: DS.attr(),
  it_short_description: DS.attr(),
  employee_name: DS.attr('String'),
  employee_second_name: DS.attr(),
  employee_complete_name:computed('employee_name',function(){
    if(this.employee_name.toLowerCase() == 'undefined'){
      return 'Operatore computer magazzino';
    }else{
      return this.employee_name + ' ' + this.employee_second_name;
    }
  })
});

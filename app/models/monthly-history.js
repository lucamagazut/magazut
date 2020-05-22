import DS from 'ember-data';
import moment from 'moment';
import { computed } from '@ember/object';



export default DS.Model.extend({
  quantity: DS.attr('number'),
  contraption_id: DS.attr(),
  contraption_denomination: DS.attr(),
  contraption_id_code: DS.attr(),
  transaction_time:DS.attr(),
  current_month:computed('transaction_time',function(){
    return moment(this.transaction_time).locale("it").format('MMMM');
  }),
  current_year:computed('transaction_time',function(){
    return moment(this.transaction_time).locale("it").format('YYYY');
  }),
});

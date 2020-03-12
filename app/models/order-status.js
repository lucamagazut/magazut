import DS from 'ember-data';
import { computed } from '@ember/object';

export default DS.Model.extend({
  order_status_name:DS.attr('string'),
  name:computed('order_status_name',function(){
    return this.order_status_name;
  })
});

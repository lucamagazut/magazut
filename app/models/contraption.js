import DS from 'ember-data';
import { computed } from '@ember/object';


export default DS.Model.extend({
  denomination: DS.attr(),
  type:DS.attr('number'),
  typeName: computed('type',function(){
    let store = this.get('store');
    let record = store.peekRecord('contraption-type', this.type);
    if(record){
      return record.get('name');
    }
    return '';
  }),
  material: DS.attr('number'),
  materialName:computed('material',function(){
    let store = this.get('store');
    let record = store.peekRecord('work-material', this.material);
    if(record){
      return record.get('name');
    }
    return '';
  }),
  machine: DS.attr('number'),
  machineName: computed('machine',function(){
    let store = this.get('store');
    let record = store.peekRecord('machine', this.machine);
    let name = '';
    if(record){
      name = record.get('name');
    }
    return name;
  }),
  purchaseRequest: DS.attr('string'),
  idCode: DS.attr(),
  "availableQt": DS.attr('number'),
  "minQt": DS.attr('number'),
  order_status:DS.attr('number'),
  order_status_name:computed('order_status',function(){
    let store = this.get('store');
    let record = store.peekRecord('order-status', this.order_status);
    if(record){
      return record.get('order_status_name');
    }
    return '';
  }),
  'ut-long': DS.attr(),
  'ut-thick': DS.attr(),
  'ut-rad-ins': DS.attr(),
  'ut-dia': DS.attr(),
  'ut-deg': DS.attr()
});

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
  borrowed_qt: DS.attr('number'),
  order_status:DS.attr('number'),
  order_status_name:computed('order_status',function(){
    let store = this.get('store');
    let record = store.peekRecord('order-status', this.order_status);
    if(record){
      return record.get('order_status_name');
    }
    return '';
  }),
  total_contraptions_found: DS.attr('number',{ defaultValue: 0 }),
  pagination: DS.attr('number',{ defaultValue: 0 }),
  'ut-long': DS.attr('number'),
  'ut-thick': DS.attr('number'),
  'ut-rad-ins': DS.attr('number'),
  'ut-dia': DS.attr('number'),
  'ut-deg': DS.attr('number')
});

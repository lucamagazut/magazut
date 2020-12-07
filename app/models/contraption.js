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
  work_material: DS.attr('number'),
  materialName:computed('work_material',function(){
    let store = this.get('store');
    let record = store.peekRecord('work-material', this.work_material);
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
  id_code: DS.attr(),
  available_qt: DS.attr('number'),
  minimum_qt: DS.attr('number'),
  borrowed_qt: DS.attr('number'),
  in_store_qt:computed('available_qt','borrowed_qt',function(){
    return this.available_qt - this.borrowed_qt;
  }),
  qt_to_return:DS.attr('number'),
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
  geometry_length: DS.attr('number'),
  geometry_thickness: DS.attr('number'),
  geometry_radius: DS.attr('number'),
  geometry_diameter: DS.attr('number'),
  geometry_degree: DS.attr('number')
});

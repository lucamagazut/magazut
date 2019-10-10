import DS from 'ember-data';
import { computed } from '@ember/object';


export default DS.Model.extend({
  denomination: DS.attr(),
  type: DS.belongsTo('contraption-type'),
  typeName:computed('type',function(){
    return this.type.get('name');
  }),
  "subType": DS.belongsTo('contraption-sub-type'),
  material: DS.belongsTo('work-material'),
  materialName:computed('material',function(){
    return this.material.get('name');
  }),
  machine: DS.belongsTo('machine'),
  machineName:computed('machine',function(){
    return this.machine.get('name');
  }),
  idCode: DS.attr(),//DS.belongsTo('id-code'),
  "availableQt": DS.attr('number'),
  "minQt": DS.attr('number'),
  state: DS.attr('number'), // 0 esaurito, 1 disponibile, 2 in esaurimento, 3 ordinato, 4arrivato
  textState:computed('state',function(){
    let textList = ["Esaurito","Disponibile","In esaurimento", "Ordinato", "Arrivato"];
    return textList[this.state];
  }),
  'ut-long': DS.attr(),
  'ut-thick': DS.attr(),
  'ut-rad-ins': DS.attr(),
  'ut-dia': DS.attr(),
  'ut-deg': DS.attr()
});

//
//
// export default DS.Model.extend({
//   denomination: DS.attr()
// });

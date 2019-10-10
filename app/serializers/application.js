import DS from 'ember-data';

export default DS.JSONAPISerializer.extend({
  keyForAttribute(key) { return key; },
  modelNameFromPayloadKey(key) {
    if(key === 'ut-dia' || key === 'ut-rad-ins'){
      return key;
    }
    return this._super(key);
  }
});

import DS from 'ember-data';

export default DS.JSONAPISerializer.extend({
  keyForAttribute(key) { return key; },
  modelNameFromPayloadKey(key) {
    if(key === 'geometry_diameter' || key === 'geometry_radius'){
      return key;
    }
    return this._super(key);
  }
});

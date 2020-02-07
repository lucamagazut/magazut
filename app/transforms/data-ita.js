import DS from 'ember-data';
import moment from 'moment';

export default DS.Transform.extend({
  deserialize(serialized) {
    return moment(serialized).locale("it").format('D MMMM YYYY, H:mm:ss');
  },

  serialize(deserialized) {
    return deserialized;
  }
});

import Controller from '@ember/controller';
import { computed } from '@ember/object';

export default Controller.extend({
  selectedOp:1,
  operators:computed(function(){
    return this.store.peekAll('operator');
  })
});

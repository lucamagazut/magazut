import Controller from '@ember/controller';
import { computed } from '@ember/object';

export default Controller.extend({
  selectedOp:0,
  operators:computed(function(){
    return this.store.peekAll('operator');
  }),
  actions:{
    updateSelectedOp(value){
      this.set('selectedOp', value);
    }
  }
});

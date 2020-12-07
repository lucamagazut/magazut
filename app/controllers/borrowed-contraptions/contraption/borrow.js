import Controller from '@ember/controller';
import { computed } from '@ember/object';


export default Controller.extend({
  operators:computed(function(){
    return this.store.peekAll('operator');
  }),
  actions:{
    onChangeOperator(event){
      this.set('newBorrowEmployee',event.target.value);
      // this.newBorrowEmployee = event.target.value;
      // console.log(event.target.value);
    },

  }
});

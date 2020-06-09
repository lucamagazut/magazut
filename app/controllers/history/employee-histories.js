import Controller from '@ember/controller';
import EmberObject, {
  observer,
  computed
} from '@ember/object';


export default Controller.extend({

  operators:computed(function(){
    return this.store.peekAll('operator');
  }),

  actions:{

    onChangeEmpHistory(event){
      let empId = event.target.value;
      // alert(empId)
      this.send('onClickUserHistory', empId);
    }
  }

});

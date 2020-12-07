import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import { computed } from '@ember/object';
import { observer } from '@ember/object';




export default Route.extend({
  borrowApi:service('borrow-api'),
  alignStore:service('align-store'),


  model(params){
    return this.store.peekRecord('borrowed-contraption', params.contraption_id);
  },
  deactivate(){
    this.currentModel.rollbackAttributes();
  },

  actions:{
    returnBorrowed(model, returned_qt){
      var _t = this;
      this.borrowApi.return(this.currentModel, returned_qt).then((resp) => {
        if(resp.data.attributes.qt_to_return == 0){
          this.currentModel.unloadRecord();
        }else{
          this.currentModel.reload();
        }
        this.transitionTo('borrowed-contraptions');
        this.send('showSuccessAlert');
      })
      .catch(function(error){
        console.log(typeof error);
        console.log(error.errors);
        _t.send('showError', error);
      });
    },

    brokenBorrowed(model, broken_qt){
      this.borrowApi.broken(this.currentModel, broken_qt).then((resp) => {
        console.log('entra ok');
        if(resp.data.attributes.qt_to_return == 0){
          this.currentModel.unloadRecord();
        }else{
          this.currentModel.reload();
        }
        this.transitionTo('borrowed-contraptions');
        this.send('showSuccessAlert');
      })
      .catch((error)=>{
        this.send('showError', error);
      });
    },

    changeBorrowedEmployee(model, change_borrowed_qt, change_employee_id){
      this.borrowApi.changeBorrowedEmployee(this.currentModel, change_borrowed_qt, change_employee_id).then((resp) => {
        if(resp.data.attributes.qt_to_return == 0){
          this.currentModel.unloadRecord();
        }else{
          this.currentModel.reload();
        }
        this.transitionTo('borrowed-contraptions');
        this.send('reloadBorrowedList');
        this.send('showSuccessAlert');
      })
      .catch((error)=>{
        this.send('showError', error);
      });
    }
  }
});

import Route from '@ember/routing/route';

export default Route.extend({

  newBorrowEmployee:null,

  setupController: function(controller, model) {
    controller.set('returned_qt', model.qt_to_return);
    controller.set('newBorrowEmployee', model.get('employee_id'));
    this._super(controller, model);
  },
  actions:{
    confirmChangeBorrowEmployee(model, qt){
      this.send('changeBorrowedEmployee', model, qt, this.get('controller').get('newBorrowEmployee'));
      // alert(this.get('controller').get('newBorrowEmployee'))
    },


  }
});

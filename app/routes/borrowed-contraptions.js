import Route from '@ember/routing/route';

export default Route.extend({
  borrowedList:null,
  model(params){
    this.borrowedList = this.store.findAll('borrowed-contraption');
    return this.borrowedList;
  },
  actions:{
    reloadBorrowedList(){
      this.refresh();
    }
  }
});

import Route from '@ember/routing/route';

export default Route.extend({
  beforeModel(){
    this.store.findAll('category');
    this.store.findAll('operator');
    // this.replaceWith('home');//todo
  },
  actions:{
    back(){window.history.back();}
  }
});

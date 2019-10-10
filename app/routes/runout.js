import Route from '@ember/routing/route';

export default Route.extend({
  model(){
    return this.store.query('contraption',{availableQt:0});
    // return this.store.findAll('running-out-contraptions');
  }
});

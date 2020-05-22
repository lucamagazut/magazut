import Route from '@ember/routing/route';

export default Route.extend({
  actions:{
    onClickHistory(currentModelId){
      this.transitionTo('history.contraption',currentModelId);
    },
    onClickUserHistory(employee_history_id){
      this.transitionTo('history.employee-histories.employee',employee_history_id);
    }
  }
});

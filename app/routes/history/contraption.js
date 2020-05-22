import Route from '@ember/routing/route';

export default Route.extend({
  history_page:1,

  model(params){
    this.set('contraption_id',params.contraption_id);
    return {};
    // this._super(...arguments);
  },

  setupController: function(controller, model) {
    controller.set('history_page',this.history_page);
    controller.set('contraption_id', this.get('contraption_id'));
    this._super(controller, model);
  }
});

import Route from '@ember/routing/route';

export default Route.extend({
  history_page:0,

  setupController: function(controller, model) {
    controller.set('history_page',this.history_page);
    this._super(controller, model);
  }
});

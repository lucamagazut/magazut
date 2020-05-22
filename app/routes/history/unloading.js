import Route from '@ember/routing/route';

export default Route.extend({

  history_page:1,

  setupController: function(controller, model) {
    // controller.set('history_list',this.history_list);
    controller.set('history_page',this.history_page);
    // controller.set('history_entries',this.history_entries);
    this._super(controller, model);
  }
});

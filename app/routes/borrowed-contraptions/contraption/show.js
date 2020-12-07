import Route from '@ember/routing/route';

export default Route.extend({
  setupController: function(controller, model) {
    controller.set('returned_qt', model.qt_to_return);
    this._super(controller, model);
  }
});

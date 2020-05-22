import EmberRouter from '@ember/routing/router';
import config from './config/environment';

const Router = EmberRouter.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('home');
  this.route('add-contraption', function() {
    this.route('contraption');
  });
  this.route('search-contraption', function() {
    this.route('contraptions', function() {
      this.route('contraption', { path: '/:contraption_id' }, function() {
        this.route('discharge');
        this.route('charge');
        this.route('show');
      });
    });
  });
  this.route('modify-contraption');
  this.route('history', function() {
    this.route('unloading');
    this.route('monthly');
    this.route('average');
    this.route('contraption', { path: '/:contraption_id' }, function() {});
    this.route('employee-histories', function() {
      this.route('employee',{ path: '/:employee_history_id' });
    });
  });
});

export default Router;

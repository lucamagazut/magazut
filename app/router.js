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
        this.route('dismiss');
      });
    });
  });
  this.route('modify-contraption');
});

export default Router;

import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | history/contraption', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let route = this.owner.lookup('route:history/contraption');
    assert.ok(route);
  });
});

import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | borrowed-contraptions/contraption/show', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let route = this.owner.lookup('route:borrowed-contraptions/contraption/show');
    assert.ok(route);
  });
});

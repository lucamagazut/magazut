import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | runout/contraption/charge', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let route = this.owner.lookup('route:runout/contraption/charge');
    assert.ok(route);
  });
});

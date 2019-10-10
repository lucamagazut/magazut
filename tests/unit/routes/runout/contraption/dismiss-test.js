import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | runout/contraption/dismiss', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let route = this.owner.lookup('route:runout/contraption/dismiss');
    assert.ok(route);
  });
});

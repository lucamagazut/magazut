import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | search-contraption/contraptions/contraption/charge', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let route = this.owner.lookup('route:search-contraption/contraptions/contraption/charge');
    assert.ok(route);
  });
});

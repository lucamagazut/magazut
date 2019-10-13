import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | search-contraption/contraptions/contraption/index', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let route = this.owner.lookup('route:search-contraption/contraptions/contraption/index');
    assert.ok(route);
  });
});

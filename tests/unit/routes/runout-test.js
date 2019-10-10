import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | runout', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let route = this.owner.lookup('route:runout');
    assert.ok(route);
  });
});

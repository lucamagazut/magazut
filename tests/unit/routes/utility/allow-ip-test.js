import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | utility/allow-ip', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let route = this.owner.lookup('route:utility/allow-ip');
    assert.ok(route);
  });
});

import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | modify-contraption', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let route = this.owner.lookup('route:modify-contraption');
    assert.ok(route);
  });
});

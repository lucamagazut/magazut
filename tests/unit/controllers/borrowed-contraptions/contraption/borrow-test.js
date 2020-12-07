import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Controller | borrowed-contraptions/contraption/borrow', function(hooks) {
  setupTest(hooks);

  // Replace this with your real tests.
  test('it exists', function(assert) {
    let controller = this.owner.lookup('controller:borrowed-contraptions/contraption/borrow');
    assert.ok(controller);
  });
});

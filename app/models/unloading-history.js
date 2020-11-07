import DS from 'ember-data';

export default DS.Model.extend({
  transaction_time: DS.attr('data-ita'),
  log: DS.attr(),
  http_app_location: DS.attr(),
  http_api_location: DS.attr(),
  involved_quantity: DS.attr(),
  contraption_id: DS.attr(),
  transaction_id: DS.attr(),
  it_short_description: DS.attr(),

  employee_name: DS.attr(),
  employee_second_name: DS.attr(),
  user_id:DS.attr(),

  contraption_denomination: DS.attr(),
  contraption_id_code: DS.attr()
});
